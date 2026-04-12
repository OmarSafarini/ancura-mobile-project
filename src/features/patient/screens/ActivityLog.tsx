import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { supabaseApi } from "@/store/supabaseConfig"; // IMPORT YOUR AXIOS SETUP HERE
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import AppBackground from "@/components/layout/AppBackground";
import ActivityLogCard from "@/features/doctor/components/ActivityLogCard";

import ChatIcon from "@/features/doctor/components/Icons/ChatIcon";
import StartwithTickIcon from "@/features/doctor/components/Icons/StartwithTickIcon";
import ArrowIcon from "@/features/doctor/components/Icons/ArrowIcon";
import HandLikeIcon from "@/features/doctor/components/Icons/HandLikeIcon";
import StarIcon from "@/features/doctor/components/Icons/StarIcon";

// Maps to the 'status' column in your database
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
    
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when the screen loads
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // IMPORTANT: Replace 'activity_logs' with your exact table name if it is different
                // Fetching all columns, ordered by the 'date' column you provided
                const response = await supabaseApi.get('/activity_log?select=*');
                console.log(response)
                setActivities(response.data);
            } catch (err) {
                console.error("Error fetching activity logs:", err);
                setError("Failed to load activities.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivities();
    }, []);

    return (
        <AppBackground variant="clean" style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>Activity Log</Text>
                <Pressable style={styles.backWrapper} onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon color={Colors.textDark2} size={scale(18)} />
                </Pressable>
            </View>
            
            <View style={styles.timelineContainer}>
                <View style={styles.timelineLine} />
                
                {/* Loading State */}
                {isLoading && (
                    <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: scale(40) }} />
                )}

                {/* Error State */}
                {error && (
                    <Text style={{ textAlign: 'center', marginTop: scale(20), color: 'red' }}>{error}</Text>
                )}

                {/* Data State */}
                {!isLoading && !error && (
                    <FlatList
                        data={activities}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => {
                            // Safely grab the status, convert to lowercase to ensure it matches the map keys
                            const itemStatus = item.status ? item.status.toLowerCase() : 'default';
                            const uiConfig = ACTIVITY_UI_MAP[itemStatus] || ACTIVITY_UI_MAP['default'];
                            const ItemIcon = uiConfig.Icon;

                            return (
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
                            );
                        }}
                    />
                )}
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: scale(50),
        flex: 1, 
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(51),
    },

    backWrapper: {
        borderRadius: scale(6),
        backgroundColor: Colors.formBackground,
        padding: scale(8),
    },

    title: {
        fontSize: scale(24),
        fontFamily: Family.FG_Medium,
        color: Colors.textDark,
    },

    timelineContainer: {
        flex: 1, 
        position: "relative",
        marginTop: scale(40), 
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