import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, palette } from '../../utils/colors';
import { Family } from '../../utils/typography';
import { scale } from '../../utils/responsive';

export default function HIPAAFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This is a secure, HIPAA-compliant platform for licensed mental health professionals only.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(20),
  },
  text: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(11),
    color: palette.darkGray,
    textAlign: 'center',
    lineHeight: scale(14),
  },
});
