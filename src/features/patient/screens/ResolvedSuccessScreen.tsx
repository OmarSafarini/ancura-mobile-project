import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBackground from '../../../components/base/AppBackground';
import TickIcon from '../../../assets/icons/TickIcon';
import NormalButton from '../../../components/common/NormalButton';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import { palette, Colors } from '../../../utils/colors';
import { Family } from '../../../utils/typography';
import { scale } from '../../../utils/responsive';

interface ResolvedSuccessScreenProps {
  onBackToCases?: () => void;
}

export default function ResolvedSuccessScreen({ onBackToCases }: ResolvedSuccessScreenProps) {
  return (
    <AppBackground variant="logo">
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>

        <Pressable style={styles.exitButton} onPress={onBackToCases}>
          <ArrowLeftIcon size={scale(20)} color={palette.dark} />
        </Pressable>
        <View style={styles.centerContent}>
          <TickIcon size={scale(110)} />

          <View style={styles.titleBlock}>
            <Text style={styles.titleResolved}>Resolved</Text>
            <Text style={styles.titleSuccessfully}>Successfully</Text>
          </View>

          <Text style={styles.subtitle}>
            Great awareness! You've marked this case as resolved.
            Taking charge of your wellbeing is an important step — we're proud of you.
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <NormalButton
            title="Back to Cases"
            onPress={onBackToCases}
            bgColor={Colors.secondary}
          />
        </View>

      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: scale(24),
  },
  exitButton: {
    alignSelf: 'flex-end',
    width: scale(40),
    height: scale(40),
    backgroundColor: palette.white,
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(8),
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBlock: {
    alignItems: 'center',
    marginTop: scale(28),
    marginBottom: scale(20),
  },
  titleResolved: {
    fontFamily: Family.FG_Bold,
    fontSize: scale(34),
    color: palette.dark,
    letterSpacing: 0.3,
  },
  titleSuccessfully: {
    fontFamily: Family.FG_BoldItalic,
    fontSize: scale(34),
    color: palette.darkGreen,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(13),
    color: palette.darkGray,
    textAlign: 'center',
    lineHeight: scale(20),
    paddingHorizontal: scale(10),
  },
  buttonWrapper: {
    paddingBottom: scale(16),
  },
});
