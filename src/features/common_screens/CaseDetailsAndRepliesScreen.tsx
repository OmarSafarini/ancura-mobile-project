import React, { useRef, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRepliesByCaseId, postReply } from '@/services/common_services/ReplyService';
import { deleteCase } from '@/services/common_services/Case';
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
import DeleteCasePopUp from "@/components/common/DeleteCasePopUp";

import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";

import PencilIcon from "@/assets/icons/PencilIcon";
import TrashIcon from "@/assets/icons/TrashIcon";


type FormData = {
  doctorReply: string;
};

const STATUS_MAP: Record<string, "under_review" | "doctor_replied" | "resolved"> = {
  "Under Review": "under_review",
  "Doctor Replied": "doctor_replied",
  "Resolved": "resolved",
  "under_review": "under_review",
  "doctor_replied": "doctor_replied",
  "resolved": "resolved",
};

export default function CaseDetailScreen({ navigation, route }: any) {
  const authUser = useAuthStore((state) => state.user);
  const caseId = route?.params?.caseId;
  const caseData = route?.params?.caseData;
  const role = route?.params?.role || 'patient';
  console.log("Opened Case Details for ID: ", caseId, " as Role: ", role);

  const isDoctor = role === "doctor";
  const isPatient = role === "patient";

  // ─── Delete Popup State ────────────────────────────────────────────
  const [showDeletePopup, setShowDeletePopup] = useState(false);

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
    navigation.goBack();
  };


  const queryClient = useQueryClient();

  const { data: replies = [] } = useQuery({
    queryKey: ['replies', caseId],
    queryFn: () => getRepliesByCaseId(caseId),
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

  // ─── Delete Case Mutation ──────────────────────────────────────────
  const { mutate: handleDeleteCase, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteCase(caseId),
    onSuccess: () => {
      // ── Remove the case from the Patient home cache immediately (no re-fetch needed) ──
      queryClient.setQueryData(['patientPost'], (oldData: any[] | undefined) =>
        oldData ? oldData.filter((c: any) => String(c.id) !== String(caseId)) : []
      );
      // ── Also remove from the Doctor home cache if it exists ──
      queryClient.setQueryData(['cases'], (oldData: any[] | undefined) =>
        oldData ? oldData.filter((c: any) => String(c.id) !== String(caseId)) : []
      );
      // ── Remove the specific case detail cache ──
      queryClient.removeQueries({ queryKey: ['case', caseId] });

      setShowDeletePopup(false);
      navigation.goBack();
    },
    onError: (error: any) => {
      console.error('Failed to delete case:', error?.response?.data || error.message);
      setShowDeletePopup(false);
    },
  });

  const onSend = async (data: FormData) => {
    if (!data.doctorReply.trim()) return;
    if (!authUser?.id) return;

    submitReply({
      caseId: caseId,
      doctorId: authUser.id,
      patientId: caseData?.patient_id,
      body: data.doctorReply.trim(),
    });
  };
  const { control, handleSubmit, resetField } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <AppBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          {/* ─── Delete Confirmation Popup ─────────────────────── */}
          <DeleteCasePopUp
            visible={showDeletePopup}
            onCancel={() => setShowDeletePopup(false)}
            onConfirm={() => handleDeleteCase()}
          />

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
                    onPress={() => setShowDeletePopup(true)}
                  />
                </>
              )}
            </View>

            <BackButton onPress={handleViewGoBack} />
          </View>

        <View style={styles.mainContent}>
          <CaseDetailsCard
            caseId={caseId}
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
                  id={item.id}
                  title={item.doctor?.full_name}
                  major={item.doctor_major}
                  message={item.body}
                  time={item.timestamp}
                  CardOnPress={handleViewDoctorReplies}
                  ChatOnPress={() => handleViewAllReplies(item)}
                  onLike={() =>{}}
                  onDislike={() =>{}}
                />
              )}
            />
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

                  <ArrowInCircle onPress={handleSubmit(onSend)} />
                </View>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
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
    marginBottom: scale(56),
    marginTop: scale(10),
    marginHorizontal: scale(24),
  },

  toggleContainer: {
    flexDirection: "row",
    gap: scale(12),
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: scale(24),
    gap: scale(20),
  },

  replySection: {
    flex: 1,
    gap: scale(20),
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
