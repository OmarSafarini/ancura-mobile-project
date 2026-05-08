import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({ text = "Loading...", fullScreen = true }: LoadingProps) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size="large" color="#4F46E5" />
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});