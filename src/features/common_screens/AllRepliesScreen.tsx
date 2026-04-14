import React, { useRef } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

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
import { allDummyComments } from "@/types/mockData";
import { supabaseClient } from "@/services/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



type FormData = {
  doctorReply: string;
};

const getCommentsByReplyId = async (replyId: number) => {
  const { data } = await supabaseClient.get('/comment', {
    params: {
      reply_id: `eq.${replyId}`,
      order: 'timestamp.asc',
      select: '*',
    },
  });
  return data ?? [];
};

// ✅ إضافة comment جديد
const postComment = async ({ replyId, body }: { replyId: number; body: string }) => {
  const { data } = await supabaseClient.post('/comment', {
    reply_id: replyId,
    body,
  });
  return data?.[0];
};

export default function AllRepliesScreen({ navigation, route }: any) {
  const queryClient = useQueryClient();
  const caseData = route?.params?.caseData;
  const replyId = route?.params?.replyId;
  const replyData = route?.params?.replyData;
  const role = route?.params?.role || 'patient';

  const isPatient = role === "patient";

  // ✅ جلب الـ comments بـ React Query
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', replyId],
    queryFn: () => getCommentsByReplyId(replyId),
    enabled: !!replyId,
  });

  // ✅ إضافة comment بـ mutation
  const { mutate: submitComment, isPending } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', replyId] });
      resetField('doctorReply');
      // scroll للأسفل بعد الإضافة
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 300);
    },
    onError: (error: any) => {
      console.error('❌ Failed to post comment:', error?.response?.data || error.message);
    },
  });

  const onSend = (data: FormData) => {
    if (!data.doctorReply.trim()) return;
    submitComment({ replyId, body: data.doctorReply.trim() });
  };
  const handleViewGoBack = () => {
    navigation.navigate('DoctorRepliesScreen', {
      caseId: route?.params?.caseId,
      caseData,
      role
    });
  };

  const { control ,handleSubmit, resetField } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const listRef = useRef<FlatList>(null);

  //const comments = allDummyComments.filter(c => c.reply_id === replyId);

  return (
    <AppBackground>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>{caseData?.title || "Case Title"}</Text>
          <BackButton onPress={handleViewGoBack} />
        </View>

        <View style={styles.staticContent}>
          <DoctorReplyCard
            title={replyData?.doctor_name || "Dr. Sarah Ahmed"}
            major={replyData?.doctor_major || "Clinical Psychologist"}
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
            renderItem={({ item }) => (
              <DoctorCommentCard
                title={item.author_name}
                discreption={item.body}
                time={item.timestamp}
                avatar={undefined}
                major={item.author_role}
              />
            )}
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
              <ArrowInCircle onPress={handleSubmit(onSend)}/>
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
    </AppBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(50),
    paddingHorizontal: scale(24),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(36),
  },

  title: {
    width: scale(150),
    fontSize: scale(20),
    fontFamily: Family.FG_Medium,
    color: Colors.primary,
  },

  staticContent: {
    gap: scale(34),
    marginBottom: scale(21),
  },

  listWrapper: {
    height: "30%",
  },

  listContent: {
    paddingBottom: scale(20),
  },

  bottomContainer: {
    position: "absolute",
    bottom: scale(30),
    left: scale(24),
    right: scale(24),
    width: "100%",
    paddingBottom: scale(30),
    paddingHorizontal: scale(24),
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