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
} from "react-native";
import { Colors as colors, palette } from "@/utils/colors";
import NotificationsIcon from "@/assets/icons/NotificationsIcon";
import { useState } from "react";
import { scale } from "@/utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Family } from "@/utils/typography";
import CaseCard from "@/components/common/CaseCard";
import FilterButton from "@/components/common/FiltterButton";
import { useQuery } from "@tanstack/react-query";
import {
  getPatintPosts,
  getPatintProfile,
} from "@/services/Patient/PatinetService";
import { Status } from "@/types/ICaseStatusProps";
import userBase from "../../../../assets/icon.png";
import { getUserMeta } from "@/services/tokenService";
import Loading from "@/components/common/Loading";

export default function PatientHomePage() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [filterStatus, setFilterStatus] = useState<Status | null>(null);
  const [selected, setSelcted] = useState("All");

  const {
    data: patient,
    isLoading: patientLoading,
    isError: patientError,
  } = useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      const meta = await getUserMeta();
      console.log(meta!.id);
      return getPatintProfile(meta!.id);
    },
  });

  const {
    data: patientPost,
    isLoading: patientPstLoading,
    isError: patientPostError,
  } = useQuery({
    queryKey: ["patientPost"],
    queryFn: async () => {
      const meta = await getUserMeta();
      console.log(meta!.id);
      return getPatintPosts(meta!.id);
    },
  });

  if (patientLoading || patientPstLoading) {
    return (
        <Loading />
    );
  }

  if (patientError || patientPostError) {
    return <Text>Error loading cases</Text>;
  }

  const filteredCases = filterStatus
    ? patientPost?.filter((c) => c.status === filterStatus)
    : patientPost;

  const STATUS_OPTIONS = [
    { label: "All", value: null },
    { label: "Under Review", value: "under_review" },
    { label: "Doctor Replied", value: "doctor_replied" },
    { label: "Resolved", value: "resolved" },
  ];

  const profilePic = patient?.profilePic ?? userBase;
  return (
    <AppBackground variant="logo">
      <View style={styles.container}>
        <SafeAreaView style={[styles.NavBar, { paddingTop: insets.top }]}>
          <Image style={styles.img} source={profilePic} />
          <IconWrapper shape="square" bgColor={palette.white} size={33}>
            <NotificationsIcon size={16} color={palette.black} />
          </IconWrapper>
        </SafeAreaView>

        <View style={{ marginVertical: scale(20) }}>
          <Text style={[styles.UserName, styles.Text]}>
            {patient?.nickname}
          </Text>
          <Text style={[styles.SubText, styles.Text]}>
            How are you feeling today?
          </Text>
        </View>
        <View style={styles.filterRow}>
          {STATUS_OPTIONS.map((status) => (
            <FilterButton
              key={status.value}
              title={status.label}
              isActive={
                selected === status.value ||
                (selected === "All" && status.value === null)
              }
              onPress={() => {
                setSelcted(status.value ?? "All");
                setFilterStatus(status.value);
              }}
            />
          ))}
        </View>
        {filteredCases.length > 0 ? (
          <View>
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
                  onPress={() =>
                    navigation.navigate("CaseDetailsAndRepliesScreen", {
                      caseId: item.id,
                      caseData: item,
                    })
                  }
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
    width: scale(40),
    height: scale(40),
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