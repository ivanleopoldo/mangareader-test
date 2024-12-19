import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { MangaService } from '~/api/service/manga';
import { BookCard } from '~/components/book';
import SearchInput from '~/components/search-input';
import { MangaDetails } from '~/lib/models';

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

  const renderItem = useCallback(
    ({ item, index }: { item: MangaDetails; index: number }) => (
      <BookCard data={item} className="p-2" />
    ),
    []
  );

  const numColumns = 2;

  return (
    <View className="flex w-full gap-4 p-4">
      <SearchInput callback={(value?: string) => setSearch(value)} />
      {isLoading && <Text className="bg-blue-500 text-red-500">Loading</Text>}
      <View className="h-full">
        <FlashList
          showsVerticalScrollIndicator={false}
          numColumns={numColumns}
          estimatedItemSize={58}
          data={data?.pages.map((page) => page?.results ?? []).flat()}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.8}
        />
      </View>
    </View>
  );
}
