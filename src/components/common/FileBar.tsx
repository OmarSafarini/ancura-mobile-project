import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from '@/utils/responsive';

interface FileBarProps {
  title: string;
  icon?: React.ReactNode;
}
export default function FileBar({ title ,icon}: FileBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1}>{title}</Text>
      {icon&&icon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
    gap: scale(10),
    width: scale(272),
    height: scale(23),
    backgroundColor: '#F5F5F5',
    borderWidth: 0.4,
    borderColor: '#6d7eb5f8',
    borderRadius: scale(11),
  },
  text: {
    flex: 1,
    fontSize: scale(10),
    fontWeight: '400',
    lineHeight: scale(11),
    color: '#000000',
  },
});


