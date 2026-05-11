import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform, Modal, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import * as DocumentPicker from 'expo-document-picker';
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import DocumentIcon from "@/assets/icons/DoucmentIcon";
import AppBackground from "@/components/base/AppBackground";
import InputField from "@/components/forms/InputFeild";
import FormDropdown from "@/components/forms/Dropdown";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import WarningInfoIcon from "@/assets/icons/WarningIconInfo";
import EditPaperclipAttachmentIcon from "@/assets/icons/EditPaperclipAttachment";
import NormalButton from "@/components/common/NormalButton";
import SuccessScreen from "@/components/common/SuccessScreen";
import { supabaseClient } from "@/services/supabase"; 
import { uploadDocumentToStorage } from "@/services/Doctor/storageService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDoctor } from "@/Context/DoctorContext";
export function LicenseVerification({ navigation }: any) {
    const { control, handleSubmit } = useForm();
    const [selectedDocument, setSelectedDocument] = useState<null | { name: string, uri: string, size?: number, mimeType?: string }>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { doctorData } = useDoctor(); 
console.log("Licnse",doctorData);
            console.log("Dr Id",doctorData.id);

    const handleDocumentUpload = async () => {
        try { 
            const r = doctorData.id
            console.log("Dr Id",r);
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                const maxSizeInBytes = 10 * 1024 * 1024; // 10MB limit

                if (file.size && file.size > maxSizeInBytes) {
                    Alert.alert("File too large", "Please select a file smaller than 10MB.");
                    return;
                }

                setSelectedDocument({
                    name: file.name,
                    uri: file.uri,
                    size: file.size,
                    mimeType: file.mimeType || 'application/octet-stream',
                });
            }
        } catch (error) {
            console.error("Error picking document:", error);
            Alert.alert("Error", "Something went wrong while picking the document.");
        }
    };


    const formatToSQLDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    };

    const onSubmit = async (formData: any) => {
        if (!selectedDocument) {
            Alert.alert("Missing Document", "Please upload your license document before submitting.");
            return;
        }

        setIsLoading(true);


        try {
            const publicUrl = await uploadDocumentToStorage(
                selectedDocument.uri, 
                selectedDocument.name, 
                selectedDocument.mimeType as string,
                'licenses'
            );

            const payload = {
                doctor_id: doctorData.id,
                authority: formData.licensingAuthority,
                yearsexp: parseInt(formData.yearsOfExperience, 10), 
                license_number: formData.licenseNumber,
                issue_date: formatToSQLDate(formData.issueDate), 
                expire_date: formatToSQLDate(formData.expiryDate), 
                document: publicUrl,
            };

            const response = await supabaseClient.post('/license', payload);
            
            if (response.status === 201 || response.status === 204 || response.status === 200) {
                setShowSuccess(true);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            Alert.alert("Submission Failed", "Could not verify your license. Please check your inputs and try again.");
        } finally {
            setIsLoading(false);
        }
    };

const goBack = () => {
  navigation.navigate("DoctorProfileAndSettings");
  };
    return (
        <AppBackground variant="clean" style={styles.screen}>
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled">

                    <View style={styles.header}>
                        <Text style={styles.title}>License Verification</Text>
                        <Pressable style={styles.iconWrapper} onPress={() => navigation.navigate('DoctorProfileAndSettings')}>
                            <ArrowLeftIcon color={Colors.textDark2} size={scale(18)} onPress={goBack} />
                        </Pressable>
                    </View>

                    <View style={styles.articleContainer}>
                        <Text style={styles.articleText}>
                            Your license will be verified by our admin team within 2-3 business days. All information is kept confidential.
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <InputField control={control} name="licenseNumber" label="License Number"
                            placeholder="eg.hiuguy" rules={{ required: "License number is required" }} />

                        <InputField control={control} name="licensingAuthority" label="Licensing Authority"
                            placeholder="eg.Jordan" rules={{ required: "Licensing authority is required" }} />

                        <FormDropdown control={control} name="yearsOfExperience"
                            label="Years of Experience"
                            data={[{ label: "1 year", value: "1" }, { label: "2 years", value: "2" },
                            { label: "3 years", value: "3" }, { label: "4 years", value: "4" },
                            { label: "+5 years", value: "5" }]}
                            placeholder="Select Years of Experience"
                            rules={{ required: "Years of experience is required" }}
                        />

                        <View style={styles.dates}>
                            <InputField control={control} name="issueDate" label="Issue Date"
                                placeholder="DD/MM/YYYY" rules={{ required: "Issue date is required" }} />

                            <InputField control={control} name="expiryDate" label="Expiry Date"
                                placeholder="DD/MM/YYYY" rules={{ required: "Expiry date is required" }} />
                        </View>
                    </View>

                    <View style={styles.resourceContainer}>
                        <Pressable style={({ pressed }) => [styles.uploadZone, pressed && styles.uploadZonePressed]}
                            onPress={handleDocumentUpload}>
                            <View style={styles.uploadHeader}>
                                <EditPaperclipAttachmentIcon />
                                <Text style={styles.uploadPrimaryText}> Upload License Document</Text>
                            </View>
                            <Text style={styles.uploadSecondaryText}>Please do not attach any photos that reveal your identity.</Text>
                        </Pressable>
                        {selectedDocument && (
                            <View style={styles.filePreview}>
                                <DocumentIcon color={Colors.textDark} size={scale(16)} />
                                <Text style={styles.fileName} numberOfLines={1}>
                                    {selectedDocument.name}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.warningContainer}>
                        <View style={styles.warningHeader}>
                            <WarningInfoIcon />
                            <Text style={styles.warningTextPrimary}>Privacy Notice</Text>
                        </View>
                        <Text style={styles.warningTextSecondary}>Your license document will only be viewed
                            by authorized admin staff for verification purposes. It will not be displayed publicly.</Text>
                    </View>

                    <View style={styles.submitButton}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color={Colors.primary} />
                        ) : (
                            <NormalButton title="Submit" onPress={handleSubmit(onSubmit)} />
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
            <Modal
                visible={showSuccess}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowSuccess(false)}
            >
                <View style={styles.overlay}>
                    <SuccessScreen
                        subtitle="Your account created successfully and ready now."
                        onPress={() => { setShowSuccess(false); navigation.navigate('DoctorLoginScreen') }}
                    />
                </View>
            </Modal>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: scale(30),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(51),
    },
    iconWrapper: {
        borderRadius: scale(6),
        backgroundColor: Colors.formBackground,
        padding: scale(8),
    },
    title: {
        fontSize: scale(24),
        fontFamily: Family.FG_Medium,
        color: Colors.textDark,
    },
    articleContainer: {
        marginTop: scale(10),
        paddingHorizontal: scale(51),
    },
    articleText: {
        fontSize: scale(13),
        fontFamily: Family.FG_Regular,
        color: Colors.primary,
        width: "90%",
    },
    inputContainer: {
        marginTop: scale(38),
        paddingHorizontal: scale(51),
        gap: scale(29),
    },
    dates: {
        flexDirection: "row",
        gap: scale(21),
        width: "47%",
    },
    resourceContainer: {
        marginTop: scale(29),
        paddingHorizontal: scale(51),
        gap: scale(8),
    },
    uploadZone: {
        width: scale(328),
        height: scale(80),
        borderWidth: scale(1.5),
        borderColor: Colors.primary,
        borderStyle: "dashed",
        borderRadius: scale(12),
        backgroundColor: Colors.formBackground,
        alignItems: "center",
        justifyContent: "center",
        gap: scale(3)
    },
    uploadZonePressed: {
        backgroundColor: `${Colors.primaryLight}40`,
        borderColor: Colors.primary,
    },
    uploadHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    uploadPrimaryText: {
        fontSize: scale(13),
        fontFamily: Family.FG_Regular,
        color: Colors.textDark2,
    },
    uploadSecondaryText: {
        marginLeft: scale(30),
        fontSize: scale(7),
        fontFamily: Family.FG_Regular,
        color: Colors.formLabel,
        opacity: 0.7,
    },
    filePreview: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(8),
        padding: scale(12),
        backgroundColor: Colors.formBackground,
        borderRadius: scale(8),
        marginTop: scale(5),
    },
    fileName: {
        fontSize: scale(13),
        fontFamily: Family.FG_Medium,
        color: Colors.textDark,
        flex: 1,
    },
    warningContainer: {
        marginTop: scale(45),
        paddingHorizontal: scale(51),
        gap: scale(8),
    },
    warningHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(8),
    },
    warningTextPrimary: {
        fontSize: scale(15),
        fontFamily: Family.FG_Regular,
        marginTop: scale(5),
        color: Colors.textDark,
    },
    warningTextSecondary: {
        fontSize: scale(11),
        fontFamily: Family.FG_Regular,
        color: Colors.textDark2,
    },
    submitButton: {
        width: scale(328),
        alignSelf: "center",
        marginTop: scale(87),
    },
});