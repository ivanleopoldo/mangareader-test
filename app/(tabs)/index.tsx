import { useInfiniteQuery } from '@tanstack/react-query';
import { View, TextInput } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import Icon from '~/lib/icons/Icon';
import { searchManga } from '~/utils/scraper';
import { useRef, useState } from 'react';

export default function Home() {
  const [value, onChangeText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const onSubmit = async () => {
    const res = await searchManga(value.toLowerCase().replace(' ', '_'));
    console.log(JSON.stringify(res, null, 2));
  };

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['search'],
    queryFn: async () => {},
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // if (lastPage.length === 0) {
      //   return undefined;
      // }
      return lastPageParam + 1;
    },
  });

  return (
    <View className="flex h-full p-4 ">
      <View className="flex flex-row justify-center">
        <Input
          className="flex-1 rounded-r-none"
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          onChangeText={onChangeText}
          placeholder="Search..."
          ref={inputRef}
        />
        <Button onPress={onSubmit} className="w-12 rounded-l-none bg-muted-foreground">
          <Icon className="text-background" name="Search" />
        </Button>
      </View>
    </View>
  );
}
