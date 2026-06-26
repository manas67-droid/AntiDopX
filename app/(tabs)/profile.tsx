import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth, db } from "../../src/firebase/config";
import { getUserProfile } from "../../src/firebase/userService";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [age, setAge] = useState("");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState("");
  const [streak, setStreak] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSport, setEditSport] = useState("");
  const [editAge, setEditAge] = useState("");

  const loadProfile = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const result = await getUserProfile(currentUser.uid);
    if (!result.success || !result.data) return;

    const user = result.data;
    setName(user.name || "");
    setSport(user.sport || "");
    setAge(String(user.age || ""));
    setXp(user.xp || 0);
    setLevel(user.level || "Rookie");
    setStreak(user.streak || 0);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile]),
  );

  const handleStartEdit = () => {
    setEditName(name);
    setEditSport(sport);
    setEditAge(age);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    if (!editName.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        name: editName.trim(),
        sport: editSport.trim(),
        age: Number(editAge) || 0,
      });

      setName(editName.trim());
      setSport(editSport.trim());
      setAge(String(Number(editAge) || 0));
      setIsEditing(false);
      Alert.alert("Success", "Profile updated");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = async () => {
    const { logoutUser } = await import("../../src/firebase/logoutservices");
    const result = await logoutUser();
    if (result.success) {
      router.replace("/login");
    } else {
      Alert.alert("Error", result.error);
    }
  };

  const initials = name
    ? name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AT";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Profile</Text>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={isEditing ? handleSaveEdit : handleStartEdit}
        >
          <Text style={styles.editBtnText}>{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={[styles.profileCard, { backgroundColor: "#06B6D4" }]}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <View style={{ flex: 1 }}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Name"
                  placeholderTextColor="#94A3B8"
                />
                <TextInput
                  style={styles.editInput}
                  value={editSport}
                  onChangeText={setEditSport}
                  placeholder="Sport"
                  placeholderTextColor="#94A3B8"
                />
                <TextInput
                  style={styles.editInput}
                  value={editAge}
                  onChangeText={setEditAge}
                  placeholder="Age"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                />
              </>
            ) : (
              <>
                <Text style={styles.userName}>{name || "Athlete"}</Text>
                <Text style={styles.userInfo}>{sport || "Athlete"}</Text>
                <Text style={styles.userInfo}>Age: {age || "N/A"}</Text>

                <View style={styles.badge}>
                  <FontAwesome5 name="shield-alt" size={12} color="#fff" />
                  <Text style={styles.badgeText}>Clean Athlete</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="bolt" value={String(xp)} label="XP" />
          <StatCard icon="fire" value={String(streak)} label="Streak" />
          <StatCard icon="trophy" value={level} label="Level" />
        </View>
      </View>

      {/* Quick Cards */}
      <View style={styles.quickRow}>
        <QuickCard
          title="Achievements"
          subtitle="View Badges"
          icon="trophy"
          onPress={() => router.push("/achievements" as any)}
        />
        <QuickCard
          title="Analytics"
          subtitle="Knowledge Growth"
          icon="chart-bar"
          onPress={() => router.push("/analytics" as any)}
        />
      </View>

      {/* Library */}
      <Text style={styles.sectionTitle}>Library</Text>

      <MenuRow icon="book" title="Completed Modules" value="Progress" />
      <MenuRow icon="pills" title="Saved Medicines" value="Scanner" />
      <MenuRow icon="capsules" title="Saved Supplements" value="Roulette" />

      {/* Account */}
      <Text style={styles.sectionTitle}>Account</Text>

      <MenuRow title="Notifications" value="On" />
      <MenuRow title="Language" value="English" />
      <MenuRow title="Privacy & Data" />

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.push("/athlete-register" as any)}
        activeOpacity={0.8}
      >
        <MaterialIcons name="logout" size={22} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
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
      <FontAwesome5 name={icon} size={14} color="white" />
      <Text
        style={styles.statValue}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
      >
        {value}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
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
    <TouchableOpacity style={styles.quickCard} onPress={onPress}>
      <FontAwesome5 name={icon} size={22} color="#06B6D4" />
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickSubtitle}>{subtitle}</Text>
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
          color='#06B6D4'
          style={{ marginRight: 12 }}
        />
      )}
      <Text style={styles.rowTitle}>{title}</Text>
      {value && <Text style={styles.rowValue}>{value}</Text>}
      <MaterialIcons name="chevron-right" size={22} color='#06B6D4' />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  headerTitle: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "700",
  },

  editBtn: {
    backgroundColor: "#06B6D4",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
  },

  editBtnText: {
    color: "white",
    fontWeight: "700",
  },

  profileCard: {
    backgroundColor: "#06B6D4",
    borderRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    marginRight: 16,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  userName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  userInfo: {
    color: "#EAFBFF",
    fontSize: 15,
    marginTop: 4,
  },

  editInput: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    color: "white",
    fontSize: 16,
    marginBottom: 8,
    padding: 10,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 10,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },

  statValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  statLabel: {
    color: "#EAFBFF",
    fontSize: 12,
    marginTop: 4,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  quickCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  quickTitle: {
    color: "#000",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 10,
  },

  quickSubtitle: {
    color: "#000",
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
    backgroundColor: "#EF4444",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 18,
    marginTop: 30,
    marginBottom: 8, // Extra space above bottom tab
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
