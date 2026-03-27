import React from "react";
import {Text, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "@/utils/responsive";

export default function NormalButton({ title, onPress, bgColor, textColor }: any) {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.container, bgColor ? { backgroundColor: bgColor } : {backgroundColor: "#6D7EB5"}]}
        >
            <Text style={[styles.title, textColor ? { color: textColor } : {color: "#FFFFFF"}]}> {title ? title : "There is no title"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: scale(370),
        height: scale(50),
        borderRadius: scale(8),
    },
    title: {
        fontWeight: "500",
        fontSize: scale(16),
        textAlign: "center",
    },
});