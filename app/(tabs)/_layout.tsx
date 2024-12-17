import { Tabs } from 'expo-router';
import { useColorScheme } from '~/lib/useColorScheme';

import Icon from '~/lib/icons/Icon';
import { NAV_THEME } from '~/lib/constants';
import ThemeToggle from '~/components/ThemeToggle';

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
          tabBarIcon: ({ color }) => <Icon name="Library" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <Icon name="Compass" color={color} />,
        }}
      />
    </Tabs>
  );
}
