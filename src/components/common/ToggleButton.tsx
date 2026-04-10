import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { scale } from '@/utils/responsive';

interface ToggleButtonProps {
  Icon: any;
  title: string;
  bgColor?: string;
  textColor?: string;
  onPress?: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ title, Icon, bgColor = '#ffffff01', textColor = '#6D7EB5', onPress }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container, 
        { 
          backgroundColor: pressed ? textColor : bgColor, 
          borderColor: pressed ? bgColor : textColor,
        }
      ]} 
      onPress={onPress}
    >
      {({ pressed }) => {
        const activeColor = pressed ? "#FFFFFF" : textColor;
        return (
          <View style={styles.content}>
            {Icon && (
              <View style={styles.iconContainer}>
                <Icon color={activeColor} />
              </View>
            )}
            <Text style={[styles.text, { color: activeColor }]}>{title}</Text>
          </View>
        );
      }}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(120),
    height: scale(25),
    borderWidth: scale(0.8),
    borderColor: '#6D7EB5',
    borderRadius: scale(11),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: scale(6),
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: scale(10),
  },
});

export default ToggleButton;
