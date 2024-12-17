import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { MangaService } from '~/api/service/manga';
import SearchInput from '~/components/search-input';
import { BookCard } from '~/components/book';

export default function Home() {
  const [search, setSearch] = useState<string | null | undefined>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['search', search],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      try {
        const res = await MangaService.searchManga(search ?? '', pageParam);
        return res;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    enabled: !!search,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.next !== null) {
        return lastPage?.next;
      }
    },
  });

  return (
    <View className="flex h-full p-4 ">
      <SearchInput callback={(value?: string) => setSearch(value)} />
      {isLoading && <Text className="bg-blue-500 text-red-500">Loading</Text>}
      <FlatList
        key="_"
        numColumns={2}
        keyExtractor={(item) => item?.id ?? ''}
        contentContainerClassName="flex w-full gap-2"
        data={data?.pages.map((page) => page?.results).flat()}
        renderItem={({ item }) => (
          <BookCard item={item} />
          // <Text className="flex-1 text-wrap bg-muted py-20">{item?.title}</Text>
        )}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={2}
      />
    </View>
  );
}
