import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
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

  const spacing = 4;
  const numColumns = 2;

  const { width } = Dimensions.get('window');
  const columnWidth = (width - spacing * (numColumns + 1)) / numColumns;

  return (
    <View className="flex gap-4 p-4">
      <SearchInput callback={(value?: string) => setSearch(value)} />
      {isLoading && <Text className="bg-blue-500 text-red-500">Loading</Text>}
      <FlatList
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item?.id ?? ''}
        contentContainerClassName="flex gap-3"
        columnWrapperClassName="gap-3"
        data={data?.pages.map((page) => page?.results).flat()}
        renderItem={({ item }) => (
          <BookCard
            key={item?.id}
            data={item}
            width={undefined}
            height={321 * (columnWidth / 225)}
          />
        )}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={2}
      />
    </View>
  );
}
