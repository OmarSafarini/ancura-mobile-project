import React from "react";
import { View, Text, StyleSheet, Pressable} from "react-native";
import { scale } from "@/utils/responsive";

export default function SelectUserType({ Icon, title, userType, onPress }: any) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.container, { backgroundColor: pressed ? "#B6C0F94D" : "#fff"}]}>
            <View style={styles.iconContainer}>
                <Icon></Icon>
            </View>
            <View style={styles.texts}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.userType}>{userType}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: scale(147),
        paddingLeft: scale(30),
        gap: scale(22),
        width: "100%",
        maxWidth: scale(370),
        height: scale(114),
        borderWidth: 1,
        borderColor: "#7B7C8F",
        borderRadius: 30,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: scale(68),
        height: scale(68),
        backgroundColor: "#B6C0F9",
        borderRadius: scale(34),
    },
    texts: {
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        fontSize: scale(24),
        color: "#08070E",
        marginBottom: 4,
    },
    userType: {
        fontSize: scale(14),
        color: "#7B7C8F",
    }
});
