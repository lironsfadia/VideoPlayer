import React, { useEffect } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Stack, useRouter, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Button, ButtonIcon } from '@/components/ui/button';
import { MaterialIcons } from '@expo/vector-icons';
import '@/global.css';
import 'react-native-reanimated';
import Orientation from 'react-native-orientation-locker';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const TabsHomeArrowButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isTabsHome = pathname === '/(tabs)' || pathname === '/(tabs)/index';

  if (isTabsHome) {
    return null;
  }

  return (
    <Button onPress={() => router.push('/(tabs)')} variant="ghost" size="sm">
      <ButtonIcon as={MaterialIcons} name="arrow-back" color="white" />
    </Button>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    // Lock the orientation to landscape for both iOS and Android
    Orientation.lockToLandscape();

    return () => {
      // Unlock the orientation when the component unmounts
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerLeft: () => <TabsHomeArrowButton />,
            headerStyle: {
              backgroundColor: '#3b82f6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="+not-found"
            options={{
              title: 'Oops!',
            }}
          />
          {/* Add other screens here */}
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
