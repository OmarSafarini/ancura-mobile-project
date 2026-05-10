import React, { useRef } from "react";
import { View, FlatList, StyleSheet, Text, SafeAreaView } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Control, useForm } from "react-hook-form";
import AppBackground from "@/components/base/AppBackground";
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

type FormData = { doctorReply: string };

export default function DoctorRepliesScreen({ navigation, route }: any) {
  const caseData = route?.params?.caseData;
  const role = route?.params?.role || 'doctor';
  const caseId = route?.params?.caseId || caseData?.id;
  const isDoctor = role === "doctor";
  const isPatient = role === "patient";
  const authUser = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();
  const flatListRef = useRef<FlatList>(null);

  const { control, handleSubmit, resetField } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const { data: replies = [] } = useQuery({
    queryKey: ['replies', caseId],
    queryFn: () => getRepliesByCaseId(caseId),
    enabled: !!caseId,
  });

  const { mutate: submitReply } = useMutation({
    mutationFn: postReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', caseId] });
      resetField('doctorReply');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 300);
    },
    onError: (error: any) => {
      console.error('Failed to post reply:', error?.response?.data || error.message);
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



  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleSlideComplete = () => {
    console.log("Case marked as resolved");
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBackground style={{ flex: 1 }}>

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
            ItemSeparatorComponent={() => (
              <View style={{ height: scale(14) }} />
            )}
            renderItem={({ item }) => (
              <DoctorReplyCard
                id={item.id}
                title={item.doctor?.fullname}
                major={item.doctor_major}
                message={item.body}
                time={item.timestamp}
                CardOnPress={() => handleViewAllReplies(item)}
                ChatOnPress={() => handleViewAllReplies(item)}
                onLike={() => { }}
                onDislike={() => { }}
              />
            )}
          />
        </View>

        <View style={styles.bottomContainer}>
          {isPatient && (
            <View style={styles.patientBottom}>
              <View style={{ width: "70%" }}>
                <ResolvedSlideButton onSlideComplete={handleSlideComplete} />
              </View>

              <ScrollToBottomButton onPress={scrollToBottom} />
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

      </AppBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  fixedHeader: {
    paddingHorizontal: scale(24),
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
    height: "60%",
  },

  scrollContent: {
    paddingHorizontal: scale(24),
    paddingTop: scale(10),
    paddingBottom: scale(140),
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