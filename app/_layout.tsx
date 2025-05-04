import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SafeAreaView } from 'react-native';


const queryClient = new QueryClient();

export default function RootLayout() {


  const [loaded] = useFonts({
    Regular: require('../assets/fonts/RobotoCondensed-Regular.ttf'),
    Medium: require('../assets/fonts/RobotoCondensed-Medium.ttf'),
    Light: require('../assets/fonts/RobotoCondensed-Light.ttf'),
    Bold: require('../assets/fonts/RobotoCondensed-Bold.ttf'),
    ExtraBold: require('../assets/fonts/RobotoCondensed-ExtraBold.ttf'),
    SemiBold: require('../assets/fonts/RobotoCondensed-SemiBold.ttf'),
  });


  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="protected" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
