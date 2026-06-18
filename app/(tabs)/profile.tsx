import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
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
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.featureCard}
            onPress={() => router.push('/analytics')}
        >

            <Text style={styles.featureTitle}>
            📈 Analytics
            </Text>
        </TouchableOpacity>

      </View>

      {/* Profile Card */}

      <LinearGradient
        colors={["#2563EB", "#1D4ED8"]}
        style={styles.profileCard}
      >
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              AS
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>
              Arjun Sharma
            </Text>

            <Text style={styles.userInfo}>
              Runner • Mumbai Academy
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
            value="2340"
            label="XP"
          />

          <StatCard
            icon="fire"
            value="12"
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
          title="6 Badges"
          subtitle="View all"
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
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* -------------------------------- */
/* COMPONENTS */
/* -------------------------------- */

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
          color="#94A3B8"
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
        color="#94A3B8"
      />
    </TouchableOpacity>
  );
}

/* -------------------------------- */
/* STYLES */
/* -------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  headerTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
  },

  settingsBtn: {
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 12,
  },

  profileCard: {
    borderRadius: 24,
    padding: 20,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor:
      "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },

  userName: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },

  userInfo: {
    color: "#DBEAFE",
    marginTop: 4,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  badgeText: {
    color: "white",
    marginLeft: 6,
    fontSize: 12,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  statCard: {
    backgroundColor:
      "rgba(255,255,255,0.15)",
    flex: 1,
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },

  statValue: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    marginTop: 4,
  },

  statLabel: {
    color: "#DBEAFE",
    fontSize: 12,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  quickCard: {
    width: "48%",
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 20,
  },

  quickTitle: {
    color: "white",
    fontWeight: "700",
    marginTop: 10,
  },

  quickSubtitle: {
    color: "#94A3B8",
    marginTop: 4,
    fontSize: 12,
  },

  featureCard: {
  backgroundColor: '#1E293B',
  padding: 16,
  borderRadius: 16,
  marginBottom: 12,
},

featureTitle: {
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
},

  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },

  rowTitle: {
    flex: 1,
    color: "white",
    fontSize: 15,
  },

  rowValue: {
    color: "#94A3B8",
    marginRight: 8,
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 18,
    borderRadius: 16,
    marginTop: 30,
    marginBottom: 40,
  },

  logoutText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});