import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView } from "react-native";
import AppBackground from "@/components/base/AppBackground";
import DoctorGreeting from "../components/DoctorGreeting";
import CaseCard from "@/components/common/CaseCard";
import { dashboardChartData } from "@/types/mockData";
import IconWrapper from "@/components/common/IconWrapper";
import ClockIcon from "@/assets/icons/ClockIcon";
import ChatIcon from "../../../assets/icons/ChatIcon";
import StartwithTickIcon from "../../../assets/icons/StartwithTickIcon";
import StatisticsSection from "../components/ViewStatisticSection";
import Loading from "@/components/common/Loading";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";
import { useUserSession } from "@/hooks/useUserSession";
import { useDoctorBasicInfo } from "@/hooks/useDoctorBasicInfo";
import { useGetDoctorCases } from "@/hooks/useGetDoctorCases";
import { getDoctorDashboardStats } from "@/services/Doctor/DoctorDashboard";
import { useQueryClient } from "node_modules/@tanstack/react-query/build/modern/_tsup-dts-rollup";

export default function DoctorDashboardAndCases({ navigation }: any) {
  const scrollRef = useRef<ScrollView>(null);
  const queryClient = useQueryClient();

  const { doctorId } = useUserSession();
  const { data: doctorInfo } = useDoctorBasicInfo(doctorId);
  const { previewCases, isPending, isFetching, isError, refetch } = useGetDoctorCases();

  const handleViewAllCases = useCallback(() => {
    if (!doctorId) return;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["doctorDashboard", "Weekly", doctorId],
      queryFn: () => getDoctorDashboardStats(doctorId, "Weekly"),
      staleTime: 3 * 60 * 1000,
    }),

    queryClient.prefetchQuery({
      queryKey: ["doctorDashboard", "Monthly", doctorId],
      queryFn: () => getDoctorDashboardStats(doctorId, "Monthly"),
      staleTime: 3 * 60 * 1000,
    }),

    queryClient.prefetchQuery({
      queryKey: ["doctorDashboard", "All Time", doctorId],
      queryFn: () => getDoctorDashboardStats(doctorId, "All Time"),
      staleTime: 3 * 60 * 1000,
    }),
  ]);

  navigation.navigate("DashboardScreen");
}, [navigation, queryClient, doctorId]);

  const handleViewDashboardScreen = useCallback(() => {
    navigation.navigate("DashboardScreen");
  }, [navigation]);

  const handleOpenCase = useCallback(
    (item: any) => {
      navigation.navigate("CaseDetailsAndRepliesScreen", {
        caseId: item.id,
        caseData: item,
        role: "doctor",
      });
    },
    [navigation]
  );

  const handleRetry = useCallback(() => {
    refetch();
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [refetch]);

  const caseCards = useMemo(
    () =>
      previewCases.map((item) => (
        <View key={item.id} style={styles.cardContainer}>
          <CaseCard
            data={{
              ...item,
              status: "empty",
            }}
            onPress={() => handleOpenCase(item)}
          />
        </View>
      )),
    [previewCases, handleOpenCase]
  );

  if (isPending && previewCases.length === 0) {
    return <Loading text="Loading cases..." />;
  }

  return (
    <AppBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.screen}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentWrapper}>
            <View style={styles.greetingContainer}>
              <DoctorGreeting
                name={doctorInfo?.full_name || "Doctor"}
                image={doctorInfo?.profilePic ? { uri: doctorInfo.profilePic } : undefined}
              />
            </View>

            {isError ? (
              <Pressable onPress={handleRetry}>
                <Text style={styles.errorText}>Failed to load cases. Press to retry.</Text>
              </Pressable>
            ) : null}

            {isFetching && !isPending ? (
              <Text style={styles.updatingText}>Updating cases...</Text>
            ) : null}

            <View style={styles.box}>
              <View style={styles.chartBox}>
                <StatisticsSection data={dashboardChartData} onPress={handleViewDashboardScreen} />
              </View>

              <View style={styles.iconsColumn}>
                <IconWrapper size={scale(65)} bgColor={Colors.secondary} shape="square">
                  <ClockIcon size={scale(29)} color={palette.white} />
                </IconWrapper>

                <IconWrapper size={scale(65)} bgColor={palette.white} shape="square">
                  <ChatIcon size={scale(27)} color={Colors.primary} />
                </IconWrapper>

                <IconWrapper size={scale(65)} bgColor={Colors.primary} shape="square">
                  <StartwithTickIcon size={scale(29)} color={palette.white} />
                </IconWrapper>
              </View>
            </View>

            <View style={styles.casesContainer}>
              <View style={styles.grid}>{caseCards}</View>

              <Pressable style={styles.viewCasesContainer} onPress={handleViewAllCases}>
                <Text style={styles.viewCases}>View all cases</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: scale(20),
  },

  contentWrapper: {
    width: scale(333),
  },

  greetingContainer: {
    alignSelf: 'flex-start',
    marginLeft: -scale(20),
    marginBottom: scale(20),
  },

  box: {
    width: scale(333),
    height: scale(217),
    flexDirection: "row",
    justifyContent: "space-between",
    //marginBottom: scale(25),
  },

  chartBox: {
    width: scale(230),
    height: scale(215),
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: scale(24),
    overflow: "hidden",
    padding: 0,
  },

  iconsColumn: {
    width: scale(80),
    height: scale(217),
    justifyContent: "space-between",
    alignItems: "center",
  },

  casesContainer: {
    width: scale(333),
    marginTop: scale(20),
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardContainer: {
    width: scale(160),
    marginBottom: scale(15),
  },

  viewCasesContainer: {
    marginTop: scale(15),
    alignSelf: 'flex-end',
  },

  viewCases: {
    fontSize: scale(14),
    fontFamily: Family.FG_Regular,
    color: Colors.secondary,
  },
});