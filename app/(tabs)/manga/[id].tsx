import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { MangaService } from '~/api/service/manga';
import { MangaDetails } from '~/lib/models';
import Image from '~/components/native/Image';

export default function Manga() {
  const params = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ['manga', params.id],
    queryFn: async () => {
      const res = await MangaService.getManga(params?.url.toString(), params as MangaDetails);
      return res;
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View>
      <Image
        className="h-20 w-20"
        source={{
          uri: params.cover,
          cacheKey: params.id,
        }}
        cachePolicy={'memory-disk'}
      />
      <Text className="text-foreground">{data?.details.title}</Text>
      <Text className="text-foregroun:">{data?.details.summary}</Text>
    </View>
  );
}
