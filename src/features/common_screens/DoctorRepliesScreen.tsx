import React, { useCallback, useRef } from "react";
import { View, FlatList, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Control, useForm } from "react-hook-form";
import AppScreenLayout from "@/layout/AppScreenLayout";
import BackButton from "@/components/common/BackButton";
import ReplyText from "@/components/common/ReplyText";
import DoctorReplyCard from "@/components/common/DoctorReplyCard";
import ResolvedSlideButton from "../patient/components/ResolvedSlideButton";
import ScrollToBottomButton from "../patient/components/ScrollToBottom";
import ReplyField from "@/components/forms/ReplyFeild";
import ArrowInCircle from "@/components/common/SubmitButton";
import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { getRepliesByCaseId, postReply } from "@/services/common_services/ReplyService";
import { useAuthStore } from "@/store/authStore";
import { useAddNotification } from "@/hooks/useAddNotification";
import { useAddActivitylog } from "@/hooks/useAddActivitylog";
import { useCaseReplies } from "@/hooks/useCaseReplies";

type FormData = { doctorReply: string };

export default function DoctorRepliesScreen({ navigation, route }: any) {
  
  const authRole = useAuthStore((state) => state.role);
  
  const caseData = route?.params?.caseData;
  const caseId = route?.params?.caseId || caseData?.id;
  const role = route?.params?.role || authRole || 'doctor';

  const isDoctor = role === "doctor";
  const isPatient = role === "patient";
  const authUser = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();
  const flatListRef = useRef<FlatList>(null);

  const { control, handleSubmit, resetField } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

 const { replies, sendReply, isSubmitting } = useCaseReplies({ 
    caseId, 
    caseData, 
    role 
  });

  const onSend = useCallback((data: FormData) => {
    const trimmed = data.doctorReply?.trim();
    if (!trimmed) return;
    
    sendReply(trimmed);
    resetField('doctorReply');
  }, [sendReply, resetField]);


  const handleViewAllReplies = (reply: any) => {
    navigation.navigate('AllRepliesScreen', {
      caseId: route?.params?.caseId,
      caseData,
      role,
      replyId: reply.id,
      replyData: reply
    });
  };

  const handleViewGoBack = () => {
    navigation.goBack();
  };



  const scrollToBottom = useCallback(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  const handleSlideComplete = () => {
    console.log("Case marked as resolved");
  };


  return (
    <AppScreenLayout variant="clean">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.fixedHeader}>
          <View style={styles.header}>
            <Text style={styles.title}>{caseData?.title || "Case Title"}</Text>
            <BackButton onPress={handleViewGoBack} />
          </View>

          <ReplyText title="Doctor's Replies" color={Colors.secondary} />
        </View>

        <View style={styles.scrollWrapper}>
          <FlatList
            ref={flatListRef}
            data={replies}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            ItemSeparatorComponent={() => ( <View style={{ height: scale(14) }} />)}
            renderItem={({ item }) => {
              const doctorName = item.doctor?.full_name || item.doctor_info?.[0]?.full_name || (item.user_type === 'doctor' ? "Doctor" : "Patient");
              const message = item.body || item.content || "";
              const time = item.timestamp || item.time_ago || "Just now";
              const avatar = item.doctor?.profilePic || item.doctor_info?.[0]?.profilePic;
                  
              return (
                <DoctorReplyCard
                  id={item.id}
                  title={doctorName}
                  avatar={avatar}
                  major={item.doctor_major || "General"}
                  message={message}
                  time={time}
                  CardOnPress={() => handleViewAllReplies(item)}
                  ChatOnPress={() => handleViewAllReplies(item)}
                />
              );
            }}
          />
        </View>

        <View style={styles.bottomContainer}>
          {isPatient && (
            <View style={styles.patientBottom}>
              <View style={{ width: "70%" }}>
                <ResolvedSlideButton onSlideComplete={handleSlideComplete} />
              </View>
            </View>
          )}

          {isDoctor && (
            <View style={styles.doctorBottom}>
              <View style={styles.DoctorreplySection}>
                <View style={{ width: "80%" }}>
                  <ReplyField name="doctorReply" control={control as Control<any>} />
                </View>

                <ArrowInCircle onPress={handleSubmit(onSend)} />
              </View>
            </View>
          )}
        </View>
        </KeyboardAvoidingView>
    </AppScreenLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  fixedHeader: {
    paddingBottom: scale(16),
    zIndex: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(56),
    marginTop: scale(10),
  },

  title: {
    flex: 1,
    fontSize: scale(24),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
  },

  scrollWrapper: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: scale(10),
    paddingBottom: scale(20),
  },

  bottomContainer: {
    width: "100%",
    paddingBottom: scale(30),
  },

  patientBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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