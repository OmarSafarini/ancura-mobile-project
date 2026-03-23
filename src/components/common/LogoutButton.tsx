import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ExitIcon from '../../assets/icons/ExitIcon';

interface LogoutButtonProps {
  onPress?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ExitIcon size={16} color="#FF0000" />
      <Text style={styles.text}>Log out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 370,
    height: 49,
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 11,
    gap: 18,
  },
  text: {
    fontFamily: 'Founders Grotesk',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    color: '#FF0000',
  },
});

export default LogoutButton;
