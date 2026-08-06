import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Animated, Modal, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import DocumentIcon from "@/assets/icons/DoucmentIcon";
import AppScreenLayout from "@/layout/AppScreenLayout";
import Article from "@/features/patient/components/Article";
import SelfHelpResource from "@/components/common/SelfHelpResource";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import { useNavigation } from "@react-navigation/native";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import PatientHeader from "../components/PatientHeader";
import FadeInView from "@/utils/FadeInView";
import { useQuery } from "@tanstack/react-query";

const ARTICLE_CATEGORIES = ["Articles", "Exercises"];

const RESOURCES = [
    { id: "1", title: "Breathing Exercises (UC Berkeley)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://uhs.berkeley.edu/sites/default/files/breathing_exercises_0.pdf" },
    { id: "6", title: "Cleveland Clinic: Five-Finger Breathing", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=oeeWEtiAseA" },
    { id: "2", title: "Deep Breathing Exercises (Mercy Medical)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://www.mercycare.org/app/files/public/59045330-91c8-4b49-b72e-636e726f75dc/5Deep%20breathing%20exercises.pdf" },
    { id: "7", title: "Cleveland Clinic: Breathwork for Beginners", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=J7JKQA-F2dg" },
    { id: "3", title: "Two Breathing Techniques (USU Extension)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://extension.usu.edu/mentalhealth/articles/two-breathing-techniques.pdf" },
    { id: "8", title: "City of Hope: 15-Minute Deep Breathing", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=F28MGLlpP90" },
    { id: "4", title: "Breathing and Health (UW Integrative)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://www.fammed.wisc.edu/files/webfm-uploads/documents/outreach/im/handout-BreathingAndHealth-Final.pdf" },
    { id: "9", title: "Nicklaus Children’s: 5-Min Mindful Breathing", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=he-tQOnDCWw" },
    { id: "5", title: "Stress-Busting Breathing (APTA)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://www.apta.org/contentassets/e7601c54ab3e42ba9acf2ad1ee3b9279/aptahyperice_take-a-breather-with-these-stress-busting-exercises.pdf" },
    { id: "10", title: "UW Medicine: Guided Breathing for Stress", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=Mn4kUw5uXQU" },
];

export function BaseKnowledge() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [activeUrl, setActiveUrl] = useState<string | null>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const webViewRef = useRef<WebView>(null);
    const navigation = useNavigation();

    const { data: resources = RESOURCES } = useQuery({
        queryKey: ['baseKnowledgeResources'],
        queryFn: () => Promise.resolve(RESOURCES),
        staleTime: Infinity, 
    });

    const filteredResources = resources.filter((item) => {
        if (selectedCategory === "Articles") {
            return item.tag === "Static Reading";
        } else if (selectedCategory === "Exercises") {
            return item.tag === "Youtube video";
        }
        return true;
    });

    const handleResourcePress = (item: typeof RESOURCES[0]) => {
        if (item.url) {
            setActiveUrl(item.url);
        }
    };

    const handleBackPress = () => {
        if (activeUrl) {
            if (canGoBack && webViewRef.current) {
                webViewRef.current.goBack();
            } else {
                setActiveUrl(null);
            }
        } else {
            navigation.goBack();
        }
    };

    const renderHeader = () => (
        <View style={styles.headerWrapper}>
            <View>
                <PatientHeader 
                    title="Self-Help & Resources" 
                    rightIcon="back" 
                    onRightPress={handleBackPress}
                    useSafeArea={false}
                />
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
        <AppScreenLayout variant="clean" style={styles.background}>
            <View style={styles.safeArea}>
                {renderHeader()}
                <View style={styles.listWrapper}>
                    <FlatList
                        data={filteredResources}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item, index }) => (
                            <FadeInView
                                delay={index * 80}
                                duration={450}
                                translateYStart={15}
                            >
                                <SelfHelpResource 
                                    title={item.title} 
                                    tag={item.tag} 
                                    tagColor={item.tagColor}
                                    bgTagColor={item.bgTagColor} 
                                    Icon={item.Icon}
                                    onPress={() => handleResourcePress(item)}
                                />
                            </FadeInView>
                        )}
                    />
                    <LinearGradient
                        colors={[
                            "rgba(195, 227, 199, 0)",
                            "rgba(195, 227, 199, 0.8)",
                            "rgba(195, 227, 199, 1)",
                        ]}
                        style={styles.bottomBlur}
                        pointerEvents="none"
                    />
                </View>
            </View>

            <Modal
                visible={activeUrl !== null}
                animationType="slide"
                statusBarTranslucent
                onRequestClose={() => setActiveUrl(null)}
            >
                <SafeAreaView style={styles.webViewSafeArea}>
                    <View style={styles.webViewHeader}>
                        <Pressable style={styles.iconWrapper} onPress={handleBackPress}>
                        <ArrowLeftIcon 
                            color={Colors.textDark2} 
                            size={scale(18)} 
                            onPress={handleBackPress}
                        />
                        </Pressable>
                        <Text style={styles.webViewHeaderTitle} numberOfLines={1}>Resource</Text>
                        <View style={{ width: scale(34) }} />
                    </View>
                    {activeUrl && (
                        Platform.OS === 'web' ? (
                            <iframe 
                                src={activeUrl.includes("youtube.com/watch?v=") ? activeUrl.replace("watch?v=", "embed/") : activeUrl}
                                style={{ flex: 1, width: '100%', height: '100%', border: 'none' }}
                                allowFullScreen
                            />
                        ) : (
                            <WebView
                                ref={webViewRef}
                                source={{ uri: activeUrl }}
                                style={styles.webView}
                                startInLoadingState={true}
                                onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
                            />
                        )
                    )}
                </SafeAreaView>
            </Modal>
        </AppScreenLayout>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    listContent: {
        paddingBottom: scale(90),
    },
    listWrapper: {
        flex: 1,
    },
    bottomBlur: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: scale(80),
    },
    headerWrapper: {
        marginBottom: scale(12),
        marginTop: scale(10),
    },
    iconWrapper: {
        borderRadius: scale(6),
        backgroundColor: Colors.formBackground,
        padding: scale(8),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    articleContainer: {
        marginTop: scale(15),
        paddingHorizontal: scale(20),
        flexDirection: "row",
        flexWrap: "wrap",
        gap: scale(10),
    },
    articleItem: {
        marginTop: scale(6),
        paddingVertical: scale(8),
        paddingHorizontal: scale(4),
        borderRadius: scale(8),
        alignItems: "center",
        justifyContent: "center",
    },
    separator: {
        height: scale(17),
    },
    webViewSafeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    webViewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    webViewHeaderTitle: {
        fontSize: scale(16),
        fontFamily: Family.FG_Medium,
        color: Colors.textDark,
        flex: 1,
        textAlign: 'center',
    },
    webView: {
        flex: 1,
    }

});