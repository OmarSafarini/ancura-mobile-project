import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale } from "@/utils/responsive";

import NormalButton from "@/components/common/NormalButton";
import SelectUserType from "@/components/common/SelectUserType";
import PersonIcon from "@/assets/icons/PersonIcon";
import AppBackground from "@/components/layout/AppBackground";

export default function RoleSelectionScreen({ navigation }: any) {
    const [selectedRole, setSelectedRole] = useState<"patient" | "doctor" | null>(null);

    const handleContinue = () => {
        if (selectedRole === "patient") {
            navigation.navigate("PatientAuthScreen");
        } else if (selectedRole === "doctor") {
            navigation.navigate("DoctorLoginScreen");
        }
    };

    return (
        <View style={styles.container}>
           <AppBackground style={{ position: "absolute", width: "100%", height: "100%" }}/>

            <View style={styles.safeArea}>
                <View style={styles.content}>
                    <Text style={styles.title}>How would you like to use the app?</Text>
                    
                    <View style={styles.optionsContainer}>
                        <SelectUserType
                            title="I need help"
                            userType="(Patient)"
                            Icon={() => <PersonIcon size={scale(68)} color="#6D7EB5" bgColor="#B6C0F9" />}
                            onPress={() => setSelectedRole("patient")}
                            isActive={selectedRole === "patient"}
                            activeBgColor="#b6c0f95b"
                        />

                        <SelectUserType
                            title="I want to help"
                            userType="(Doctor)"
                            Icon={() => <PersonIcon size={scale(68)} color="#8EB392" bgColor="#C3E3C7" />}
                            onPress={() => setSelectedRole("doctor")}
                            isActive={selectedRole === "doctor"}
                            activeBgColor="#c3e3c75b"
                        />
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <NormalButton
                        title="Continue"
                        onPress={handleContinue}
                        bgColor={selectedRole ? "#6D7EB5" : "#6D7EB580"}
                        textColor="#FFFFFF"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: scale(101),
        paddingHorizontal: scale(30),
    },
    title: {
        fontFamily: 'Founders Grotesk',
        fontWeight: "400",
        fontSize: scale(32),
        color: "#6D7EB5",
        marginBottom: scale(40),
        marginLeft: scale(30),
        maxWidth: scale(271),
        lineHeight: scale(34),
    },
    optionsContainer: {
        gap: scale(40),
        alignItems: "center",
    },
    footerContainer: {
        paddingBottom: scale(40),
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: scale(30),
    }
});