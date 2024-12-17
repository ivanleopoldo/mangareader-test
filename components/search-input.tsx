import { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import Icon from '~/lib/icons/Icon';

export default function SearchInput({
  callback = () => {},
}: {
  callback?: (value?: string) => void;
}) {
  const [value, onChangeText] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  return (
    <View className="flex flex-row justify-center">
      <Input
        className="flex-1 rounded-r-none"
        returnKeyType="search"
        onSubmitEditing={() => callback(value)}
        onChangeText={onChangeText}
        placeholder="Search..."
        ref={inputRef}
      />
      <Button onPress={() => callback(value)} className="w-12 rounded-l-none bg-muted-foreground">
        <Icon className="text-background" name="Search" />
      </Button>
    </View>
  );
}
