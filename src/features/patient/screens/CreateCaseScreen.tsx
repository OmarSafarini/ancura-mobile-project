import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useForm } from "react-hook-form";
import type { DocumentPickerAsset } from "expo-document-picker";
import AppBackground from "@/components/base/AppBackground";
import InputField from "@/components/forms/InputFeild";
import AttachmentsField from "@/components/forms/AttachmentFeild";
import NormalButton from "@/components/common/NormalButton";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import BackButton from "@/components/common/BackButton";
import DeleteIconButton from "../components/Buttons/DeleteIconButton";
import FileBar from "@/components/common/FileBar";
import IconWrapper from "@/components/common/IconWrapper";
import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import EmergencyCheckBox from "../components/EmergencyCheckBox";
import { createCase } from "@/services/Patient/Cases";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";


type FormValues = {
  title: string;
  description: string;
  isEmergency: boolean;
  files: DocumentPickerAsset[];
};

type CaseFileItem = {
  id: string;
  title: string;
};

const CreateCase = ({ navigation }: any) => {
  const [caseFiles, setCaseFiles] = useState<CaseFileItem[]>([]);
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      isEmergency: false,
      files: [],
    },
  });

  const isEmergency = watch("isEmergency");
  const pickedFiles = watch("files");
  const titleValue = watch("title");

  const onSubmit = async (data: FormValues) => {
    try {
      if (!user?.id) {
        Alert.alert("Error", "You must be signed in to create a case.");
        return;
      }

      const files = data.files
        .map((file) => file.uri || file.name)
        .filter(Boolean) as string[];

      await createCase({
        patient_id: user.id,
        title: data.title.trim(),
        description: data.description.trim(),
        file: files[0] ?? null,
        isEmergency: data.isEmergency,
      });

      queryClient.invalidateQueries({ queryKey: ["patientPost"] });

      Alert.alert("Success", "Case created successfully.");
      navigation.goBack();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create case.";
      Alert.alert("Error", message);
    }
  };

  const deleteFile = (id: string) => {
    setCaseFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    const remainingPickedFiles = pickedFiles.filter(
      (file) => (file.uri || file.name) !== id
    );
    setValue("files", remainingPickedFiles);
  };

  useEffect(() => {
    if (!pickedFiles?.length) return;

    setCaseFiles((prevFiles) => {
      const existingIds = new Set(prevFiles.map((file) => file.id));
      const newItems = pickedFiles
        .map((file) => ({
          id: file.uri || file.name,
          title: file.name,
        }))
        .filter((file) => !existingIds.has(file.id));

      return [...prevFiles, ...newItems];
    });
  }, [pickedFiles]);

  return (
    <AppBackground variant="clean">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerText}>Hi USR-XXXXX</Text>
            <BackButton onPress={() => navigation.goBack()} />
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
            isEdit
            textStyle={{
              fontSize: scale(20),
              fontFamily: titleValue ? Family.FG_Medium : Family.FG_Light,
              color: "#000",
            }}
            rules={{ required: "Title is required" }}
          />

          <InputField
            control={control as any}
            name="description"
            label="Description"
            placeholder="Type here"
            isEdit
            multiline
            numberOfLines={4}
            textStyle={{
              fontSize: scale(14),
              fontFamily: Family.FG_Regular,
              color: "#6D7EB5",
            }}
            rules={{ required: "Description is required" }}
          />

          <AttachmentsField
            files={watch("files")}
            onFilesChange={(files) => setValue("files", files)}
          />

          <View style={styles.tagsContainer}>
            {caseFiles.map((file) => (
              <View key={file.id} style={styles.fileRow}>
                <View style={{ flex: 1 }}>
                  <FileBar
                    title={file.title}
                    icon={
                      <IconWrapper
                        size={13}
                        bgColor="#ffffff"
                        shape="circle"
                        border="#6D7EB5"
                      >
                        <ArrowLeftIcon size={8} color="#6D7EB5" />
                      </IconWrapper>
                    }
                  />
                </View>
                <DeleteIconButton onPress={() => deleteFile(file.id)} />
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
            title="Create Case"
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
      </SafeAreaView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(52),
    paddingTop: scale(10),
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

  form: {
    gap: scale(24),
  },

  tagsContainer: {
    gap: scale(8),
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

export default CreateCase;
