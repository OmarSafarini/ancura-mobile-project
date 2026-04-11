import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import AppBackground from "@/components/base/AppBackground";
import { scale } from "@/utils/responsive";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import LogoutButton from "@/components/common/LogoutButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LocationIcon from "../../../assets/icons/LocationIcoon";
import EmailIcon from "../../../assets/icons/EmailIcon";
import TickIcon from "@/assets/icons/TickIcon";
import { IDoctor } from "@/types/IDoctor";
import IconWrapper from "../../../components/common/IconWrapper";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";

export default function DoctorProfile() {
  const doctor: IDoctor = {
    name: "Dr. Aprar Ismail",
    email: "aprar@gmail.com",
    profilePic: require("../../../../assets/ancura.gif"),
    location: "Nablus, Palestine",
    comments: 120,
    reputation: 150,
    experience: 4,
    license: {
      licenseNumber: 1923,
      licensingAuthority: "Palestinian Medical Council",
      verificationDate: 20 / 7 / 1998,
      verified: true,
    },
    bio: "Experienced doctor specializing in patient care, diagnosis, and treatment with a passion for helping people and improving healthcare outcomes.",
  };

  const insets = useSafeAreaInsets();

  const goBack = () => {
    navigation.goBack();
  }

  const LogOut = () => {
    navigation.navigate("DoctorLoginScreen");

  }
  return (
    <AppBackground variant="clean">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <SafeAreaView style={[styles.NavBar, { paddingTop: insets.top }]}>
              <Text style={styles.Text}>Profile & Settings</Text>
              <IconWrapper size={scale(33)} bgColor={palette.white} shape="square">
                <ArrowLeftIcon size={scale(18)} color={palette.dark} onPress={goBack} />
              </IconWrapper>
            </SafeAreaView>

            <View style={styles.profileCard}>
              <View style={styles.DoctorInfo}>
                <Image source={doctor.profilePic} style={styles.image} />
                <View style={{ gap: scale(10) }}>
                  <Text style={styles.name}>{doctor.name}</Text>
                  <View style={styles.TextWithIcon}>
                    <LocationIcon />
                    <Text style={styles.sub}> {doctor.location}</Text>
                  </View>
                  <View style={styles.TextWithIcon}>
                    <EmailIcon />
                    <Text style={styles.sub}>{doctor.email}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{doctor.comments}</Text>
                  <Text style={styles.statLabel}>Comments</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{doctor.reputation}</Text>
                  <Text style={styles.statLabel}>Reputation </Text>
                  <Text style={styles.statLabel}> Score</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{doctor.experience}</Text>
                  <Text style={styles.statLabel}>Years </Text>
                  <Text style={styles.statLabel}> Experence</Text>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardTextContainer}>
                <Text style={styles.cardTitle}>License Verification</Text>

                <View style={styles.TextContainer}>
                  <Text style={styles.cardText}>License Number </Text>
                  <Text style={styles.cardText}>
                    {doctor.license.licenseNumber}
                  </Text>
                </View>

                <View style={styles.TextContainer}>
                  <Text style={styles.cardText}>Licensing Authority:</Text>
                  <Text style={styles.cardText}>
                    {doctor.license.licensingAuthority}
                  </Text>
                </View>

                <View style={styles.TextContainer}>
                  <Text style={styles.cardText}>Verification Date</Text>
                  <Text style={styles.cardText}>
                    {doctor.license.verificationDate}
                  </Text>
                </View>
              </View>

              {doctor.license.verified && (
                <View style={styles.VerfiedContainer}>
                  <TickIcon size={20} />
                  <Text style={styles.verified}>Verified by Admin</Text>
                </View>
              )}
            </View>

            <View style={[styles.card, styles.BioCard]}>
              <Text style={styles.BioText}>About {doctor.name}</Text>
              <Text style={styles.bio}>{doctor.bio}</Text>
            </View>

            <SafeAreaView style={{ paddingBottom: insets.bottom }}>
              <LogoutButton onPress={LogOut} />
            </SafeAreaView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scale(40),
    justifyContent: "space-between",
    flex: 1,
    gap: scale(20),
  },
  NavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(20),
  },

  Text: {
    fontFamily: Family.FG_Medium,
    fontWeight: "500",
    fontSize: scale(24),
  },

  profileCard: {
    backgroundColor: "#ffffff4d",
    borderRadius: scale(18),
    padding: scale(25),
    alignItems: "center",
    gap: scale(8),
  },
  DoctorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(40),
  },
  image: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(100),
    borderWidth: scale(4),
    borderColor: Colors.primary,
  },
  TextWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    marginTop: scale(10),
  },
  name: {
    fontSize: scale(20),
    fontFamily: Family.FG_Bold,
    fontWeight: "600",
  },

  sub: {
    fontSize: scale(14),
    color: palette.dark,
    fontFamily: Family.FG_Regular,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(12),
    gap: scale(20),
  },

  statItem: {
    alignItems: "center",
    padding: scale(10),
    backgroundColor: "#6d7eb5ad",
    borderRadius: scale(16),
  },

  statNumber: {
    fontSize: scale(16),
    color: palette.white,
    fontFamily: Family.FG_Light,
  },

  statLabel: {
    fontSize: scale(12),
    color: palette.white,
    fontFamily: Family.FG_Regular,
  },

  card: {
    backgroundColor: "#ffffff4d",
    borderRadius: scale(18),
    gap: scale(8),
  },

  cardTitle: {
    fontSize: scale(24),
    fontWeight: "600",
    marginBottom: scale(4),
    fontFamily: Family.FG_Regular,
  },

  CardTextContainer: {
    padding: scale(18),
  },

  TextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(20),
  },
  cardText: {
    fontSize: scale(16),
    color: palette.dark,
    fontFamily: Family.FG_Regular,
    flexWrap: "wrap",
    marginTop: scale(10),
  },

  VerfiedContainer: {
    borderTopWidth: scale(2),
    borderColor: palette.white,
    padding: scale(18),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
  },
  verified: {
    color: palette.darkGreen,
    fontFamily: Family.FG_Regular,
    fontSize: scale(12),
  },

  BioCard: {
    padding: scale(18),
  },
  BioText: {
    fontSize: scale(24),
    marginBottom: scale(4),
    fontFamily: Family.FG_Regular,
  },

  bio: {
    fontSize: scale(14),
    color: palette.dark,
    lineHeight: scale(20),
  },
});
