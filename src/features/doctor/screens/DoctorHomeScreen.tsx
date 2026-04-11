import AppBackground from "@/components/base/AppBackground";
import IconWrapper from "@/components/common/IconWrapper";
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
import { CaseData } from "@/types/ICaseData";
import { dummyCases } from "@/types/mockData";
import DoctorBNB from "../components/DoctorBNB";

export default function DoctorHomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  const user = {
    profilePic: require("../../../../assets/ancura.gif"),
    name: "Dr.Aprar Ismail",
  };

  const doctorCases = dummyCases.filter(c => c.status !== "Resolved");

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
          data={doctorCases}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: scale(12),
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CaseCard
              data={{ ...item, status: undefined } as any}
              onPress={() => navigation.navigate("CaseDetailsAndRepliesScreen", { caseId: item.id, caseData: item, role: 'doctor' })}
            />
          )}
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
