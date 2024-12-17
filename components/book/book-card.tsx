import React from 'react';
import { Text, View } from 'react-native';
import { SearchResult } from '~/lib/models';

export default function BookCard({ item }: { item: SearchResult | undefined }) {
  return (
    <View>
      <Text>{item?.title}</Text>
    </View>
  );
}
