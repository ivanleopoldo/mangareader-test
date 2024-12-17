import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View className="flex h-full items-center justify-center">
        <Text className="text-foreground">Tab 2</Text>
      </View>
    </>
  );
}
