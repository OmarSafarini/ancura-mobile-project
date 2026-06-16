import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import AppBackground from "@/components/base/AppBackground";
import { scale } from "@/utils/responsive";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import LogoutButton from "@/components/common/LogoutButton";
import LocationIcon from "../../../assets/icons/LocationIcoon";
import EmailIcon from "../../../assets/icons/EmailIcon";
import TickIcon from "@/assets/icons/TickIcon";
import BackButton from "@/components/common/BackButton";
import { IDoctor } from "@/types/IDoctor";
import { useQuery } from "@tanstack/react-query";
import {
  getDoctorLicense,
  getDoctorProfile,
} from "@/services/Doctor/DoctorService";
import { ILicense } from "@/types/ILicense";
import { signOut } from "../../../services/authService";
import { getUserMeta } from "@/services/tokenService";
import FadeInView from "@/utils/FadeInView";
import { getDoctorDashboardStats } from "@/services/Doctor/DoctorDashboard";
import { Feather } from "@expo/vector-icons";

export default function DoctorProfile({ navigation }: any) {
  const [Comments, setComments] = useState(0);
  const [Score, SetScore] = useState(0);

  const {
    data: doctor,
    isLoading: doctorLoading,
    isError: doctorError,
  } = useQuery<IDoctor>({
    queryKey: ["doctor"],
    queryFn: async () => {
      const meta = await getUserMeta();
      if (!meta?.id) {
        throw new Error("User meta not found");
      }
      return getDoctorProfile(meta.id);
    },
    refetchOnMount: true,
  });

  const {
    data: license,
    isLoading: LicenseLoading,
    isError: LicenseError,
  } = useQuery<ILicense>({
    queryKey: ["license"],
    queryFn: async () => {
      const meta = await getUserMeta();
      if (!meta?.id) {
        throw new Error("User meta not found");
      }
      return getDoctorLicense(meta!.id);
    },
    refetchOnMount: true,
  });

  useEffect(() => {
    const loadStats = async () => {
      if (doctor?.id) {
        const stats = await getDoctorDashboardStats(doctor.id);
        setComments(stats.comments);
        SetScore(stats.score);
      }
    };
    loadStats();
  }, [doctor]);

  if (doctorError || LicenseError) {
    return (
      <AppBackground variant="clean">
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontFamily: Family.FG_Medium, fontSize: scale(16), color: Colors.warning }}>
            Error loading profile details.
          </Text>
        </SafeAreaView>
      </AppBackground>
    );
  }

  const goBack = () => {
    navigation.goBack();
  };

  const LogOut = async () => {
    await signOut();
  };

  const doctorName = doctor?.full_name || "Doctor";

  const cleanDrName = () => {
    if (!doctor?.full_name) return "Dr. Doctor";
    const nameWithoutDr = doctor.full_name.replace(/^(dr\.|dr)\s+/i, "");
    const firstName = nameWithoutDr.split(" ")[0];
    return `Dr. ${firstName}`;
  };

  return (
    <AppBackground variant="clean">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            {/* Header section */}
            <FadeInView delay={0} translateYStart={15}>
              <View style={styles.header}>
                <Text style={styles.title}>Profile & Settings</Text>
                <BackButton onPress={goBack} />
              </View>
            </FadeInView>

            {/* Profile Info Glass Card */}
            <FadeInView delay={100} translateYStart={15}>
              <View style={styles.profileCard}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={doctor?.profilePic ? { uri: doctor.profilePic } : undefined}
                    style={styles.image}
                    transition={150}
                  />
                </View>
                <View style={styles.doctorMeta}>
                  <Text style={styles.name}>{doctorName}</Text>
                  
                  <View style={styles.contactRow}>
                    <LocationIcon />
                    <Text style={styles.contactText}>
                      {doctor?.location || "Not Specified"}
                    </Text>
                  </View>
                  
                  <View style={styles.contactRow}>
                    <EmailIcon />
                    <Text style={styles.contactText} numberOfLines={1}>
                      {doctor?.email || "..."}
                    </Text>
                  </View>
                </View>
              </View>
            </FadeInView>

            {/* Statistics Staggered Section */}
            <FadeInView delay={200} translateYStart={15}>
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <View style={[styles.statIconCircle, { backgroundColor: "rgba(142, 179, 146, 0.15)" }]}>
                    <Feather name="message-square" size={scale(15)} color={Colors.secondary} />
                  </View>
                  <Text style={styles.statNumber}>{doctorLoading ? "..." : Comments}</Text>
                  <Text style={styles.statLabel}>Comments</Text>
                </View>

                <View style={styles.statCard}>
                  <View style={[styles.statIconCircle, { backgroundColor: "rgba(142, 179, 146, 0.15)" }]}>
                    <Feather name="star" size={scale(15)} color={Colors.secondary} />
                  </View>
                  <Text style={[styles.statNumber, { color: Colors.secondary }]}>{doctorLoading ? "..." : Score}</Text>
                  <Text style={styles.statLabel}>Reputation</Text>
                </View>

                <View style={styles.statCard}>
                  <View style={[styles.statIconCircle, { backgroundColor: "rgba(142, 179, 146, 0.15)" }]}>
                    <Feather name="award" size={scale(15)} color={Colors.secondary} />
                  </View>
                  <Text style={styles.statNumber}>{LicenseLoading ? "..." : (license?.years_exp ?? "0")}</Text>
                  <Text style={styles.statLabel}>Years Exp</Text>
                </View>
              </View>
            </FadeInView>

            {/* License Verification Card */}
            <FadeInView delay={300} translateYStart={15}>
              <View style={styles.glassCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardHeaderTitle}>License Verification</Text>
                  {license?.is_verified && (
                    <View style={styles.verifiedBadge}>
                      <TickIcon size={12} />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  )}
                </View>

                <View style={styles.divider} />

                <View style={styles.detailList}>
                  <View style={styles.detailItem}>
                    <View style={[styles.detailIconContainer, { backgroundColor: "rgba(142, 179, 146, 0.1)" }]}>
                      <Feather name="hash" size={scale(13)} color={Colors.secondary} />
                    </View>
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>License Number</Text>
                      <Text style={styles.detailValue}>{LicenseLoading ? "..." : (license?.license_number || "Pending")}</Text>
                    </View>
                  </View>

                  <View style={styles.detailItem}>
                    <View style={[styles.detailIconContainer, { backgroundColor: "rgba(142, 179, 146, 0.1)" }]}>
                      <Feather name="shield" size={scale(13)} color={Colors.secondary} />
                    </View>
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Licensing Authority</Text>
                      <Text style={styles.detailValue}>{LicenseLoading ? "..." : (license?.authority || "Pending")}</Text>
                    </View>
                  </View>

                  <View style={styles.detailItem}>
                    <View style={[styles.detailIconContainer, { backgroundColor: "rgba(142, 179, 146, 0.1)" }]}>
                      <Feather name="calendar" size={scale(13)} color={Colors.secondary} />
                    </View>
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Issue Date</Text>
                      <Text style={styles.detailValue}>{LicenseLoading ? "..." : (license?.issue_date || "Pending")}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </FadeInView>

            {/* About Doctor Bio Card */}
            <FadeInView delay={400} translateYStart={15}>
              <View style={styles.glassCard}>
                <Text style={styles.cardHeaderTitle}>About {cleanDrName()}</Text>
                <View style={styles.divider} />
                <Text style={styles.bioText}>
                  {doctorLoading ? "..." : (doctor?.bio || "No biography provided yet. Dr. " + doctorName + " is a licensed practitioner dedicated to providing exceptional patient care.")}
                </Text>
              </View>
            </FadeInView>

            {/* Logout button */}
            <FadeInView delay={500} translateYStart={15}>
              <View style={styles.logoutWrapper}>
                <LogoutButton onPress={LogOut} />
              </View>
            </FadeInView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: scale(60),
  },
  container: {
    paddingHorizontal: scale(24),
    flex: 1,
    gap: scale(18),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scale(10),
    marginBottom: scale(8),
  },
  title: {
    fontSize: scale(24),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
  },
  profileCard: {
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: scale(18),
    borderWidth: scale(1),
    borderColor: "rgba(255, 255, 255, 0.6)",
    padding: scale(18),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarWrapper: {
    width: scale(86),
    height: scale(86),
    borderRadius: scale(43),
    borderWidth: scale(3),
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: "#E4E0EB",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  doctorMeta: {
    flex: 1,
    gap: scale(6),
  },
  name: {
    fontSize: scale(20),
    fontFamily: Family.FG_Bold,
    color: Colors.textDark,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  contactText: {
    fontSize: scale(12.5),
    color: "#444346",
    fontFamily: Family.FG_Regular,
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(8),
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: scale(18),
    borderWidth: scale(1),
    borderColor: "rgba(255, 255, 255, 0.6)",
    paddingVertical: scale(14),
    paddingHorizontal: scale(8),
    alignItems: "center",
    justifyContent: "center",
    gap: scale(4),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  statIconCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scale(4),
  },
  statNumber: {
    fontSize: scale(18),
    fontFamily: Family.FG_Bold,
    color: Colors.secondary,
  },
  statLabel: {
    fontSize: scale(10.5),
    fontFamily: Family.FG_Regular,
    color: "#666666",
    textAlign: "center",
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: scale(18),
    borderWidth: scale(1),
    borderColor: "rgba(255, 255, 255, 0.6)",
    padding: scale(18),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeaderTitle: {
    fontSize: scale(16),
    fontFamily: Family.FG_Bold,
    color: Colors.textDark,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 167, 111, 0.12)",
    borderRadius: scale(12),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3.5),
    gap: scale(4),
  },
  verifiedText: {
    color: "#00A76F",
    fontFamily: Family.FG_Medium,
    fontSize: scale(9.5),
  },
  divider: {
    height: scale(1),
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    marginVertical: scale(12),
  },
  detailList: {
    gap: scale(12),
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  detailIconContainer: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: scale(0.5),
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: scale(9.5),
    fontFamily: Family.FG_Regular,
    color: "#7E7C84",
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: scale(13.5),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
  },
  bioText: {
    fontSize: scale(13),
    fontFamily: Family.FG_Regular,
    color: "#444346",
    lineHeight: scale(19),
  },
  logoutWrapper: {
    marginTop: scale(6),
    width: "100%",
  },
});
