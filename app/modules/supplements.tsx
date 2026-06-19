<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 66c7512ca09613133e2d6dc048c9b0e50c760da7
import { LearningModuleScreen } from '../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../src/learning/modules';

export default function SupplementsScreen() {
<<<<<<< HEAD
  return (
    <LearningModuleScreen
      module={getLearningModuleBySlug('supplements')}
    />
  );
}
=======
  const module = getLearningModuleBySlug('supplements');

  if (!module) {
    return null;
  }

  return (
    <LearningModuleScreen
      module={module}
    />
  );
}
>>>>>>> 66c7512ca09613133e2d6dc048c9b0e50c760da7
