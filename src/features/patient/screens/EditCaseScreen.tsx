import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import * as DocumentPicker from "expo-document-picker";

import AppBackground from "@/components/layout/AppBackground";
import InputField from "@/components/forms/InputFeild";
import AttachmentsField from "@/components/forms/AttachmentFeild";
import NormalButton from "@/components/common/NormalButton";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import EmergencyCheckBox from "../components/Buttons/EmergencyCheckBox";
import DeleteIconButton from "../components/Buttons/DeleteIconButton";

import { scale } from "@/utils/responsive";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import ToggleButton from "@/components/common/ToggleButton";
import PencilIcon from "@/assets/icons/PencilIcon";
import FileBar from "@/components/common/FileBar";
import IconWrapper from "@/features/doctor/components/Icons/IconWrapper";

type FormValues = {
  title: string;
  description: string;
  isEmergency: boolean;
  files: DocumentPicker.DocumentPickerAsset[];
};

type CaseFileItem = {
  id: string;
  title: string;
};

const EditCaseScreen = ({ navigation }: any) => {
  const caseFiles: CaseFileItem[] = [
    {
      id: "1",
      title: "Clinical Psychology License - California Board",
    },
    {
      id: "2",
      title: "Clinical Psychology License - Hello World",
    },
  ];

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      title: "Coping with work pressure",
      description:
        "I have been feeling overwhelmed with my workload lately...",
      isEmergency: true,
      files: [],
    },
  });

  const isEmergency = watch("isEmergency");

  const onSubmit = (data: FormValues) => {
    console.log("Updated Case:", data);
  };

  return (
    <AppBackground variant="clean">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerText}>Hi USR-XXXXX</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <ArrowLeftIcon size={18} color={Colors.textDark} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Your identity will remain 100% anonymous, and your name will not be
            shown to the doctors
          </Text>
        </View>

        <View style={styles.form}>

          <InputField
            control={control as any}
            name="title"
            label="Subject / Title"
            placeholder="Type here"
            textStyle={{
              fontSize: scale(20),
              fontFamily: Family.FG_Medium,
              color: "#000",
            }}
          />

          <InputField
            control={control as any}
            name="description"
            label="Description"
            placeholder="Type here"
            multiline
            numberOfLines={4}
            textStyle={{
              fontSize: scale(14),
              fontFamily: Family.FG_Regular,
              color: "#6D7EB5",
            }}
          />

          <AttachmentsField
            files={watch("files")}
            onFilesChange={(files) => setValue("files", files)}
          />

          <View style={styles.tagsContainer}>
            {caseFiles.map((file) => (
              <View key={file.id} style={styles.fileRow}>
                <View style={{ flex: 1 }}>
                  <FileBar title={file.title}
                   icon={
                    <IconWrapper size={13} bgColor="#ffffff" shape="circle" border="#6D7EB5">
                      <ArrowLeftIcon size={8} color="#6D7EB5" />
                    </IconWrapper>
                   } />
                </View>
                <DeleteIconButton />
              </View>
            ))}
          </View>

          <View style={styles.emergencyContainer}>
            <Text style={styles.emergencyText}>
              Is this case considered a critical emergency that requires
              immediate intervention?
            </Text>

            <EmergencyCheckBox
              isActive={isEmergency}
              onPress={() => setValue("isEmergency", !isEmergency)}
            />
          </View>
        </View>


        <View style={styles.footer}>
          <NormalButton
            title="Confirm Edit"
            onPress={handleSubmit(onSubmit)}
            bgColor="#8EB392"
            textColor="#fff"
            textStyle={{
              fontSize: scale(20),
              fontFamily: Family.FG_Regular,
            }}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(52),
    paddingTop: scale(60),
    paddingBottom: scale(40),
    gap: scale(30),
  },

  header: {
    marginBottom: scale(24),
  },

  headerTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: scale(12),
    marginBottom: scale(12),
  },

  headerText: {
    flex: 1,
    fontSize: scale(20),
    fontFamily: Family.FG_Regular,
    color: Colors.textDark,
    lineHeight: scale(23),
  },

  headerSubtitle: {
    marginTop: scale(6),
    fontSize: scale(12),
    fontFamily: Family.FG_Regular,
    color: "#6D7EB5",
    lineHeight: scale(16),
  },

  backButton: {
    width: scale(33),
    height: scale(33),
    backgroundColor: "#fff",
    borderRadius: scale(7),
    justifyContent: "center",
    alignItems: "center",
  },

  editBadge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#6D7EB5",
    borderRadius: scale(11),
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    marginBottom: scale(16),
  },

  editText: {
    fontSize: scale(10),
    color: "#6D7EB5",
    fontFamily: Family.FG_Regular,
  },

  form: {
    gap: scale(24),
  },

  tagsContainer: {
    gap: scale(8),
  },

  tag: {
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#6D7EB5",
    borderRadius: scale(11),
    padding: scale(8),
  },

  tagText: {
    fontSize: scale(10),
    color: "#000",
  },

  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },

  emergencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  emergencyText: {
    flex: 1,
    fontSize: scale(13),
    color: "#08070E",
    paddingRight: scale(12),
  },

  footer: {
    marginTop: scale(40),
  },
});


export default EditCaseScreen;