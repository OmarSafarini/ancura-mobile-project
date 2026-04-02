import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EntryScreen from './src/features/auth/EntryScreen';
import RoleSelectionScreen from './src/features/auth/RoleSelectionScreen';
export default function App() {
  return (
    <View>
        <RoleSelectionScreen />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});