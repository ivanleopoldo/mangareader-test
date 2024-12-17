import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { MangaService } from '~/api/service/manga';

export default function Manga() {
  const params = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ['manga', params.id],
    queryFn: async () => {
      const res = await MangaService.getManga(params?.url.toString());
      return res;
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{params?.title}</Text>
      <Text>{data?.summary}</Text>
    </View>
  );
}
