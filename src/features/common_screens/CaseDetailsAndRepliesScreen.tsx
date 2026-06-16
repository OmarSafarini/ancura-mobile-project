import React, { useCallback, useRef, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRepliesByCaseId, postReply } from '@/services/common_services/ReplyService';
import { deleteCase, updateCaseStatus } from '@/services/common_services/Case';
import { deleteLocalCase } from "@/services/localDb";
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
import { useAddNotification } from "@/hooks/useAddNotification";
import { useAddActivitylog } from "@/hooks/useAddActivitylog";

import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";

import PencilIcon from "@/assets/icons/PencilIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import { useCaseReplies } from "@/hooks/useCaseReplies";


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
  const { caseId, caseData, role = 'patient' } = route.params;
  console.log("Opened Case Details for ID: ", caseId, " as Role: ", role);
  
  const isDoctor = role === "doctor";
  const isPatient = role === "patient";
  
  const authUser = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();


  const flatListRef = useRef<FlatList>(null);


  const { replies, sendReply, isSubmitting } = useCaseReplies({ caseId, caseData, role });


  const { control, handleSubmit, resetField } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const onSend = useCallback((data: FormData) => {
    const trimmed = data.doctorReply?.trim();
    if (!trimmed) return;
    sendReply(trimmed);
    resetField('doctorReply');
  }, [sendReply, resetField]);


  // ─── Delete Case Mutation ──────────────────────────────────────────
  const [showDeletePopup, setShowDeletePopup] = useState(false);
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

      // ── Remove from SQLite ──
      deleteLocalCase(Number(caseId));

      setShowDeletePopup(false);
      navigation.goBack();
    },
    onError: (error: any) => {
      console.error('Failed to delete case:', error?.response?.data || error.message);
      setShowDeletePopup(false);
    },
  });

  // ─── Resolve Case Mutation ─────────────────────────────────────────
  const { mutate: handleResolveCase, isPending: isResolving } = useMutation({
    mutationFn: () => updateCaseStatus(caseId, 'resolved'),
    onSuccess: () => {
      // ── Refresh data ──
      queryClient.invalidateQueries({ queryKey: ['patientPost'] });
      queryClient.invalidateQueries({ queryKey: ['cases'] }); // For doctor view if applicable
      queryClient.invalidateQueries({ queryKey: ['case', caseId] });
      
      // Navigate to patient dashboard (Home)
      navigation.navigate('PatientTabs', { screen: 'PatientHomeTab' });
    },
    onError: (error: any) => {
      console.error('Failed to resolve case:', error?.response?.data || error.message);
    },
  });


 const scrollToBottom = useCallback(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);


  const handleViewDoctorReplies = useCallback(() => {
    navigation.navigate('DoctorRepliesScreen', { caseId, caseData, role });
  }, [navigation, caseId, caseData, role]);

  const handleViewAllReplies = useCallback((reply: any) => {
    navigation.navigate('AllRepliesScreen', {
      caseId, caseData, role, replyId: reply.id, replyData: reply
    });
  }, [navigation, caseId, caseData, role]);

   const handleViewGoBack = () => {
    navigation.goBack();
  };

  return (
    <AppBackground style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
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
                    onPress={() => navigation.navigate('EditCaseScreen', { caseId, caseData })}
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
            <CaseDetailsCard caseId={caseId} />

            <View style={styles.replySection}>
              <ReplyText title="Doctor's Reply" color={Colors.primary} onPress={handleViewDoctorReplies} />

              <FlatList
                ref={flatListRef}
                data={replies}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => ( <View style={{ height: scale(16) }} />)}
                renderItem={({ item }) => (
                  <DoctorReplyCard
                    id={item.id}
                    title={item.doctor?.full_name}
                    major={item.doctor_major}
                    message={item.body}
                    time={item.timestamp}
                    avatar={item.doctor?.profilePic}
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
                    onSlideComplete={handleResolveCase}
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
        </KeyboardAvoidingView>
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
    // position: "absolute",
    // bottom: scale(30),

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
