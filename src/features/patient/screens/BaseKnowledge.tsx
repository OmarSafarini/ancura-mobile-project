import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Pressable, Animated } from "react-native";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import DocumentIcon from "@/features/patient/components/Icons/DoucmentIcon";
import AppBackground from "@/components/layout/AppBackground";
import Article from "@/features/patient/components/Buttons/Article";
import SelfHelpResource from "@/components/common/SelfHelpResource";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";

const ARTICLE_CATEGORIES = ["Articles", "Exercises"];

const RESOURCES = [
    { id: "1", title: "Breathing Exercises for Stress Relief", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon,},
    { id: "2", title: "Breathing Exercises for Stress Relief", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon,},
    { id: "3", title: "Breathing Exercises for Stress Relief", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon,},
];

export function BaseKnowledge() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current; 
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    }, [fadeAnim, translateY]);

    const filteredResources = RESOURCES.filter((item) => {
        if (selectedCategory === "Articles") {
            return item.tag === "Static Reading";
        } else if (selectedCategory === "Exercises") {
            return item.tag === "Youtube video";
        }
        return true; 
    });

    const renderHeader = () => (
        <View style={styles.headerWrapper}>
            <View style={styles.header}>
                <Text style={styles.title}>Self-Help & Resources</Text>
                <Pressable style={styles.iconWrapper}>
                    <ArrowLeftIcon color={Colors.textDark2} size={scale(18)} />
                </Pressable>
            </View>
            <View style={styles.articleContainer}>
                {ARTICLE_CATEGORIES.map((title) => (
                    <View key={title} style={styles.articleItem}>
                        <Article title={title} isSelected={selectedCategory === title} 
                            onPress={() => setSelectedCategory(prev => prev === title ? null : title)} />
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <AppBackground variant="clean" style={styles.screen}>
            <FlatList
                data={filteredResources}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
                        <Pressable 
                            android_ripple={{ color: Colors.formBackground }} 
                            style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
                            <SelfHelpResource title={item.title} tag={item.tag} tagColor={item.tagColor}
                                bgTagColor={item.bgTagColor} Icon={item.Icon}
                            />
                        </Pressable>
                    </Animated.View>
                )}
            />
        </AppBackground>
    );  
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: scale(50),
        flex: 1, 
    },
    listContent: {
        paddingBottom: scale(40), 
        paddingHorizontal: scale(51),
    },
    headerWrapper: {
        marginHorizontal: -scale(51), 
        marginBottom: scale(25),
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
        marginTop: scale(38),
        paddingHorizontal: scale(51),
        flexDirection: "row",
        gap: scale(9),
    },
    articleItem: {
        width: "30%",
        marginTop: scale(6),
        paddingVertical: scale(8), 
        borderRadius: scale(8),    
        alignItems: "center",
        justifyContent: "center",
    },
    separator: {
        height: scale(17), 
    },
});