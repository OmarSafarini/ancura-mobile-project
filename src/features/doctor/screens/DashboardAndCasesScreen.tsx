import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useQuery } from '@tanstack/react-query';
import AppBackground from "@/components/base/AppBackground";
import DoctorGreeting from "../components/DoctorGreeting";
import CaseCard from "@/components/common/CaseCard";
import { dummyCases, dashboardChartData } from "@/types/mockData";
import IconWrapper from "@/components/common/IconWrapper";
import ClockIcon from "@/assets/icons/ClockIcon";
import ChatIcon from "../../../assets/icons/ChatIcon";
import StartwithTickIcon from "../../../assets/icons/StartwithTickIcon";
import StatisticsSection from "../components/ViewStatisticSection";
import { getAllCases } from "@/services/common_services/Case";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";
import { CaseData } from "@/types/ICaseData";
import { getDoctorBasicInfo } from "@/services/Doctor/Doctor";
import { getSupabaseSession } from "@/services/supabase";

export default function DoctorDashboardAndCases({ navigation }: any) {

  const handleViewAllCases = () => {
    navigation.navigate('DoctorHomeScreen');
  };

  const handleViewDashboardScreen = () => {
    navigation.navigate('DashboardScreen');
  };

  const { data: doctorId } = useQuery({
    queryKey: ['doctorSession'],
    queryFn: async () => {
      const session = await getSupabaseSession();
      if (!session?.id) throw new Error('No session found');
      return session.id as string;
    },
    staleTime: Infinity,
  });

  const { data: doctorInfo } = useQuery({
    queryKey: ['doctorBasicInfo', doctorId],
    queryFn: () => getDoctorBasicInfo(doctorId!),
    enabled: !!doctorId,
    staleTime: 30 * 60 * 1000, 
  });

 const {
  data: casesData,
  isPending,
  isError,
  error,
  refetch,
} = useQuery({
  queryKey: ["doctorCases"],
  queryFn: getAllCases,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
  retry: 2,
});

const doctorCases: CaseData[] = casesData ?? [];
  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>

          <View style={styles.greetingContainer}>
            <DoctorGreeting name={doctorInfo?.fullname || "Doctor"} 
            image={doctorInfo?.avatar_url ? { uri: doctorInfo.avatar_url } : undefined} />
          </View>

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
            <View style={styles.grid}>
              {doctorCases.slice(0, 6).map((item) => (
                <View key={item.id} style={styles.cardContainer}>
                  <CaseCard
                    data={{
                        id: item.id,
                        patient_id: item.patient_id,
                        title: item.title,
                        description: item.description,
                        timestamp: item.timestamp,
                        status: item.isReplied ? "Resolved" : "Under Review",
                        isEmergency: item.isEmergency ?? false,
                        isReplied: item.isReplied ?? false,
                      }}
                    onPress={() => navigation.navigate("CaseDetailsAndRepliesScreen", { caseId: item.id, caseData: item, role: 'doctor' })}
                  />
                </View>
              ))}
            </View>

            <Pressable
              style={styles.viewCasesContainer}
              onPress={handleViewAllCases}
            >
              <Text style={styles.viewCases}>View all cases</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
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