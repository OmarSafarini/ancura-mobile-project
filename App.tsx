import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { useAppFonts } from './src/utils/useAppFonts';
import RootNavigator from './src/layout/RootNavigator';
import DoctorDashboardAndCases from '@/features/doctor/screens/DashboardAndCasesScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,    
      gcTime: 10 * 60 * 1000,      
    },
  },
});

export default function App() {
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />         
      </NavigationContainer>

      <FlashMessage position="top" />
    </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
