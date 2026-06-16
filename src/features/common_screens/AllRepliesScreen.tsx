import React, { useCallback, useRef } from "react";
import { View, FlatList, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBackground from "@/components/base/AppBackground";
import BackButton from "@/components/common/BackButton";
import ReplyText from "@/components/common/ReplyText";
import DoctorReplyCard from "@/components/common/DoctorReplyCard";
import DoctorCommentCard from "@/components/common/DoctorCommentCard";
import ResolvedSlideButton from "../patient/components/ResolvedSlideButton";
import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import ArrowInCircle from "@/components/common/SubmitButton";
import ReplyField from "@/components/forms/ReplyFeild";
import { Control, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsByReplyId, postComment } from "@/services/common_services/CommentService";
import { useAuthStore } from "@/store/authStore";
import { useAddNotification } from "@/hooks/useAddNotification"; // added by omar
import { useAddActivitylog } from "@/hooks/useAddActivitylog";
import { useReplyComments } from "@/hooks/useReplyComment";

type FormData = {
  doctorReply: string;
};

export default function AllRepliesScreen({ navigation, route }: any) {
  const queryClient = useQueryClient();
  const listRef = useRef<FlatList>(null);

  const caseData = route?.params?.caseData;
  const replyId = route?.params?.replyId;
  const replyData = route?.params?.replyData;
  const caseId = route?.params?.caseId;
  const role = route?.params?.role || 'patient';

  const isPatient = role === "patient";

  const authUser = useAuthStore((state) => state.user);
  const authRole = useAuthStore((state) => state.role);

  const { control, handleSubmit, resetField } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const { comments, sendComment, isSubmitting } = useReplyComments({ 
    replyId, 
    caseData 
  });

  const onSend = useCallback((data: FormData) => {
    const trimmed = data.doctorReply?.trim();
    if (!trimmed) return;
    
    sendComment(trimmed);
    resetField('doctorReply');
  }, [sendComment, resetField]);
  
  const handleViewGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);


  return (
    <AppBackground style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea} >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.title}>{caseData?.title || "Case Title"}</Text>
            <BackButton onPress={handleViewGoBack} />
          </View>

          <View style={styles.staticContent}>
            <DoctorReplyCard
              id={replyData?.id}
              title={replyData?.doctor?.full_name || "Dr. Sarah Ahmed"}
              major={replyData?.doctor_major || "Clinical Psychologist"}
              avatar={replyData?.doctor?.profilePic}
              message={replyData?.body || "Reply details."}
              time={replyData?.timestamp || "Just now"}
              CardOnPress={() => { }}
              ChatOnPress={() => { }}
            />
            <ReplyText title="All Replies" color={Colors.primary} />
          </View>

          <View style={styles.listWrapper}>
            <FlatList
              ref={listRef}
              data={comments}
              keyExtractor={(item) => String(item.id)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => (
                <View style={{ height: scale(19) }} />
              )}
              ListFooterComponent={<View style={{ height: scale(120) }} />}
              renderItem={({ item }) => {
                const isDoctor = !!item.doctor;

                const authorName = isDoctor
                  ? item.doctor?.full_name
                  : item.patient?.nickname;

                return (
                  <DoctorCommentCard
                    title={authorName || "Unknown"}
                    discreption={item.body}
                    time={item.timestamp}
                    avatar={item.doctor?.profilePic}
                    major={isDoctor ? "Doctor" : "Patient"}
                  />
                );
              }}
            />
          </View>
          <View style={styles.bottomContainer}>
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

            {isPatient && (
              <View style={styles.patientBottom}>
                <ResolvedSlideButton
                  onSlideComplete={() => {
                    console.log("Case Marked as Resolved");
                  }}
                />
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
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    paddingBottom: scale(20),
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

  staticContent: {
    gap: scale(34),
    marginBottom: scale(21),
  },

  listWrapper: {
    flex: 1,
    // minHeight: scale(200),
  },

  listContent: {
    paddingBottom: scale(20),
  },

  bottomContainer: {
    // position: "absolute",
    // bottom: scale(30),
    // left: scale(24),
    // right: scale(24),
    width: "100%",
    paddingTop: scale(10),
    paddingBottom: scale(10),
    gap: scale(15),
  },

  patientBottom: {
    width: "100%",
    // marginTop: scale(10),
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