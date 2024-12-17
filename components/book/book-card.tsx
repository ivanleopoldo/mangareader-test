import { Link } from 'expo-router';
import { Image, ImageProps, Pressable, Text, View } from 'react-native';
import { SearchResult } from '~/lib/models';
import { cn } from '~/lib/utils';

function BookCard({
  className,
  data,
  ...imageProps
}: { className?: string; data: SearchResult | undefined } & ImageProps) {
  return (
    <Link
      push
      href={{
        pathname: '/manga/[id]',
        params: { id: data?.id ?? '', ...data },
      }}
      className={cn(className, 'flex-1 gap-1')}
      asChild>
      <Pressable>
        <Image
          className="rounded"
          source={{
            uri: data?.cover,
          }}
          {...imageProps}
        />
        <View>
          <Text className="text-foreground">{data?.title}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

export default BookCard;
