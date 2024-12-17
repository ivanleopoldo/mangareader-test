import { Tabs } from 'expo-router';
import { useColorScheme } from '~/lib/useColorScheme';

import Icon from '~/lib/icons/Icon';
import { NAV_THEME } from '~/lib/constants';
import ThemeToggle from '~/components/theme-toggle';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { router } from 'expo-router';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: NAV_THEME[colorScheme].primary,
        tabBarStyle: {
          borderTopWidth: 1,
        },
        headerStyle: {
          borderBottomWidth: 1,
        },
        headerRight: () => <ThemeToggle />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Library',
          tabBarIcon: ({ focused }) => (
            <Icon name="Library" className={cn(focused ? 'text-foreground' : 'text-primary')} />
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ focused }) => (
            <Icon name="Compass" className={cn(focused ? 'text-foreground' : 'text-primary')} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ focused }) => (
            <Icon name="Settings" className={cn(focused ? 'text-foreground' : 'text-primary')} />
          ),
        }}
      />
      <Tabs.Screen
        name="manga/[id]"
        options={{
          headerLeft: () => (
            <Button onPress={() => router.back()} size={'icon'} variant={'ghost'}>
              <Icon name="ChevronLeft" />
            </Button>
          ),
          title: 'Manga',
          href: null,
        }}
      />
    </Tabs>
  );
}
