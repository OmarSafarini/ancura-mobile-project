import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { useAppFonts } from "./src/utils/useAppFonts";
import RootNavigator from "./src/layout/RootNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DoctorProvider } from "@/Context/DoctorContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

import { WebMockupWrapper } from "./src/layout/WebMockupWrapper";
import { Platform } from 'react-native';
import { enableMocks } from './src/mocks/browser';

if (Platform.OS === 'web') {
  enableMocks();
}

export default function App() {
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <WebMockupWrapper>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>

          <FlashMessage position="top" />
        </QueryClientProvider>
      </SafeAreaProvider>
    </WebMockupWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
