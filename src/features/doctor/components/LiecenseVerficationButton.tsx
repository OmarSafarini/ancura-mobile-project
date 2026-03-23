import { View, Text, StyleSheet, useWindowDimensions,} from 'react-native';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { Family } from '@/utils/typography'; 

const HEIGHT = 45;
const THUMB_SIZE = 30;
const PADDING = 10;
const MAX_WIDTH = 245; // in the future we can send this elements in the props 

export default function LicenseVerificationButton() {
  const { width: screenWidth } = useWindowDimensions();
  const buttonWidth = Math.min(screenWidth * 0.8, MAX_WIDTH);

  return (
    <View style={[styles.container, { width: buttonWidth }]}>
      <Text style={styles.text}>Verify License Information</Text>

      <View style={styles.thumb}>
        <ArrowRightIcon color="white" size={THUMB_SIZE * 0.5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  text: {
    position: 'absolute',
    left: 35,
    color: '#08070E',
    fontSize: 14,
    fontFamily: Family.FG_Medium,
  },
  thumb: {
    position: 'absolute',
    right: PADDING,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#8EB392',
    justifyContent: 'center',
    alignItems: 'center',
  },
});