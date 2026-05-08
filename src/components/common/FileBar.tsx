import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from '@/utils/responsive';
import FileIcon from '@/assets/icons/FileIcon';
import { Family } from '@/utils/typography';

interface FileBarProps {
  title: string;
  icon?: React.ReactNode;
}
export default function FileBar({ title ,icon}: FileBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <FileIcon size={(18)} />
        <Text style={styles.text} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.iconContainer}>{icon && icon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    height: scale(44),
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#6d7eb533',
    borderRadius: scale(8),
    marginVertical: scale(2),
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  text: {
    flex: 1,
    fontSize: scale(12),
    fontWeight: '400',
    color: '#333333',
    fontFamily: Family.FG_Regular,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


