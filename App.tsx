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

export default function App() {
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>

        <DoctorProvider>

          <NavigationContainer>

            <RootNavigator />
            
          </NavigationContainer>

        </DoctorProvider>

        <FlashMessage position="top" />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
