import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Animated, Modal, SafeAreaView, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import DocumentIcon from "@/assets/icons/DoucmentIcon";
import AppBackground from "@/components/base/AppBackground";
import Article from "@/features/patient/components/Article";
import SelfHelpResource from "@/components/common/SelfHelpResource";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import { useNavigation } from "@react-navigation/native";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";

const ARTICLE_CATEGORIES = ["Articles", "Exercises"];

const RESOURCES = [
    { id: "1", title: "Breathing Exercises (UC Berkeley)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://uhs.berkeley.edu/sites/default/files/breathing_exercises_0.pdf" },
    { id: "2", title: "Deep Breathing Exercises (Mercy Medical)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://www.mercycare.org/app/files/public/59045330-91c8-4b49-b72e-636e726f75dc/5Deep%20breathing%20exercises.pdf" },
    { id: "3", title: "Two Breathing Techniques (USU Extension)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://extension.usu.edu/mentalhealth/articles/two-breathing-techniques.pdf" },
    { id: "4", title: "Breathing and Health (UW Integrative)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://www.fammed.wisc.edu/files/webfm-uploads/documents/outreach/im/handout-BreathingAndHealth-Final.pdf" },
    { id: "5", title: "Stress-Busting Breathing (APTA)", tag: "Static Reading", tagColor: Colors.primary, bgTagColor: `${Colors.primaryLight}50`, Icon: DocumentIcon, url: "https://www.apta.org/contentassets/e7601c54ab3e42ba9acf2ad1ee3b9279/aptahyperice_take-a-breather-with-these-stress-busting-exercises.pdf" },

    { id: "6", title: "Cleveland Clinic: Five-Finger Breathing", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=oeeWEtiAseA" },
    { id: "7", title: "Cleveland Clinic: Breathwork for Beginners", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=J7JKQA-F2dg" },
    { id: "8", title: "City of Hope: 15-Minute Deep Breathing", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=F28MGLlpP90" },
    { id: "9", title: "Nicklaus Children’s: 5-Min Mindful Breathing", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=he-tQOnDCWw" },
    { id: "10", title: "UW Medicine: Guided Breathing for Stress", tag: "Youtube video", tagColor: Colors.darkPink, bgTagColor: `${Colors.pink}50`, Icon: YoutubeIcon, url: "https://www.youtube.com/watch?v=Mn4kUw5uXQU" },
];

export function BaseKnowledge() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [activeUrl, setActiveUrl] = useState<string | null>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const webViewRef = useRef<WebView>(null);
    const navigation = useNavigation();

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
            <View style={styles.header}>
                <Text style={styles.title}>Self-Help & Resources</Text>
                <Pressable style={styles.iconWrapper} onPress={handleBackPress}>
                    <ArrowLeftIcon 
                        color={Colors.textDark2} 
                        size={scale(18)} 
                        onPress={handleBackPress}
                    />
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
        <AppBackground variant="clean" style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <FlatList
                    data={filteredResources}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={({ item }) => (
                        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
                            <SelfHelpResource 
                                title={item.title} 
                                tag={item.tag} 
                                tagColor={item.tagColor}
                                bgTagColor={item.bgTagColor} 
                                Icon={item.Icon}
                                onPress={() => handleResourcePress(item)}
                            />
                        </Animated.View>
                    )}
                />
            </SafeAreaView>

            <Modal
                visible={activeUrl !== null}
                animationType="slide"
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
                        <WebView
                            ref={webViewRef}
                            source={{ uri: activeUrl }}
                            style={styles.webView}
                            startInLoadingState={true}
                            onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
                        />
                    )}
                </SafeAreaView>
            </Modal>
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
    listContent: {
        paddingBottom: scale(40),
        paddingHorizontal: scale(51),
    },
    headerWrapper: {
        marginHorizontal: -scale(51),
        marginBottom: scale(25),
        marginTop: scale(10),
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
        // Added shadow for visibility against white backgrounds
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