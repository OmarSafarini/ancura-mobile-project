import React, { useRef } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import AppBackground from "@/components/layout/AppBackground";
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

type Props = {
  route?: any;
};

type FormData = {
  doctorReply: string;
};

export default function AllRepliesScreen({ route }: Props) {
  const role = "patient";
  const isPatient = role === "patient";

  const { control } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const listRef = useRef<FlatList>(null);

  const comments = [
    {
      id: "1",
      title: "You",
      discreption:
        "I have tried that, but it doesn't seem to help much.",
      time: "Just now",
      major: "Patient",
    },
    {
      id: "2",
      title: "You",
      discreption:
        "I still feel overwhelmed with my workload and deadlines.",
      time: "Just now",
      major: "Patient",
    },
    {
      id: "3",
      title: "You",
      discreption:
        "I have trouble sleeping and concentrating at work.",
      time: "Just now",
      major: "Patient",
    },
    {
      id: "4",
      title: "You",
      discreption:
        "I'm not sure what else to try.",
      time: "Just now",
      major: "Patient",
    },
  ];

  return (
    <AppBackground>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>Coping with work pressure</Text>
          <BackButton onPress={() => {}} />
        </View>

        <View style={styles.staticContent}>
          <DoctorReplyCard
              title="Dr. Sarah Ahmed"
              major="Clinical Psychologist"
              message="Thank you for sharing. Work-related anxiety is very common. Have you
                  tried breaking your tasks into smaller, manageable chunks? This can
                  help reduce the feeling of being overwhelmed
                  breaking your tasks into smaller, manageable chunks? This can
                  help reduce the feeling of being overwhelmed."
              time="Just now"
              CardOnPress={() => {}}
              ChatOnPress={() => {}}
            />


          <ReplyText title="All Replies" color={Colors.primary} />
        </View>

        <View style={styles.listWrapper}>
          <FlatList
            ref={listRef}
            data={comments}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => (
              <View style={{ height: scale(19) }} />
            )}
            ListFooterComponent={<View style={{ height: scale(120) }} />}
            renderItem={({ item }) => (
              <DoctorCommentCard
                title={item.title}
                discreption={item.discreption}
                time={item.time}
                avatar={undefined}
                major={item.major}
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