import { useFonts } from 'expo-font';

export const useAppFonts = () => {
  const [fontsLoaded] = useFonts({
    'FoundersGrotesk-Bold': require('../assets/fonts/FoundersGrotesk-Bold.otf'),
    'FoundersGrotesk-BoldItalic': require('../assets/fonts/FoundersGrotesk-BoldItalic.otf'),
    'FoundersGrotesk-Light': require('../assets/fonts/FoundersGrotesk-Light.otf'),
    'FoundersGrotesk-LightItalic': require('../assets/fonts/FoundersGrotesk-LightItalic.otf'),
    'FoundersGrotesk-Medium': require('../assets/fonts/FoundersGrotesk-Medium.otf'),
    'FoundersGrotesk-MediumItalic': require('../assets/fonts/FoundersGrotesk-MediumItalic.otf'),
    'FoundersGrotesk-Regular': require('../assets/fonts/FoundersGrotesk-Regular.otf'),
    'FoundersGrotesk-RegularItalic': require('../assets/fonts/FoundersGrotesk-RegularItalic.otf'),
    'FoundersGrotesk-Semibold': require('../assets/fonts/FoundersGrotesk-Semibold.otf'),
    'FoundersGrotesk-SemiboldItalic': require('../assets/fonts/FoundersGrotesk-SemiboldItalic.otf'),
    'FoundersGroteskCond-Lt': require('../assets/fonts/FoundersGroteskCond-Lt.otf'),
    'FoundersGroteskXCond-Bold': require('../assets/fonts/FoundersGroteskXCond-Bold.otf'),
    'Helvetica-Bold': require('../assets/fonts/Helvetica-Bold.ttf'),
    'Helvetica': require('../assets/fonts/Helvetica.ttf'),
  });

  return { fontsLoaded };
};
