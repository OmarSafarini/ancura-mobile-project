import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from '@/utils/responsive';
import ExitIcon from '@/assets/icons/ExitIcon';
import { Family } from '@/utils/typography';

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
    width: '100%',
    height: scale(49),
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: scale(11),
    gap: scale(18),
  },
  text: {
    fontFamily: Family.FG_Medium,
    fontSize: scale(16),
    color: '#FF0000',
  },
});

export default LogoutButton;
