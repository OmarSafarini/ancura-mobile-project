import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Notification } from './src/features/patient/screens/Notification';

export default function App() {
  return (
    <View style={styles.container}>
        <Notification />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});