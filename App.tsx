import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CaseCard from './src/components/common/CaseCard';
import ViewMoreStatistics from './src/features/doctor/components/ViewMoreStatistics';
import ActivityLogButton from './src/features/doctor/components/ActivityLogButton';
export default function App() {
  return (
    <View>
        <ActivityLogButton />
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