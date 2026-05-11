import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FileIcon from "../../assets/icons/FileIcon";
import { scale } from "@/utils/responsive";

interface SelfHelpResourceProps {
    Icon:any
    title: string;
    tag: string;
    tagColor?: string;
    bgTagColor?: string;
    onPress?: () => void;
}

export default function SelfHelpResource({ title, tag, tagColor, bgTagColor, Icon, onPress }: SelfHelpResourceProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={[styles.iconBackground,{backgroundColor:bgTagColor}]}>
                {Icon ? <Icon size={scale(40)} color={tagColor} /> : <FileIcon size={scale(40)} color={tagColor} />}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <View style={[styles.tagBadge,{backgroundColor:bgTagColor}]}>
                    <Text style={[styles.tagText,{color:tagColor}]}>{tag}</Text>
                </View>
            </View>
            <View style={styles.arrowContainer}>
                <View style={[styles.arrowCircle,{backgroundColor:bgTagColor}]}>
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
        width: scale(327),
        height: scale(100.75),
        borderRadius: scale(30),
        paddingHorizontal: scale(17),
        elevation: 4,
        shadowColor: "rgba(0, 0, 0, 0.04)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    iconBackground: {
        width: scale(74),
        height: scale(74),
        borderRadius: scale(14),
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        marginLeft: scale(21),
        justifyContent: "center",
        gap: scale(7),
    },
    title: {
        width: scale(167),
        fontSize: scale(15),
        fontWeight: "400",
        color: "#000000",
        lineHeight: scale(16),
    },
    tagBadge: {
        alignSelf: "flex-start",
        height: scale(20),
        backgroundColor: "rgba(182, 210, 249, 0.5)",
        borderRadius: scale(4),
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: scale(8),
    },
    tagText: {
        fontSize: scale(10),
        fontWeight: "400",
        color: "#6D93B5",
        lineHeight: scale(11),
    },
    arrowContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    arrowCircle: {
        width: scale(29),
        height: scale(29),
        borderRadius: scale(14.5),
        backgroundColor: "#DBE8FC",
        justifyContent: "center",
        alignItems: "center",
    },
    arrow: {
        width: scale(8),
        height: scale(8),
        borderTopWidth: scale(1.5),
        borderRightWidth: scale(1.5),
        borderColor: "#000000",
        transform: [{ rotate: "45deg" }],
        marginLeft: scale(-2),
    },
});
