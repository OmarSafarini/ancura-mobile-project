import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from '@/utils/responsive';
import FileIcon from '@/assets/icons/FileIcon';

interface FileBarProps {
  title: string;
  icon?: React.ReactNode;
}
export default function FileBar({ title ,icon}: FileBarProps) {
  return (
    <View style={styles.container}>
      <FileIcon size={(10)} />
      <Text style={styles.text} numberOfLines={1}>{title}</Text>
      <View style={styles.iconContainer}>{icon && icon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(4),
    paddingLeft: scale(16),
    paddingRight: scale(6),
    gap: scale(10),
    flex: 1,
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
  iconContainer: {
    alignSelf: 'flex-end',
  },
});


