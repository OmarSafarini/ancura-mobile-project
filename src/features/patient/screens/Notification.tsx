import React, { useRef, useEffect } from "react";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { Text, View, StyleSheet, ScrollView, Animated, Pressable } from "react-native";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import AppBackground from "@/components/layout/AppBackground";
import NotificationCard from "@/components/common/NotificationCard";

export function Notification() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current; 

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const notifications = [
        { title: "A doctor has provided guidance on your case Feeling anxious about work", date: "2/24/2026", isRead: false, status: "doctor_replied" },
        { title: "A doctor has provided guidance on your case Feeling anxious about work", date: "2/24/2026", isRead: false, status: "doctor_replied" },
        { title: "A doctor has provided guidance on your case Feeling anxious about work", date: "2/24/2026", isRead: true, status: "doctor_replied" },
        { title: "A doctor has provided guidance on your case Feeling anxious about work", date: "2/24/2026", isRead: true }
    ];

    return (
        <AppBackground variant="clean" style={styles.screen}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Notifications</Text>
                    <View style={styles.iconWrapper}>
                        <ArrowLeftIcon color={Colors.textDark2} size={scale(18)} />
                    </View>
                </View>
                <View style={styles.articleContainer}>
                    {notifications.map((item, index) => (
                    <Animated.View key={index} style={{ opacity: fadeAnim, transform: [{ translateY }], }}>
                        <Pressable android_ripple={{ color: Colors.formBackground }} style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }] },]}>
                            <NotificationCard {...item} />
                            {/* the background of the status is not working */}
                        </Pressable>
                    </Animated.View>))}
                </View>
            </ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: scale(50),
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
        marginTop: scale(56),
        paddingHorizontal: scale(51),
        gap: scale(19),
    },
});