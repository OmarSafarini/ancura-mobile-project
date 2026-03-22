import React from "react";
import { View, Text, StyleSheet, Pressable} from "react-native";

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
        paddingRight: 147,
        paddingLeft: 30,
        gap: 22,
        width: "100%",
        maxWidth: 370,
        height: 114,
        borderWidth: 1,
        borderColor: "#7B7C8F",
        borderRadius: 30,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 68,
        height: 68,
        backgroundColor: "#B6C0F9",
        borderRadius: 34,
    },
    texts: {
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        color: "#08070E",
        marginBottom: 4,
    },
    userType: {
        fontSize: 14,
        color: "#7B7C8F",
    }
});
