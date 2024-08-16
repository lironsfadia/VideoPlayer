import React from 'react';
import { View } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useFonts } from 'expo-font';
import { Stack, useRouter, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Button, ButtonIcon } from '@/components/ui/button';
import { MaterialIcons } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const TabsHomeArrowButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're already on the tabs home screen
  const isTabsHome = pathname === '/(tabs)' || pathname === '/(tabs)/index';

  if (isTabsHome) {
    return null; // Don't show the button on the tabs home screen
  }

  return (
    <Button onPress={() => router.push('/(tabs)')} variant="ghost" size="sm">
      <ButtonIcon as={MaterialIcons} name="arrow-back" color="white" />
    </Button>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerLeft: () => <TabsHomeArrowButton />,
            headerStyle: {
              backgroundColor: '#3b82f6', // bg-blue-500
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
