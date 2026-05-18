import React from "react";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { Text, View, StyleSheet, FlatList, Pressable, SafeAreaView } from "react-native";
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

    const { data: notifications, isLoading, refetch } = useQuery({
        queryKey: ["notifications", user?.id], 
        queryFn: () => getPatientNotification(user?.id as string), 
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
                <FlatList
                    data={notifications}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    renderItem={renderItem}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    refreshing={isLoading}
                    onRefresh={refetch}
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
        width: scale(34),
        height: scale(34),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(6),
        backgroundColor: Colors.formBackground,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#F0F0F0",
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