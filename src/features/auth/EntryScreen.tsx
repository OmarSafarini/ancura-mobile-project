import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppBackground from '../../components/layout/AppBackground';
import LogoOverlay from '../../assets/icons/LogoOverlay';
import SlideButton from '../../components/common/SlideButton';
import { scale } from '../../utils/responsive';

export default function EntryScreen({ navigation }: any) {
  const handleSlideComplete = () => {
    // Navigate to the next screen, for example Login or Auth Selection
    if (navigation && typeof navigation.navigate === 'function') {
      // navigation.navigate('NextScreen');
    }
  };

      console.log(scale(135))


  return (    
    <AppBackground variant="texture" style={{width: scale(430), height: scale(932)}}>
      <View style={styles.container}>
        <LogoOverlay size={150} opacity={1} />
        
        <View style={styles.buttonContainer}>
          <SlideButton 
            onSlideComplete={handleSlideComplete} 
            label="Let's Go" 
          />
        </View>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: scale(30),
    width: '100%',
    alignItems: 'center',
  },
});
