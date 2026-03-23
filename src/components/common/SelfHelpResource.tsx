import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FileIcon from "../../assets/icons/FileIcon";

interface SelfHelpResourceProps {
    title: string;
    tag: string;
    onPress?: () => void;
}

export default function SelfHelpResource({ title, tag, onPress }: SelfHelpResourceProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.iconBackground}>
                <FileIcon size={40} color="#6D93B5" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <View style={styles.tagBadge}>
                    <Text style={styles.tagText}>{tag}</Text>
                </View>
            </View>
            <View style={styles.arrowContainer}>
                <View style={styles.arrowCircle}>
                    <View style={styles.arrow} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        width: 327,
        height: 100.75,
        borderRadius: 30,
        paddingHorizontal: 17,
        elevation: 4,
        shadowColor: "rgba(0, 0, 0, 0.04)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    iconBackground: {
        width: 74,
        height: 74,
        backgroundColor: "rgba(182, 210, 249, 0.5)",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        marginLeft: 21,
        justifyContent: "center",
        gap: 7,
    },
    title: {
        width: 167,
        fontSize: 15,
        fontWeight: "400",
        color: "#000000",
        lineHeight: 16,
    },
    tagBadge: {
        width: 63.53,
        height: 18,
        backgroundColor: "rgba(182, 210, 249, 0.5)",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    tagText: {
        fontSize: 10,
        fontWeight: "400",
        color: "#6D93B5",
        lineHeight: 11,
    },
    arrowContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    arrowCircle: {
        width: 29,
        height: 29,
        borderRadius: 14.5,
        backgroundColor: "#DBE8FC",
        justifyContent: "center",
        alignItems: "center",
    },
    arrow: {
        width: 8,
        height: 8,
        borderTopWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: "#000000",
        transform: [{ rotate: "45deg" }],
        marginLeft: -2,
    },
});
