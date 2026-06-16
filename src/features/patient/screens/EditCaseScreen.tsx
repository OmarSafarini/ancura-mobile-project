import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm } from "react-hook-form";
import type { DocumentPickerAsset } from "expo-document-picker";

import AppBackground from "@/components/base/AppBackground";
import InputField from "@/components/forms/InputFeild";
import AttachmentsField from "@/components/forms/AttachmentFeild";
import NormalButton from "@/components/common/NormalButton";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import EmergencyCheckBox from "../components/EmergencyCheckBox";
import DeleteIconButton from "../components/Buttons/DeleteIconButton";
import PatientHeader from "../components/PatientHeader";

import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import FileBar from "@/components/common/FileBar";
import IconWrapper from "@/components/common/IconWrapper";
import { editCase } from "@/services/Patient/Cases";
import { useAuthStore } from "@/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatintProfile } from "@/services/Patient/PatinetService";
import { uploadDocumentToStorage } from "@/services/Doctor/storageService";

type FormValues = {
  title: string;
  description: string;
  isEmergency: boolean;
  files: DocumentPickerAsset[];
};

const EditCaseScreen = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: patient } = useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      if (!user?.id) throw new Error("No user id");
      return getPatintProfile(user.id);
    },
    enabled: !!user?.id,
  });

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      isEmergency: false,
      files: [],
    },
  });

  const isEmergency = watch("isEmergency");
  const pickedFiles = watch("files") || [];

  const onSubmit = async (data: FormValues) => {
    const rawCaseId = route?.params?.caseId ?? route?.params?.caseData?.id;
    const caseId = typeof rawCaseId === "string" ? Number(rawCaseId) : rawCaseId;

    if (!caseId || Number.isNaN(caseId)) {
      Alert.alert("Error", "Case id is missing.");
      return;
    }

    try {
      setIsLoading(true);

      const uploadedFileUrls = await Promise.all(
        data.files.map(async (file) => {
          if (!file.uri) return null;
          
          if (file.uri.startsWith("http://") || file.uri.startsWith("https://")) {
            return file.uri;
          }

          return await uploadDocumentToStorage(
            file.uri,
            file.name || `file_${Date.now()}`,
            file.mimeType || 'application/octet-stream',
            'case-files'
          );
        })
      );

      const validUrls = uploadedFileUrls.filter(Boolean) as string[];

      await editCase(Number(caseId), {
        title: data.title.trim(),
        description: data.description.trim(),
        isEmergency: data.isEmergency,
        file: validUrls.length > 0 ? validUrls[0] : null,
      });

      queryClient.invalidateQueries({ queryKey: ["patientPost"] });
      queryClient.invalidateQueries({ queryKey: ["case", Number(caseId)] });

      Alert.alert("Success", "Case updated successfully.");
      navigation.goBack();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update case.";
      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = (id: string) => {
    const remainingPickedFiles = pickedFiles.filter(
      (file) => (file.uri || file.name) !== id
    );
    setValue("files", remainingPickedFiles);
  };

  useEffect(() => {
    const caseData = route?.params?.caseData;
    if (!caseData) return;

    setValue("title", caseData.title ?? "");
    setValue("description", caseData.description ?? "");
    setValue("isEmergency", Boolean(caseData.isEmergency));

    if (caseData.file) {
      const existingFile = String(caseData.file);
      setValue("files", [
        {
          uri: existingFile,
          name: existingFile.split("/").pop() ?? "Attachment",
        } as any,
      ]);
    } else {
      setValue("files", []);
    }
  }, [route?.params?.caseData, setValue]);

  return (
    <AppBackground variant="clean">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <PatientHeader 
            title={`Hi ${patient?.nickname || "USR-XXXXX"}`}
            rightIcon="back"
            onRightPress={() => navigation.goBack()}
            useSafeArea={false}
            titleStyle={{ fontFamily: Family.FG_Light, fontSize: scale(20) }}
            containerStyle={{ marginBottom: scale(10) }}
          />
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
            isEdit={true}
            textStyle={{
              fontSize: scale(20),
              fontFamily: Family.FG_Medium,
              color: "#000",
            }}
            rules={{ required: "Title is required" }}
          />

          <InputField
            control={control as any}
            name="description"
            label="Description"
            placeholder="Type here"
            isEdit={true}
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
            files={pickedFiles}
            onFilesChange={(files) => setValue("files", files)}
            maxFiles={1}
          />

          <View style={styles.tagsContainer}>
            {pickedFiles.map((file) => {
              const fileId = file.uri || file.name;
              return (
                <View key={fileId} style={styles.fileRow}>
                  <View style={{ flex: 1 }}>
                    <FileBar
                      title={file.name}
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
                  <DeleteIconButton onPress={() => deleteFile(fileId)} />
                </View>
              );
            })}
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
          {isLoading ? (
            <ActivityIndicator size="large" color="#8EB392" />
          ) : (
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
          )}
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

export default EditCaseScreen;