import { useImage } from 'expo-image';
import { Link } from 'expo-router';
import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Image from '~/components/native/Image';
import { MangaDetails } from '~/lib/models';
import { cn } from '~/lib/utils';

function BookCard({ className, data }: { className?: string; data: MangaDetails | undefined }) {
  const image = useImage(data?.cover ?? '', {});

  return (
    <Link
      push
      href={{
        pathname: '/manga/[id]',
        params: { ...(data as MangaDetails) },
      }}
      className={cn(className, 'flex-1 gap-1')}
      asChild>
      <Pressable>
        <Image
          contentFit="fill"
          className="rounded"
          source={image}
          style={{
            aspectRatio: 3 / 4,
          }}
        />
        <View>
          <Text className="text-foreground">{data?.title}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

export default memo(BookCard);
