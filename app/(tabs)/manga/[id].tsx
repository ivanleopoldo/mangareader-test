import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { MangaService } from '~/api/service/manga';
import { MangaDetails } from '~/lib/models';
import { Image } from 'expo-image';

export default function Manga() {
  const params = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ['manga', params.id],
    queryFn: async () => {
      const res = await MangaService.getManga(params?.url.toString(), params as MangaDetails);
      return res;
    },
  });

  console.log(data);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <Image
        contentFit="fill"
        className="rounded"
        source={{
          uri: params.cover,
          aspectRatio: 3 / 4,
        }}
        cachePolicy={'memory-disk'}
      />
      <Text className="text-foreground">{data?.details.title}</Text>
      <Text className="text-foregroun:">{data?.details.summary}</Text>
    </ScrollView>
  );
}
