import React, { useRef, useEffect } from "react";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { Text, View, StyleSheet, FlatList, Animated, Pressable, SafeAreaView } from "react-native";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import AppBackground from "@/components/base/AppBackground";
import NotificationCard from "@/components/common/NotificationCard";
import { useNavigation } from "@react-navigation/native";

export default function Notification() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current; 
    const navigation = useNavigation();

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
            <Pressable style={styles.iconWrapper} onPress={() => navigation.goBack()}>
                <ArrowLeftIcon color={Colors.textDark2} size={scale(18)} />
            </Pressable>
        </View>
    );

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
        <AppBackground variant="clean" style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <FlatList
                    data={notifications}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    renderItem={renderItem}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: scale(56),
        // Added a bit of top margin in case the SafeArea is too close to the very top on Android
        marginTop: scale(10), 
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