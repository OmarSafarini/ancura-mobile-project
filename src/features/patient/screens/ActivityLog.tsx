import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
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

const ACTIVITY_DATA = [
    {
        id: '1',
        title: "Commented on #Case1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        time: "2 hours ago",
        isResolved: true,
        Icon: ChatIcon,
        color: Colors.primary
    },
    {
        id: '2',
        title: "Commented on #Case1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        time: "2 hours ago",
        isResolved: false,
        Icon: StartwithTickIcon,
        color: Colors.secondary
    },
    {
        id: '3',
        title: "Commented on #Case1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        time: "2 hours ago",
        isResolved: false,
        Icon: ArrowIcon,
        color: Colors.primaryLight
    },
    {
        id: '4',
        title: "Commented on #Case1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        time: "2 hours ago",
        isResolved: false,
        Icon: HandLikeIcon,
        color: Colors.secondaryLight
    },
    {
        id: '5',
        title: "Commented on #Case1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        time: "2 hours ago",
        isResolved: false,
        Icon: StarIcon,
        color: Colors.shieldBackground
    }
];

export default function ActivityLog() {
    const navigation = useNavigation();
    return (
        <AppBackground variant="clean" style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>Activity Log</Text>
                <TouchableOpacity style={styles.backWrapper} onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon color={Colors.textDark2} size={scale(18)} />
                </TouchableOpacity>
            </View>

            <View style={styles.timelineContainer}>
                <View style={styles.timelineLine} />
                <FlatList
                    data={ACTIVITY_DATA}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <View style={styles.itemWrapper}>
                            <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
                                <item.Icon color={Colors.formBackground} size={scale(24)} />
                            </View>
                            <View style={styles.cardContainer}>
                                <ActivityLogCard
                                    title={item.title}
                                    description={item.description}
                                    time={item.time}
                                    isResolved={item.isResolved}
                                />
                            </View>
                        </View>
                    )}
                />
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