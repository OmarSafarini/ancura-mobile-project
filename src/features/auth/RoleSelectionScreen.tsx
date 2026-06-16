import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale } from "@/utils/responsive";

import NormalButton from "@/components/common/NormalButton";
import SelectUserType from "@/components/common/SelectUserType";
import { FontAwesome5 } from "@expo/vector-icons";
import AppBackground from "@/components/base/AppBackground";
import FadeInView from "@/utils/FadeInView";

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
            <AppBackground style={{ position: "absolute", width: "100%", height: "100%" }} />

            <View style={styles.safeArea}>
                <View style={styles.content}>
                    <FadeInView delay={0} translateYStart={30}>
                        <Text style={styles.title}>How would you like to use the app?</Text>
                    </FadeInView>

                    <View style={styles.optionsContainer}>
                        <FadeInView delay={150} translateYStart={30} style={{ width: "100%", alignItems: "center" }}>
                            <SelectUserType
                                title="I need help"
                                userType="(Patient)"
                                Icon={() => (
                                    <View style={{
                                        width: scale(68),
                                        height: scale(68),
                                        borderRadius: scale(34),
                                        backgroundColor: "#B6C0F9",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <FontAwesome5 name="hand-holding-heart" size={scale(28)} color="#6D7EB5" />
                                    </View>
                                )}
                                onPress={() => setSelectedRole("patient")}
                                isActive={selectedRole === "patient"}
                                activeBgColor="#b6c0f95b"
                                borderColor="#6D7EB5"
                            />
                        </FadeInView>

                        <FadeInView delay={300} translateYStart={30} style={{ width: "100%", alignItems: "center" }}>
                            <SelectUserType
                                title="I want to help"
                                userType="(Doctor)"
                                Icon={() => (
                                    <View style={{
                                        width: scale(68),
                                        height: scale(68),
                                        borderRadius: scale(34),
                                        backgroundColor: "#C3E3C7",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <FontAwesome5 name="user-md" size={scale(30)} color="#8EB392" />
                                    </View>
                                )}
                                onPress={() => setSelectedRole("doctor")}
                                isActive={selectedRole === "doctor"}
                                activeBgColor="#c3e3c75b"
                                borderColor="#8EB392"
                            />
                        </FadeInView>
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <FadeInView delay={450} translateYStart={20} style={{ width: "100%", alignItems: "center" }}>
                        <NormalButton
                            title="Continue"
                            onPress={handleContinue}
                            bgColor={selectedRole ? "#6D7EB5" : "#6D7EB580"}
                            textColor="#FFFFFF"
                        />
                    </FadeInView>
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
        zIndex: 1,
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