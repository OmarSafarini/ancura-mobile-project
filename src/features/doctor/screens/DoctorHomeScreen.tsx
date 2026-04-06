import AppBackground from "@/components/layout/AppBackground";
import IconWrapper from "@/features/doctor/components/Icons/IconWrapper";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Colors as colors, palette } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Family } from "@/utils/typography";
import CaseCard from "@/components/common/CaseCard";
import { CaseData } from "@/types/CaseData";
import DoctorBNB from "../components/DoctorBNB";

export default function DoctorHomeScreen() {
  const insets = useSafeAreaInsets();

  const user = {
    profilePic: require("../../../../assets/ancura.gif"),
    name: "Dr.Aprar Ismail",
  };

  const dummyCases: CaseData[] = [
    {
      id: 1,
      patient_id: 101,
      title: "Headache and fever",
      description: "Patient has been experiencing headache for 2 days",
      created_at: "2026-04-02",
      isEmergency: false,
    },
    {
      id: 2,
      patient_id: 102,
      title: "Skin Rash",
      description: "Red rash on arms",
      created_at: "2026-04-01",
      isEmergency: true,
    },
    {
      id: 3,
      patient_id: 103,
      title: "Skin Rash",
      description: "Red rash on arms",
      created_at: "2026-04-01",
      isEmergency: false,
    },
    {
      id: 4,
      patient_id: 104,
      title: "Headache and fever",
      description: "Patient has been experiencing headache for 2 days",
      created_at: "2026-04-02",
      isEmergency: false,
    },
    {
      id: 5,
      patient_id: 105,
      title: "Skin Rash",
      description: "Red rash on arms",
      created_at: "2026-04-01",
      isEmergency: true,
    },
    {
      id: 6,
      patient_id: 106,
      title: "Skin Rash",
      description: "Red rash on arms",
      created_at: "2026-04-01",
      isEmergency: false,
    },
    {
      id: 7,
      patient_id: 107,
      title: "Headache and fever",
      description: "Patient has been experiencing headache for 2 days",
      created_at: "2026-04-02",
      isEmergency: false,
    },
    {
      id: 8,
      patient_id: 108,
      title: "Skin Rash",
      description: "Red rash on arms",
      created_at: "2026-04-01",
      isEmergency: true,
    },
    {
      id: 9,
      patient_id: 109,
      title: "Skin Rash",
      description: "Red rash on arms",
      created_at: "2026-04-01",
      isEmergency: false,
    },
    {
      id: 10,
      patient_id: 110,
      title: "Headache and fever",
      description: "Patient has been experiencing headache for 2 days",
      created_at: "2026-04-02",
      isEmergency: false,
    },
    {
      id: 11,
      patient_id: 111,
      title: "Skin Rash",
      description: "Red rash on arms",
      created_at: "2026-04-01",
      isEmergency: true,
    },
    {
      id: 12,
      patient_id: 112,
      title: "Skin Rash",
      description: "Red rash on arms",
      created_at: "2026-04-01",
      status: "Resolved",
      isEmergency: false,
    },
  ];

  function greeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }
  return (
    <AppBackground variant="clean">
      <View style={styles.container}>
        <SafeAreaView style={[styles.NavBar, { paddingTop: insets.top }]}>
          <Image style={styles.img} source={user.profilePic} />
          <View style={{ marginLeft: scale(5) }}>
            <Text style={styles.greeting}>{greeting()}</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </SafeAreaView>

        <FlatList
          data={dummyCases}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: scale(12),
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CaseCard data={item} />}
          contentContainerStyle={{
            paddingBottom: scale(90),
            paddingTop: scale(10),
          }}
        />
      </View>
      
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  NavBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(3),
  },
  img: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(50),
  },
  container: {
    padding: scale(40),
    flex: 1,
  },
  greeting: {
    fontSize: scale(16),
    fontFamily: Family.FG_Regular,
    color: palette.darkGray,
  },
  userName: {
    fontSize: scale(18),
    fontFamily: Family.FG_Medium,
    fontWeight: "500",
    color: palette.dark,
  },
});
