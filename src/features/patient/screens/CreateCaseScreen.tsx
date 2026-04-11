import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useForm } from "react-hook-form"
import AppBackground from "@/components/base/AppBackground";
import InputField from "@/components/forms/InputFeild";
import AttachmentsField from "@/components/forms/AttachmentFeild";
import NormalButton from "@/components/common/NormalButton";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { scale } from "@/utils/responsive";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import EmergencyCheckBox from "../components/EmergencyCheckBox";


type FormValues = {
  title: string;
  description: string;
  isEmergency: boolean;
  files: DocumentPicker.DocumentPickerAsset[];
};

const CreateCase = ({ navigation }: any) => {
  const { control, handleSubmit, setValue, watch } = useForm<any>({
    defaultValues: {
      title: "",
      description: "",
      isEmergency: false,
      files: [],
    },
  });

  const isEmergency = watch("isEmergency");

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <AppBackground variant="clean">
      <View style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Hi USR-XXXXX</Text>
              <Text style={styles.headerSubtitle}>
                Your identity will remain 100% anonymous, and your name will not be shown to the doctors
              </Text>
            </View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation?.goBack()}
              activeOpacity={0.7}
            >
              <ArrowLeftIcon color={Colors.textDark} size={scale(18)} />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <InputField
              control={control as any}
              name="title"
              label="Subject / Title"
              placeholder="Type here"
              rules={{ required: "Title is required" }}
            />

            <InputField
              control={control as any}
              name="description"
              label="Description"
              placeholder="Type here"
              multiline
              numberOfLines={4}
              rules={{ required: "Description is required" }}
            />

            <View style={styles.attachmentSection}>
              <AttachmentsField
                files={watch("files")}
                onFilesChange={(files) => setValue("files", files)}
              />
            </View>

            <View style={styles.emergencyContainer}>
              <Text style={styles.emergencyText}>
                Is this case considered a critical emergency that requires immediate intervention?
              </Text>
              <EmergencyCheckBox onPress={() => setValue("isEmergency", !isEmergency)} isActive={isEmergency} />
            </View>
          </View>

          <View style={styles.footer}>
            <NormalButton
              title="Submit Case"
              onPress={handleSubmit(onSubmit)}
              bgColor={Colors.secondary}
              textColor={palette.white}
            />
          </View>
        </ScrollView>
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(52),
    paddingTop: scale(49),
    paddingBottom: scale(60),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: scale(32),
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: scale(16),
  },
  headerTitle: {
    fontSize: scale(20),
    fontFamily: Family.FG_Regular,
    color: Colors.textDark,
    lineHeight: scale(23),
  },
  headerSubtitle: {
    fontSize: scale(20),
    fontFamily: Family.FG_Regular,
    color: Colors.textDark,
    lineHeight: scale(23),
    marginTop: scale(2),
  },
  backButton: {
    width: scale(33),
    height: scale(33),
    backgroundColor: palette.white,
    borderRadius: scale(7),
    justifyContent: "center",
    alignItems: "center",
    // Shadow for premium feel
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formContainer: {
    gap: scale(32),
  },
  attachmentSection: {
    marginTop: scale(8),
  },
  emergencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scale(8),
  },
  emergencyText: {
    flex: 1,
    fontSize: scale(13),
    fontFamily: Family.FG_Regular,
    color: palette.dark,
    lineHeight: scale(15),
    paddingRight: scale(16),
  },
  toggleOuter: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: scale(1),
    backgroundColor: palette.white,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleInner: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(8),
    backgroundColor: "rgba(230, 93, 95, 0.88)",
  },
  footer: {
    marginTop: scale(48),
    marginBottom: scale(20),
  },
});

export default CreateCase;
