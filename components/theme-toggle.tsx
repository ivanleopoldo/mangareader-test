import React from 'react';
import { useColorScheme } from '~/lib/useColorScheme';
import Icon from '~/lib/icons/Icon';
import { Button } from './ui/button';
import { cn } from '~/lib/utils';

export default function ThemeToggle({ className }: { className?: string }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Button variant={'ghost'} size={'icon'} onPress={toggleColorScheme}>
      <Icon name={colorScheme === 'dark' ? 'Sun' : 'MoonStar'} className={className} />
    </Button>
  );
}
