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
import ArrowInCircle from "@/assets/icons/SubmitButton";
import ReplyField from "@/components/forms/ReplyFeild";
import { Control, useForm } from "react-hook-form";
import { allDummyComments } from "@/types/mockData";



type FormData = {
  doctorReply: string;
};

export default function AllRepliesScreen({ navigation, route }: any) {
  const caseData = route?.params?.caseData;
  const replyId = route?.params?.replyId;
  const replyData = route?.params?.replyData;
  const role = route?.params?.role || 'patient';

  const isPatient = role === "patient";
  const handleViewGoBack = () => {
    navigation.navigate('DoctorRepliesScreen', {
      caseId: route?.params?.caseId,
      caseData,
      role
    });
  };

  const { control } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const listRef = useRef<FlatList>(null);

  const comments = allDummyComments.filter(c => c.reply_id === replyId);

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
              <ArrowInCircle />
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