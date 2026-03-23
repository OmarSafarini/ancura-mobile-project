import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

interface ToggleButtonProps {
  Icon: any;
  title: string;
  bgColor?: string;
  textColor?: string;
  onPress?: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ title, Icon, bgColor = '#FFFFFF', textColor = '#6D7EB5', onPress }) => {
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
        const activeColor = pressed ? bgColor : textColor;
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
    width: 120,
    height: 25,
    borderWidth: 0.8,
    borderColor: '#6D7EB5',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 6,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10,
  },
});

export default ToggleButton;
