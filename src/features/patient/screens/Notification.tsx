import React from "react";
import PatientHeader from "../components/PatientHeader";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import AppBackground from "@/components/base/AppBackground";
import NotificationCard from "@/components/common/NotificationCard";
import { useNavigation } from "@react-navigation/native";
import { getPatientNotification } from "@/services/Patient/Notification";
import { useQuery } from "@tanstack/react-query";
import { useMarkNotificationAsRead } from "@/hooks/useMarkNotificationAsRead";
import FadeInView from "@/utils/FadeInView";

import { useAuthStore } from "@/store/authStore"; 

export default function Notification() {
    const { mutate: markAsRead } = useMarkNotificationAsRead();
    const navigation = useNavigation();

    const user = useAuthStore((state) => state.user);

    const { data: notifications } = useQuery({
        queryKey: ["notifications", user?.id], 
        queryFn: () => getPatientNotification(user?.id as string), 
        enabled: !!user?.id 
    }); 

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <FadeInView delay={index * 50} duration={400}>
            <Pressable
                onPress={() => {
                    if (!item.is_read) markAsRead(item.id);}}
                android_ripple={{ color: Colors.formBackground }}
                style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
                <NotificationCard {...item} />
            </Pressable>
        </FadeInView>
    );

    return (    
        <AppBackground variant="clean" style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <View style={{ paddingHorizontal: scale(51) }}>
                    <PatientHeader 
                        title="Notifications" 
                        rightIcon="back" 
                        useSafeArea={false} 
                        containerStyle={{ marginBottom: scale(10) }}
                    />
                </View>
                <View style={styles.listWrapper}>
                    <FlatList
                        data={notifications}
                        keyExtractor={(item, index) => item.id || index.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                    <LinearGradient
                        colors={[
                            "rgba(195, 227, 199, 0)",
                            "rgba(195, 227, 199, 0.8)",
                            "rgba(195, 227, 199, 1)",
                        ]}
                        style={styles.bottomBlur}
                        pointerEvents="none"
                    />
                </View>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: scale(51),
        paddingBottom: scale(90),
        gap: scale(19),
    },
    listWrapper: {
        flex: 1,
        position: "relative",
    },
    bottomBlur: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: scale(80),
    },
});