import { Image, ImageProps, Text, View } from 'react-native';
import { SearchResult } from '~/lib/models';
import { cn } from '~/lib/utils';

function BookCard({
  className,
  data,
  ...imageProps
}: { className?: string; data: SearchResult | undefined } & ImageProps) {
  return (
    <View className={cn(className, 'flex-1 gap-1')}>
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
    </View>
  );
}

export default BookCard;
