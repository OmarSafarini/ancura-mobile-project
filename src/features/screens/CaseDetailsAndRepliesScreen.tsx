import React, { useRef, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { View, FlatList, StyleSheet } from "react-native";

import AppBackground from "@/components/layout/AppBackground";
import BackButton from "@/components/common/BackButton";
import ToggleButton from "@/components/common/ToggleButton";
import CaseDetailsCard from "@/components/common/CaseDetailsCard";
import DoctorReplyCard from "@/components/common/DoctorReplyCard";
import ResolvedSlideButton from "../patient/components/ResolvedSlideButton";
import ReplyText from "@/components/common/ReplyText";
import ReplyField from "@/components/forms/ReplyFeild";
import ArrowInCircle from "@/assets/icons/SubmitButton";
import ScrollToBottomButton from "../patient/components/Buttons/ScrollToBottom";

import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";

import PencilIcon from "@/assets/icons/PencilIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import { allDummyReplies } from "@/types/mockData";



type FormData = {
  doctorReply: string;
};

export default function CaseDetailScreen({ navigation, route }: any) {
  const caseId = route?.params?.caseId;
  const caseData = route?.params?.caseData;
  const role = route?.params?.role || 'patient';
  console.log("Opened Case Details for ID: ", caseId, " as Role: ", role);

  const isDoctor = role === "doctor";
  const isPatient = role === "patient";

  const handleViewDoctorReplies = () => {
    navigation.navigate('DoctorRepliesScreen', { caseId, caseData });
  };

  const handleViewAllReplies = (reply: any) => {
    navigation.navigate('AllRepliesScreen', { 
      caseId, 
      caseData,
      replyId: reply.id,
      replyData: reply
    });
  };

  const handleViewGoBack = () => {
    navigation.navigate('DoctorHomeScreen');
  };

  const { control } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };


  const replies = allDummyReplies.filter(reply => reply.case_id === caseId);


  return (
    <AppBackground>
      <View style={styles.container}>

        <View style={styles.topBar}>
          <View style={styles.toggleContainer}>
            {isPatient && (
              <>
                <ToggleButton
                  title="Edit Case"
                  Icon={PencilIcon}
                  bgColor={Colors.secondary}
                  textColor="#FFFFFF"
                />
                <ToggleButton
                  title="Delete Case"
                  Icon={TrashIcon}
                  bgColor={Colors.warning}
                  textColor="#FFFFFF"
                />
              </>
            )}
          </View>

          <BackButton onPress={handleViewGoBack} />
        </View>

        <View style={styles.mainContent}>
          <CaseDetailsCard
            userId={caseData ? `#${caseData.patient_id}` : "#124"}
            gender="Female"
            age={28}
            title={caseData?.title || "Anxiety and sleep problem"}
            description={caseData?.description || "Patient reports severe anxiety and insomnia for the past 3 weeks."}
            date={caseData?.created_at || "2 hours ago"}
            status={
              isDoctor ? undefined :
              caseData?.status === "Under Review" ? "under_review" :
              caseData?.status === "Doctor Replied" ? "doctor_replied" :
              caseData?.status === "Resolved" ? "resolved" : "under_review"
            }
          />

          <View style={styles.replySection}>
            <ReplyText title="Doctor's Reply" color={Colors.primary} onPress={handleViewDoctorReplies}/>

            <FlatList
              ref={flatListRef}
              data={replies}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => (
                <View style={{ height: scale(16) }} />
              )}
              renderItem={({ item }) => (
                <DoctorReplyCard
                  title={item.title}
                  major={item.major}
                  message={item.message}
                  time={item.time}
                  CardOnPress={handleViewDoctorReplies}
                  ChatOnPress={() => handleViewAllReplies(item)}
                />
              )}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {isPatient && (
            <View style={styles.patientBottom}>
              <View style={{ width: "70%" }}>
                <ResolvedSlideButton
                  onSlideComplete={() => {
                    console.log("Case Marked as Resolved");
                  }}
                />
              </View>

              <ScrollToBottomButton onPress={scrollToBottom} />
            </View>
          )}

          {isDoctor && (
            <View style={styles.doctorBottom}>
              <View style={styles.DoctorreplySection}>
                <View style={{ width: "80%" }}>
                  <ReplyField
                    name="doctorReply"
                    control={control as Control<any>}
                  />
                </View>

                <ArrowInCircle />
              </View>
            </View>
          )}
        </View>

      </View>
    </AppBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scale(50),
    marginHorizontal: scale(24),
    marginBottom: scale(25),
  },

  toggleContainer: {
    flexDirection: "row",
    gap: scale(12),
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: scale(24),
    gap: scale(41),
  },

  replySection: {
    height:scale(410),
    gap: scale(41),
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingBottom: scale(20),
  },

  bottomContainer: {
    width: "100%",
    paddingBottom: scale(30),
    paddingHorizontal: scale(24),
    position:"absolute",
    bottom:scale(30),
  },

  patientBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: scale(16),
  },

  doctorBottom: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  DoctorreplySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(12),
  },
});