import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { useAppFonts } from './src/utils/useAppFonts';
import RootNavigator from './src/layout/RootNavigator';
import DoctorDashboardAndCases from '@/features/doctor/screens/DashboardAndCasesScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 2. إنشاء QueryClient مرة واحدة خارج الكومبوننت
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,    // 5 دقائق
      gcTime: 10 * 60 * 1000,      // 10 دقائق (كان يسمى cacheTime)
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
        <RootNavigator />          {/* ننصح نرجع RootNavigator لاحقاً
        {/* <DoctorDashboardAndCases /> */}
      </NavigationContainer>

      <FlashMessage position="top" />

      {/* DevTools - فقط أثناء التطوير (سيتم تجاهله في الـ Production) */}
      <ReactQueryDevtools initialIsOpen={false} />
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
