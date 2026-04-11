import AppBackground from "@/components/base/AppBackground";
import IconWrapper from "@/components/common/IconWrapper";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { Colors as colors, palette } from "@/utils/colors";
import NotificationsIcon from "@/assets/icons/NotificationsIcon";
import BottomNavBar, { TabItem } from "@/components/base/BottomNavBar";
import HomeIcon from "@/assets/icons/HomeIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import ActivityLogIcon from "@/assets/icons/ActivityLogIcon";
import { useState } from "react";
import { scale } from "@/utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FabAddIcon from "@/assets/icons/FabAddIcon";
import { Family } from "@/utils/typography";
import CaseCard from "@/components/common/CaseCard";
import FilterButton from "@/components/common/FiltterButton";
import { dummyCases } from "@/types/mockData";

export default function PatientHomePage() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const insets = useSafeAreaInsets();
  const [filterStatus, setFilterStatus] = useState<null | string>(null);
  const [selected, setSelcted] = useState("All");

  const TABS: TabItem[] = [
    { name: "Dashboard", label: "Dashboard", icon: HomeIcon },
    { name: "ActivityLog", label: "Activity Log", icon: ActivityLogIcon },
    { name: "Notifications", label: "Notifications", icon: NotificationsIcon },
    { name: "Profile", label: "Profile", icon: ProfileIcon },
  ];

  const user = {
    profilePic: require("../../../../assets/ancura.gif"),
    name: "USER-XXXX",
  };

  const filteredCases = filterStatus
    ? dummyCases.filter((c) => c.status === filterStatus)
    : dummyCases;

  const STATUS_OPTIONS = ["All", "Under Review", "Doctor Replied", "Resolved"];

  return (
    <AppBackground variant="logo">
      <View style={styles.container}>
        <SafeAreaView style={[styles.NavBar, { paddingTop: insets.top }]}>
          <Image style={styles.img} source={user.profilePic} />
          <IconWrapper shape="square" bgColor={palette.white} size={33}>
            <NotificationsIcon size={16} color={palette.black} />
          </IconWrapper>
        </SafeAreaView>

        <View style={{ marginVertical: scale(20) }}>
          <Text style={[styles.UserName, styles.Text]}>{user.name}</Text>
          <Text style={[styles.SubText, styles.Text]}>
            How are you feeling today?
          </Text>
        </View>

        {filteredCases.length > 0 ? (
          <View>
            <View style={styles.filterRow}>
              {STATUS_OPTIONS.map((status) => (
                <FilterButton
                  key={status}
                  title={status}
                  isActive={selected === status}
                  onPress={() => {
                    setSelcted(status);
                    setFilterStatus(status === "All" ? null : status);
                  }}
                />
              ))}
            </View>
            <FlatList
              data={filteredCases}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: scale(12),
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CaseCard
                  data={item}
                  onPress={() => navigation.navigate("CaseDetailsAndRepliesScreen", { caseId: item.id, caseData: item })}
                />
              )}
              contentContainerStyle={{
                paddingBottom: scale(90),
                paddingTop: scale(10),
              }}
            />
          </View>
        ) : (
          <View style={styles.noCases}>
            <Text style={[styles.NoCasesHeaderText, styles.Text]}>
              You have no cases yet
            </Text>
            <Text style={[styles.NoCasesSubText, styles.Text]}>
              Post your first case
            </Text>
          </View>
        )}

        <View style={{ flex: 1 }} />
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  NavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: scale(33),
    height: scale(33),
  },
  container: {
    padding: scale(40),
    flex: 1,
  },
  Text: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(20),
  },
  UserName: {
    color: palette.dark,
  },
  SubText: {
    color: colors.primary,
  },
  noCases: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  NoCasesHeaderText: {
    color: palette.black,
  },
  NoCasesSubText: {
    color: palette.darkGreen,
    fontWeight: "bold",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(15),
  },
});
