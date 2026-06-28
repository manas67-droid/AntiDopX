import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import {
  getErrorMessage,
  type ServiceResponse,
} from '../types/serviceResponse';
import type { SavedMedicine } from '../types/userProfile';
import { addXP } from './xpservices';
import { db } from './config';

export type MedicineStatus =
  | 'Allowed'
  | 'Use With Caution'
  | 'Prohibited'
  | 'Unknown';

export type MedicineLookupResult = {
  drugName: string;
  status: MedicineStatus;
  guidance: string;
};

export type MedicineScanResult = {
  rawText: string;
  detectedDrugName: string | null;
  lookup: MedicineLookupResult;
  cached?: boolean;
};

const medicineDatabase: MedicineLookupResult[] = [
  {
    drugName: 'Paracetamol',
    status: 'Allowed',
    guidance:
      'Generally allowed, but always check combination products for other active ingredients.',
  },
  {
    drugName: 'Ibuprofen',
    status: 'Allowed',
    guidance:
      'Generally allowed, but use only as medically appropriate.',
  },
  {
    drugName: 'Pseudoephedrine',
    status: 'Use With Caution',
    guidance:
      'Can be restricted above urinary thresholds. Check dose, timing, and current anti-doping rules.',
  },
  {
    drugName: 'Salbutamol',
    status: 'Use With Caution',
    guidance:
      'Permitted only within specific inhaled dose limits unless a valid TUE applies.',
  },
  {
    drugName: 'Stanozolol',
    status: 'Prohibited',
    guidance:
      'Prohibited in sport. Do not use without qualified medical and anti-doping guidance.',
  },
  {
    drugName: 'Clenbuterol',
    status: 'Prohibited',
    guidance:
      'Prohibited in sport. Seek qualified support if this appears on a medicine label.',
  },
];

const unknownLookup: MedicineLookupResult = {
  drugName: 'Unknown',
  status: 'Unknown',
  guidance:
    'No match found in the database. Verify the active ingredient with an official anti-doping source.',
};

const scanCache = new Map<string, MedicineScanResult>();

const normalize = (value: string) => value.trim().toLowerCase();

export const detectDrugNameFromText = async (
  ocrText: string
): Promise<ServiceResponse<string | null>> => {
  try {
    const normalizedText = normalize(ocrText);

    if (!normalizedText) {
      return {
        success: false,
        error: 'No medicine text provided',
      };
    }

    const match = medicineDatabase.find((medicine) =>
      normalizedText.includes(normalize(medicine.drugName))
    );

    return {
      success: true,
      data: match?.drugName || null,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const lookupProhibitedStatus = async (
  drugName: string | null
): Promise<ServiceResponse<MedicineLookupResult>> => {
  try {
    if (!drugName) {
      return {
        success: true,
        data: unknownLookup,
      };
    }

    const match = medicineDatabase.find(
      (medicine) => normalize(medicine.drugName) === normalize(drugName)
    );

    return {
      success: true,
      data: match || {
        ...unknownLookup,
        drugName,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const scanMedicineText = async (
  ocrText: string
): Promise<ServiceResponse<MedicineScanResult>> => {
  try {
    const cacheKey = normalize(ocrText);
    const cachedResult = scanCache.get(cacheKey);

    if (cachedResult) {
      return {
        success: true,
        data: {
          ...cachedResult,
          cached: true,
        },
      };
    }

    const detectionResult = await detectDrugNameFromText(ocrText);

    if (!detectionResult.success) {
      return detectionResult;
    }

    const lookupResult = await lookupProhibitedStatus(detectionResult.data);

    if (!lookupResult.success) {
      return lookupResult;
    }

    const result: MedicineScanResult = {
      rawText: ocrText,
      detectedDrugName: detectionResult.data,
      lookup: lookupResult.data,
    };

    scanCache.set(cacheKey, result);

    return {
      success: true,
      data: result,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const saveMedicineScan = async (
  uid: string,
  lookup: MedicineLookupResult
): Promise<ServiceResponse<{ xpAwarded: number; duplicate: boolean }>> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const savedMedicines =
      (userSnap.data().savedMedicines as SavedMedicine[]) || [];
    const normalizedName = normalize(lookup.drugName);
    const isDuplicate = savedMedicines.some(
      (medicine) => normalize(medicine.drugName) === normalizedName
    );

    if (isDuplicate) {
      return {
        success: true,
        data: {
          xpAwarded: 0,
          duplicate: true,
        },
      };
    }

    const savedEntry: SavedMedicine = {
      drugName: lookup.drugName,
      status: lookup.status,
      guidance: lookup.guidance,
      scannedAt: new Date().toISOString(),
    };

    await updateDoc(userRef, {
      savedMedicines: arrayUnion(savedEntry),
      recentActivity: arrayUnion({
        type: 'scan',
        description: `Scanned ${lookup.drugName} (${lookup.status})`,
        timestamp: new Date().toISOString(),
      }),
    });

    let xpAwarded = 0;

    if (lookup.status !== 'Unknown') {
      const xpResult = await addXP(uid, 10);
      if (xpResult.success) {
        xpAwarded = 10;
      }
    }

    return {
      success: true,
      data: {
        xpAwarded,
        duplicate: false,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
