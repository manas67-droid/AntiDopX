import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../src/firebase/config";
import { getUserProfile } from "../../src/firebase/userService";


export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  
  useEffect(() => {
  const loadProfile = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const result = await getUserProfile(
      currentUser.uid
    );

    if (!result.success || !result.data)
      return;

    const user = result.data;

    setName(user.name || '');
    setSport(user.sport || '');
    setXp(user.xp || 0);
    setStreak(user.streak || 0);
  };

  loadProfile();
}, []);
    

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}

      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>
          Profile
        </Text>

        <TouchableOpacity style={styles.settingsBtn}>
          <Ionicons
            name="settings-outline"
            size={22}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}

      <LinearGradient
        colors={["#1c6f90", "#14C8E8"]}
        style={styles.profileCard}
      >
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name
                ? name
                   .split(' ')
                   .map(word => word[0])
                   .join('')
                   .slice(0, 2)
                   .toUpperCase()
                : 'AT'}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>
              {name || 'Athlete'}
            </Text>

            <Text style={styles.userInfo}>
               {sport || 'Athlete'}
            </Text>

            <View style={styles.badge}>
              <FontAwesome5
                name="shield-alt"
                size={12}
                color="#fff"
              />

              <Text style={styles.badgeText}>
                Clean Athlete
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}

        <View style={styles.statsRow}>
          <StatCard
            icon="bolt"
            value={String(xp)}
            label="XP"
          />

          <StatCard
            icon="fire"
            value={String(streak)}
            label="Streak"
          />

          <StatCard
            icon="trophy"
            value="#42"
            label="Rank"
          />
        </View>
      </LinearGradient>

      {/* Quick Cards */}

      <View style={styles.quickRow}>
        <QuickCard
          title="Achievements"
          subtitle="View Badges"
          icon="trophy"
          onPress={() =>
            router.push("/achievements")
          }
        />

        <QuickCard
          title="Analytics"
          subtitle="Knowledge Growth"
          icon="chart-bar"
          onPress={() =>
            router.push("/analytics")
          }
        />
      </View>

      {/* Library */}

      <Text style={styles.sectionTitle}>
        Library
      </Text>

      <MenuRow
        icon="book"
        title="Completed Modules"
        value="3 / 6"
      />

      <MenuRow
        icon="pills"
        title="Saved Medicines"
        value="12"
      />

      <MenuRow
        icon="capsules"
        title="Saved Supplements"
        value="8"
      />

      {/* Account */}

      <Text style={styles.sectionTitle}>
        Account
      </Text>

      <MenuRow
        title="Notifications"
        value="On"
      />

      <MenuRow
        title="Language"
        value="English"
      />

      <MenuRow title="Privacy & Data" />

      <MenuRow title="About AntiDopX" />

      {/* Logout */}

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name="logout"
          size={22}
          color="white"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


function StatCard({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <FontAwesome5
        name={icon}
        size={14}
        color="white"
      />

      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

function QuickCard({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string;
  subtitle: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.quickCard}
      onPress={onPress}
    >
      <FontAwesome5
        name={icon}
        size={22}
        color="#2563EB"
      />

      <Text style={styles.quickTitle}>
        {title}
      </Text>

      <Text style={styles.quickSubtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

function MenuRow({
  title,
  value,
  icon,
}: {
  title: string;
  value?: string;
  icon?: string;
}) {
  return (
    <TouchableOpacity style={styles.row}>
      {icon && (
        <FontAwesome5
          name={icon}
          size={18}
          color="#14C8E8"
          style={{ marginRight: 12 }}
        />
      )}

      <Text style={styles.rowTitle}>
        {title}
      </Text>

      {value && (
        <Text style={styles.rowValue}>
          {value}
        </Text>
      )}

      <MaterialIcons
        name="chevron-right"
        size={22}
        color="#14c8E8"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },

  headerTitle: {
    color: '#000000',
    fontSize: 30,
    fontWeight: '700',
  },

  settingsBtn: {
    backgroundColor: '#fff',
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileCard: {
    backgroundColor: '#14C8E8',
    borderRadius: 30,
    padding: 24,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    marginRight: 16,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },

  userName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  userInfo: {
    color: '#EAFBFF',
    fontSize: 14,
    marginTop: 4,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.18)',

    alignSelf: 'flex-start',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,
    marginTop: 10,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  statValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },

  statLabel: {
    color: '#EAFBFF',
    fontSize: 12,
    marginTop: 4,
  },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  quickCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 22,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  quickTitle: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    marginTop: 10,
  },

  quickSubtitle: {
    color: '#000',
    marginTop: 4,
    fontSize: 12,
  },

  sectionTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 12,
  },

  featureCard: {
    backgroundColor: '#14C8E8',
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  featureTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 10,
  },

  rowTitle: {
    flex: 1,
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },

  rowValue: {
    color: '#2a3038',
    marginRight: 8,
  },

  logoutButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 18,
    marginTop: 30,
    marginBottom: 40,
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});