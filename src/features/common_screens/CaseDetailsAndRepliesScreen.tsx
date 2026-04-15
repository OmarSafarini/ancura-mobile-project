import React, { useRef, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { View, FlatList, StyleSheet } from "react-native";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRepliesByPostId, postReply } from '@/services/common_services/ReplyService';
import { useAuthStore } from '@/store/authStore';
import AppBackground from "@/components/base/AppBackground";
import BackButton from "@/components/common/BackButton";
import ToggleButton from "@/components/common/ToggleButton";
import CaseDetailsCard from "@/components/common/CaseDetailsCard";
import DoctorReplyCard from "@/components/common/DoctorReplyCard";
import ResolvedSlideButton from "../patient/components/ResolvedSlideButton";
import ReplyText from "@/components/common/ReplyText";
import ReplyField from "@/components/forms/ReplyFeild";
import ArrowInCircle from "@/components/common/SubmitButton";
import ScrollToBottomButton from "../patient/components/ScrollToBottom";

import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";

import PencilIcon from "@/assets/icons/PencilIcon";
import TrashIcon from "@/assets/icons/TrashIcon";



type FormData = {
  doctorReply: string;
};

const STATUS_MAP: Record<string, "Under Review" | "Doctor Replied" | "Resolved"> = {
  "Under Review": "Under Review",
  "Doctor Replied": "Doctor Replied",
  "Resolved": "Resolved",
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


  const queryClient = useQueryClient();

const { data: replies = [] } = useQuery({
  queryKey: ['replies', caseId],
  queryFn: () => getRepliesByPostId(caseId),
  enabled: !!caseId,
});

const { mutate: submitReply, isPending } = useMutation({
  mutationFn: postReply,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['replies', caseId] });
    resetField('doctorReply');
  },
  onError: (error: any) => {
    console.error('Failed to post reply:', error?.response?.data || error.message);
  },
});

const onSend = async (data: FormData) => {
  if (!data.doctorReply.trim()) return;
  const doctorId = useAuthStore.getState().session?.id;
  if (!doctorId) return;

  submitReply({
    postId: caseId,
    doctorId,
    patientId: caseData?.patient_id,
    body: data.doctorReply.trim(),
  });
};
  const { control, handleSubmit, resetField  } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

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
            date={caseData?.timestamp || "2 hours ago"}
            status={
              isDoctor
                ? undefined
                : caseData?.status
                  ? STATUS_MAP[caseData.status as string]
                  : "Under Review"
            }
          />

          <View style={styles.replySection}>
            <ReplyText title="Doctor's Reply" color={Colors.primary} onPress={handleViewDoctorReplies} />

            <FlatList
              ref={flatListRef}
              data={replies}
              keyExtractor={(item) => String(item.id)}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => (
                <View style={{ height: scale(16) }} />
              )}
              renderItem={({ item }) => (
                <DoctorReplyCard
                  title={item.doctor_name}
                  major={item.doctor_major}
                  message={item.body}
                  time={item.timestamp}
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

                <ArrowInCircle onPress={handleSubmit(onSend)}/>
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
    height: scale(410),
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
    position: "absolute",
    bottom: scale(30),
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