import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/services/supabase"; // IMPORT YOUR AXIOS SETUP HERE
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Pressable , ActivityIndicator, SafeAreaView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
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

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await supabaseClient.get('/activity_log?select=*');
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
            <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Activity Log</Text>
                <Pressable style={styles.backWrapper} onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon color={Colors.textDark2} size={scale(18)} />
                </Pressable>
            </View>

            <View style={styles.timelineContainer}>
                <View style={styles.timelineLine} />
                
                {isLoading && (
                    <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: scale(40) }} />
                )}
                {error && (
                    <Text style={{ textAlign: 'center', marginTop: scale(20), color: 'red' }}>{error}</Text>
                )}

                {/* Data State */}
                {!isLoading && !error && (
                    <FlatList
                        data={activities}
                        keyExtractor={(item, index) => (item?.id ?? index).toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => {
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
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: scale(20),
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