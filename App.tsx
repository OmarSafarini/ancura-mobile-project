import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ActivityLogButton from './src/features/doctor/components/ActivityLogButton';
export default function App() {
  return (
    <View>
        <FileBar title="Clinical Psychology License - California Board" />
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