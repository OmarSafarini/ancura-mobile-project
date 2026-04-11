import React, { useRef, useEffect } from "react";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { Text, View, StyleSheet, FlatList, Animated, Pressable } from "react-native";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import AppBackground from "@/components/base/AppBackground";
import NotificationCard from "@/components/common/NotificationCard";

export default function Notification() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const notifications = [
        { id: "1", title: "A doctor has provided guidance on your case Feeling anxious about work", date: "2/24/2026", isRead: false, status: "doctor_replied" },
        { id: "2", title: "A doctor has provided guidance on your case Feeling anxious about work", date: "2/24/2026", isRead: false, status: "doctor_replied" },
        { id: "3", title: "A doctor has provided guidance on your case Feeling anxious about work", date: "2/24/2026", isRead: true, status: "resolved" },
        { id: "4", title: "A doctor has provided guidance on your case Feeling anxious about work", date: "2/24/2026", isRead: true, status: "None" }
    ];

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.iconWrapper}>
                <ArrowLeftIcon color={Colors.textDark2} size={scale(18)} />
            </View>
        </View>
    );

    {/*i tested if it bring an error but it doesn't */ }
    const renderItem = ({ item }) => (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
            <Pressable
                android_ripple={{ color: Colors.formBackground }}
                style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
                <NotificationCard {...item} />
            </Pressable>
        </Animated.View>
    );

    return (
        <AppBackground variant="clean" style={styles.screen}>
            <FlatList
                data={notifications}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: scale(50),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: scale(56),
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
    listContainer: {
        paddingHorizontal: scale(51),
        paddingBottom: scale(30),
        gap: scale(19),
    },
});