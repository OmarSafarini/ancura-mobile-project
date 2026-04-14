import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import { scale } from '../../utils/responsive';
import { Family } from '../../utils/typography';

interface AuthOTPInputProps {
  length?: number;
  onCodeFilled?: (code: string) => void;
}

export default function AuthOTPInput({ length = 8, onCodeFilled }: AuthOTPInputProps) {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1);
    }
    
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== '' && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.length === length && newCode.every((c) => c !== '')) {
      if (onCodeFilled) onCodeFilled(newCode.join(''));
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }: any, index: number) => {
    if (key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputs.current[index] = ref; }}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          selectTextOnFocus
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
    marginVertical: scale(20),
    width: "100%",
  },
  input: {
    width: scale(38),
    height: scale(45),
    borderRadius: scale(10),
    borderWidth: scale(1.5),
    borderColor: Colors.primary,
    textAlign: 'center',
    fontSize: scale(20),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
    backgroundColor: Colors.formBackground,
  },
});
