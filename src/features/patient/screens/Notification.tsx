import React, { useRef, useEffect } from "react";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { Text, View, StyleSheet, FlatList, Animated, Pressable, SafeAreaView } from "react-native";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import AppBackground from "@/components/base/AppBackground";
import NotificationCard from "@/components/common/NotificationCard";
import { useNavigation } from "@react-navigation/native";
import { getPatientNotification } from "@/services/Patient/Notification";
import { useQuery } from "@tanstack/react-query";

// ✅ Import the store here
import { useAuthStore } from "@/store/authStore"; 

export default function Notification() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current; 
    const navigation = useNavigation();

    // ✅ Grab the user safely inside the React component
    const user = useAuthStore((state) => state.user);

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

    const { data: notifications, isLoading } = useQuery({
        // ✅ Add user.id to the queryKey so it refetches if the user logs out/in
        queryKey: ["notifications", user?.id], 
        
        // ✅ Pass the user.id to your API call
        queryFn: () => getPatientNotification(user?.id), 
        
        // ✅ Tell React Query not to run this until `user.id` actually exists
        enabled: !!user?.id 
    });

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