import React, { useRef } from "react";
import { View, FlatList, StyleSheet, Text, SafeAreaView } from "react-native";
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


type FormData = {
  doctorReply: string;
};

export default function AllRepliesScreen({ navigation, route }: any) {
  const queryClient = useQueryClient();
  const caseData = route?.params?.caseData;
  const replyId = route?.params?.replyId;
  const replyData = route?.params?.replyData;
  const caseId = route?.params?.caseId;
  const role = route?.params?.role || 'patient';

  const isPatient = role === "patient";

  const authUser = useAuthStore((state) => state.user);
  const authRole = useAuthStore((state) => state.role);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', replyId],
    queryFn: () => getCommentsByReplyId(replyId),
    enabled: !!replyId,
  });

  const { mutate: submitComment, isPending } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', replyId] });
      resetField('doctorReply');
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 300);
    },
    onError: (error: any) => {
      console.error('Failed to post comment:', error?.response?.data || error.message);
    },
  });

  const onSend = async (data: FormData) => {
    if (!data.doctorReply.trim()) return;
    if (!authUser?.id || !authRole) return;

    submitComment({
      replyId,
      body: data.doctorReply.trim(),
      userId: authUser.id,
      role: authRole,
    });
  };
  const handleViewGoBack = () => {
    navigation.goBack();
  };

  const { control, handleSubmit, resetField } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const listRef = useRef<FlatList>(null);


  return (
    <AppBackground>
      <SafeAreaView style={styles.safeArea} >
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
              message={replyData?.body || "Reply details."}
              time={replyData?.timestamp || "Just now"}
              CardOnPress={() => { }}
              ChatOnPress={() => { }}
              onLike={() => { }}
              onDislike={() => { }}
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
                    avatar={undefined}
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
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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