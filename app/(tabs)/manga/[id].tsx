import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Manga() {
  const params = useLocalSearchParams();
  return (
    <View>
      <Text>{JSON.stringify(params, null, 2)}</Text>
    </View>
  );
}
