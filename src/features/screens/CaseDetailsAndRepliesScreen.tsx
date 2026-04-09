import React, { useRef, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { View, FlatList, StyleSheet } from "react-native";

import AppBackground from "@/components/layout/AppBackground";
import BackButton from "@/components/common/BackButton";
import ToggleButton from "@/components/common/ToggleButton";
import CaseDetailsCard from "@/components/common/CaseDetailsCard";
import DoctorReplyCard from "@/components/common/DoctorReplyCard";
import ResolvedSlideButton from "../patient/components/ResolvedSlideButton";
import ReplyText from "@/components/common/ReplyText";
import ReplyField from "@/components/forms/ReplyFeild";
import ArrowInCircle from "@/assets/icons/SubmitButton";
import ScrollToBottomButton from "../patient/components/Buttons/ScrollToBottom";

import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";

import PencilIcon from "@/assets/icons/PencilIcon";
import TrashIcon from "@/assets/icons/TrashIcon";



type FormData = {
  doctorReply: string;
};

export default function CaseDetailScreen(navigation: any) {
  const [role, setRole] = useState<"patient" | "doctor" | null>(null);
  const isDoctor = role === "doctor";
  const isPatient = role === "patient";

  const handleViewDoctorReplies = () => {
    navigation.navigate('DoctorRepliesScreen');
  };

  const handleViewAllReplies = () => {
    navigation.navigate('AllRepliesScreen');
  };

  const handleViewGoBack = () => {
    navigation.navigate('DoctorHomeScreen');
  };

  const { control } = useForm<FormData>({
    defaultValues: { doctorReply: "" },
  });

  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const replies = [
    {
      id: "1",
      title:"Dr. Sarah Ahmed" ,
      major:"Clinical Psychologist" ,
      message:"Based on the symptoms you described, I recommend starting with cognitive behavioral therapy techniques for sleep. I'll send you a detailed plan within 24 hours." ,
      time:"Just now",
    },
    {
      id: "2",
      title:"Dr. Sarah Ahmed" ,
      major:"Clinical Psychologist" ,
      message:"Based on the symptoms you described, I recommend starting with cognitive behavioral therapy techniques for sleep. I'll send you a detailed plan within 24 hours." ,
      time:"Just now",
    },
    {
      id: "3",
      title:"Dr. Sarah Ahmed" ,
      major:"Clinical Psychologist" ,
      message:"Based on the symptoms you described, I recommend starting with cognitive behavioral therapy techniques for sleep. I'll send you a detailed plan within 24 hours." ,
      time:"Just now",
    },
  ];


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
            userId="#124"
            gender="Female"
            age={28}
            title="Anxiety and sleep problem"
            description="Patient reports severe anxiety and insomnia for the past 3 weeks."
            date="2 hours ago"
            status="under_review"
          />

          <View style={styles.replySection}>
            <ReplyText title="Doctor's Reply" color={Colors.primary} onPress={handleViewDoctorReplies}/>

            <FlatList
              ref={flatListRef}
              data={replies}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => (
                <View style={{ height: scale(16) }} />
              )}
              renderItem={({ item }) => (
                <DoctorReplyCard
                  title={item.title}
                  major={item.major}
                  message={item.message}
                  time={item.time}
                  CardOnPress={handleViewDoctorReplies}
                  ChatOnPress={handleViewAllReplies}
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

                <ArrowInCircle />
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
    height:scale(410),
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
    position:"absolute",
    bottom:scale(30),
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