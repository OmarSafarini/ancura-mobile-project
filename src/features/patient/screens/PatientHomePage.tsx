import { useNavigation } from "@react-navigation/native";
import AppScreenLayout from "@/layout/AppScreenLayout";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { Colors as colors, palette } from "@/utils/colors";
import NotificationsIcon from "@/assets/icons/NotificationsIcon";
import { useCallback, useEffect, useState } from "react";
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
const userBase = require("../../../../assets/icon.png");
import { getUserMeta } from "@/services/tokenService";
import { getLocalCases, saveCasesToLocal } from "@/services/localDb";
import PatientHeader from "../components/PatientHeader";
import MagicalGreeting from "../components/MagicalGreeting";
import FadeInView from "@/utils/FadeInView";
import { LinearGradient } from "expo-linear-gradient";

export default function PatientHomePage() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [filterStatus, setFilterStatus] = useState<Status | null>(null);
  const [selected, setSelcted] = useState("All");
  const [localCases, setLocalCases] = useState<any[]>([]);

  const loadLocal = useCallback(async () => {
    const data = await getLocalCases();
    setLocalCases(data);
  }, []);

  useEffect(() => {
    loadLocal();
  }, [loadLocal]);

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
      try {
        const meta = await getUserMeta();
        const data = await getPatintPosts(meta!.id);

        await saveCasesToLocal(data);

        return data;
      } catch (error) {
        console.log("PATIENT POSTS ERROR:", error);
        throw error;
      }
    },
    refetchOnMount: true,
  });

  // Removed page loading blocking screen to show cached localCases instantly

const displayCases =
  patientPost && patientPost.length > 0
    ? patientPost
    : localCases;
    
  const filteredCases = filterStatus
    ? displayCases?.filter((c: any) => c.status === filterStatus)
    : displayCases;

  const STATUS_OPTIONS: { label: string; value: Status | null }[] = [
    { label: "All", value: null },
    { label: "Under Review", value: "under_review" },
    { label: "Doctor Replied", value: "doctor_replied" },
    { label: "Resolved", value: "resolved" },
  ];

  const profilePic = patient?.profilePic ?? userBase;
  return (
    <AppScreenLayout variant="logo">
      <PatientHeader profilePic={profilePic} rightIcon="notification" useSafeArea={false} />

        <MagicalGreeting nickname={patient?.nickname} />
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
        {filteredCases && filteredCases.length > 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              data={filteredCases}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: scale(12),
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <FadeInView
                  delay={index * 80}
                  duration={450}
                  translateYStart={15}
                  style={{ width: scale(160) }}
                >
                  <CaseCard
                    data={item}
                    onPress={() =>
                      navigation.navigate("CaseDetailsAndRepliesScreen", {
                        caseId: item.id,
                        caseData: item,
                      })
                    }
                  />
                </FadeInView>
              )}
              contentContainerStyle={{
                paddingBottom: scale(90),
                paddingHorizontal: scale(6),
                paddingTop: scale(10),
              }}
            />
            <LinearGradient
              colors={[
                "rgba(195, 227, 199, 0)",
                "rgba(195, 227, 199, 0.8)",
                "rgba(195, 227, 199, 1)",
              ]}
              style={styles.bottomBlur}
              pointerEvents="none"
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
    </AppScreenLayout>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: Family.FG_Bold,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(8),
    marginBottom: scale(15),
  },
  listContainer: {
    flex: 1,
    position: "relative",
  },
  bottomBlur: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: scale(80),
  },
});
