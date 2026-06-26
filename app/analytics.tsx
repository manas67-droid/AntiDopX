import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const weeks = [40, 55, 30, 70, 65, 85, 60];

const modules = [
  { name: 'Basics', pct: 100, color: '#22C55E' },
  { name: 'Substances', pct: 60, color: '#2563EB' },
  { name: 'Testing', pct: 20, color: '#F59E0B' },
  { name: 'TUE', pct: 0, color: '#475569' },
  { name: 'Supplements', pct: 0, color: '#475569' },
  { name: 'Ethics', pct: 0, color: '#475569' },
];

export default function AnalyticsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#64748B"
          />
        </TouchableOpacity>

        <View style={styles.filter}>
          <Text style={styles.filterText}>
            Last 30 Days
          </Text>
        </View>
      </View>

      <Text style={styles.title}>
        Your Progress
      </Text>

      <Text style={styles.subtitle}>
        Where your knowledge is growing.
      </Text>

      {/* KPI CARDS */}

      <View style={styles.kpiGrid}>
        <KpiCard
          icon={
            <MaterialIcons
              name="trending-up"
              size={24}
              color="white"
            />
          }
          value="+38%"
          label="Knowledge Growth"
        />

        <KpiCard
          icon={
            <FontAwesome5
              name="brain"
              size={22}
              color="white"
            />
          }
          value="84%"
          label="Quiz Accuracy"
        />

        <KpiCard
          icon={
            <MaterialIcons
              name="track-changes"
              size={24}
              color="white"
            />
          }
          value="3/6"
          label="Modules Complete"
        />

        <KpiCard
          icon={
            <Ionicons
              name="calendar"
              size={24}
              color="white"
            />
          }
          value="12d"
          label="Active Streak"
        />
      </View>

      {/* XP CHART */}

      <View style={styles.card}>
        <View style={styles.chartHeader}>
          <View>
            <Text style={styles.chartLabel}>
              MONTHLY XP
            </Text>

            <Text style={styles.chartXP}>
              2,340 XP
            </Text>
          </View>

          <Text style={styles.growth}>
            +18% vs last month
          </Text>
        </View>

        <View style={styles.chartContainer}>
          {weeks.map((value, index) => (
            <View
              key={index}
              style={styles.barWrapper}
            >
              <View
                style={[
                  styles.bar,
                  {
                    height: value,
                  },
                ]}
              />

              <Text style={styles.barLabel}>
                W{index + 1}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* MODULE PROGRESS */}

      <View style={styles.card}>
        <Text style={styles.chartLabel}>
          MODULE COMPLETION
        </Text>

        {modules.map((module) => (
          <View
            key={module.name}
            style={styles.moduleRow}
          >
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleName}>
                {module.name}
              </Text>

              <Text style={styles.modulePercent}>
                {module.pct}%
              </Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${module.pct}%`,
                    backgroundColor:
                      module.color,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* WEAK AREA */}

      <View style={styles.warningCard}>
        <Text style={styles.warningLabel}>
          WEAK AREA
        </Text>

        <Text style={styles.warningTitle}>
          TUE Process Needs Attention
        </Text>

        <Text style={styles.warningDescription}>
          You answered only 3 out of 6
          questions correctly. Review the
          TUE module before your next test.
        </Text>

        <TouchableOpacity
          style={styles.studyButton}
          onPress={() =>
            router.push('/learning-journey')
          }
        >
          <Text style={styles.studyButtonText}>
            Study TUE →
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function KpiCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.kpiCard}>
      <View style={styles.kpiIcon}>
        {icon}
      </View>

      <Text style={styles.kpiValue}>
        {value}
      </Text>

      <Text style={styles.kpiLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#F8FAFC',
  paddingHorizontal: 18,
},
  headerRow: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#FFFFFF',

  justifyContent: 'center',
  alignItems: 'center',

  borderWidth: 1,
  borderColor: '#E5E7EB',

  elevation: 2,
},
 filter: {
  backgroundColor: '#FFFFFF',

  paddingHorizontal: 16,
  paddingVertical: 10,

  borderRadius: 20,

  borderWidth: 1,
  borderColor: '#E5E7EB',

  elevation: 2,
},
filterText: {
  color: '#0F172A',
  fontSize: 12,
  fontWeight: '600',
},
 title: {
  color: '#0F172A',
  fontSize: 38,
  fontWeight: '800',
  marginTop: 24,
},

  subtitle: {
  color: '#64748B',
  fontSize: 15,
  marginTop: 4,
  marginBottom: 18,
},

  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
kpiCard: {
  width: '48%',

  backgroundColor: '#FFFFFF',

  borderRadius: 22,

  padding: 18,

  marginBottom: 16,

  borderWidth: 1,
  borderColor: '#E5E7EB',

  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 3,
  },

  elevation: 3,
},

 kpiIcon: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: '#1EB9F0',
  justifyContent: 'center',
  alignItems: 'center',
},

kpiValue: {
  color: '#0F172A',
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 12,
},

kpiLabel: {
  color: '#64748B',
  marginTop: 4,
  fontSize: 12,
},

card: {
  backgroundColor: '#FFFFFF',

  borderRadius: 24,

  padding: 20,

  marginTop: 18,

  borderWidth: 1,
  borderColor: '#E5E7EB',

  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 3,
  },

  elevation: 3,
},

  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

 chartLabel: {
  color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
  },
chartXP: {
  color: '#0F172A',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },

  growth: {
    color: '#22C55E',
    fontWeight: '700',
  },

  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    marginTop: 24,
  },

  barWrapper: {
    flex: 1,
    alignItems: 'center',
  },

  bar: {
    width: 20,
    backgroundColor: '#06B6D4',
    borderRadius: 6,
  },

  barLabel: {
    color: '#94A3B8',
    marginTop: 6,
    fontSize: 10,
  },

  moduleRow: {
    marginTop: 16,
  },

  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

 moduleName: {
  color: '#0F172A',
    fontWeight: '600',
  },

 modulePercent: {
  color: '#64748B',
},

  progressBackground: {
    height: 8,
    backgroundColor:  '#E5E7EB',
    borderRadius: 10,
    marginTop: 6,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
  },

  warningCard: {
  backgroundColor: '#FF824D',

  borderRadius: 24,

  padding: 20,

  marginTop: 20,

  marginBottom: 40,
},

  warningLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },

  warningTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
  },

  warningDescription: {
    color: 'white',
    marginTop: 10,
    lineHeight: 22,
  },

  studyButton: {
  backgroundColor: '#FFFFFF',

  paddingHorizontal: 18,

  paddingVertical: 10,

  borderRadius: 24,

  marginTop: 18,

  alignSelf: 'flex-start',
},

  studyButtonText: {
    color: '#F59E0B',
    fontWeight: 'bold',
  },
});