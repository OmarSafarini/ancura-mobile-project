import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EntryScreen from './src/features/auth/EntryScreen';
import RoleSelectionScreen from './src/features/auth/RoleSelectionScreen';
import SelfHelpResource from '@/components/common/SelfHelpResource';
import FileIcon from '@/assets/icons/FileIcon';
import { scale } from '@/utils/responsive';
import { useAppFonts } from '@/utils/useAppFonts';
export default function App() {
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Text>tiuytyiuyt</Text>
        <SelfHelpResource title={'Breathing Exercises for Stress Relief'} tag={'YouTube Video'} tagColor={'#D88787'} bgTagColor={'#FCDBDB'} Icon={FileIcon} onPress={()=>{}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});