import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/services/supabase"; 
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackButton from "@/components/common/BackButton";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import AppBackground from "@/components/base/AppBackground";
import ChatIcon from "@/assets/icons/ChatIcon";
import ActivityLogCard from "@/features/doctor/components/ActivityLogCard";
import StartwithTickIcon from "@/assets/icons/StartwithTickIcon";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import HandLikeIcon from "@/assets/icons/HandLikeIcon";
import StarIcon from "@/assets/icons/StarIcon";
import { useAuthStore } from "@/store/authStore";
import FadeInView from "@/utils/FadeInView";


const ACTIVITY_UI_MAP = {
    'comment': { Icon: ChatIcon, color: Colors.primary },
    'resolved': { Icon: StartwithTickIcon, color: Colors.secondary },
    'alert': { Icon: ArrowIcon, color: Colors.primaryLight },
    'like': { Icon: HandLikeIcon, color: Colors.secondaryLight },
    'star': { Icon: StarIcon, color: Colors.shieldBackground },
    'default': { Icon: ChatIcon, color: Colors.primary }, 
};

export default function ActivityLog() {
    const navigation = useNavigation();
    const user = useAuthStore((state) => state.user);

    const { data: activities = [], isLoading, error, refetch } = useQuery({
        queryKey: ["activitylog", user?.id],
        queryFn: async () => {
            if (!user?.id) return [];
            const response = await supabaseClient.get(`/activity_log?doctor_id=eq.${user.id}&select=*&order=date.desc`);
            return response.data;
        },
        enabled: !!user?.id,
    });

    return (
        <AppBackground variant="clean" style={styles.screen}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Activity Log</Text>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>

            <View style={styles.timelineContainer}>
                <View style={styles.timelineLine} />
                
                {error && (
                    <Text style={{ textAlign: 'center', marginTop: scale(20), color: 'red' }}>{error instanceof Error ? error.message : "Failed to load activities."}</Text>
                )}

                {/* Data State */}
                <FlatList
                    data={activities}
                    keyExtractor={(item, index) => (item?.id ?? index).toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    renderItem={({ item, index }) => {
                        const itemStatus = item.status ? item.status.toLowerCase() : 'default';
                        const uiConfig = ACTIVITY_UI_MAP[itemStatus] || ACTIVITY_UI_MAP['default'];
                        const ItemIcon = uiConfig.Icon;

                        return (
                            <FadeInView delay={index * 60} translateYStart={15}>
                                <View style={styles.itemWrapper}>
                                    <View style={[styles.iconWrapper, { backgroundColor: uiConfig.color }]}>
                                        <ItemIcon color={Colors.formBackground} size={scale(24)} />
                                    </View>
                                    <View style={styles.cardContainer}>
                                        <ActivityLogCard 
                                            title={item.history_title} 
                                            description={item.body} 
                                            time={item.date} 
                                            isResolved={itemStatus === 'resolved'} 
                                        />
                                    </View>
                                </View>
                            </FadeInView>
                        );
                    }}
                />
            </View>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: scale(56),
        marginTop: scale(10),
        paddingHorizontal: scale(51),
    },

    title: {
        fontSize: scale(24),
        fontFamily: Family.FG_Medium,
        color: Colors.textDark,
    },

    timelineContainer: {
        flex: 1,
        position: "relative",
    },

    timelineLine: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: scale(43) + scale(35) / 2 - scale(1),
        width: scale(3),
        borderRadius: scale(30),
        backgroundColor: "#FFFFFF",
        zIndex: -1,
    },

    listContent: {
        paddingBottom: scale(40),
    },

    itemWrapper: {
        marginBottom: scale(20),
    },

    iconWrapper: {
        width: scale(35),
        height: scale(35),
        borderRadius: scale(18),
        justifyContent: "center",
        alignItems: "center",
        marginLeft: scale(43),
    },

    cardContainer: {
        marginLeft: scale(78),
        width: scale(120),
        marginTop: -scale(30),
    }
});