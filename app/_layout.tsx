import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Stack, useRouter, usePathname } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Button, ButtonIcon } from '@/components/ui/button';
import { MaterialIcons } from '@expo/vector-icons';
import '@/global.css';
import 'react-native-reanimated';

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
            orientation: 'landscape',
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
