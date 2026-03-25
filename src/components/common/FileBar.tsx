import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FileIcon from '../../assets/icons/FileIcon';

interface FileBarProps {
  title: string;
  icon?: React.ReactNode;
}
export const FileBar: React.FC<FileBarProps> = ({ title ,icon}) => {
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
    paddingVertical: 6,
    paddingHorizontal: 16,
    gap: 10,
    width: 272,
    height: 23,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.4,
    borderColor: '#6d7eb5f8',
    borderRadius: 11,
  },
  text: {
    flex: 1,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 11,
    color: '#000000',
  },
});


