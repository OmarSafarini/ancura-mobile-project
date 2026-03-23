import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface ToggleButtonProps {
  Icon: any;
  title: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  onPress?: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ title, Icon, bgColor, textColor, borderColor, onPress }) => {
  const activeColor = textColor || '#6D7EB5';
  const activeBgColor = bgColor || '#FFFFFF';
  const activeBorderColor = borderColor || bgColor;


  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: activeBgColor, borderColor: activeBorderColor }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon color={activeColor} />
          </View>
        )}
        <Text style={[styles.text, { color: activeColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
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
