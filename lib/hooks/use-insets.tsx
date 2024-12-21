import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets, EdgeInsets } from 'react-native-safe-area-context';
import { produce } from 'immer';

type TInsets = EdgeInsets;

function useInsets(): TInsets {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight() + insets.bottom;

  return produce(insets, (draft) => {
    draft.bottom = tabBarHeight;
  });
}

export default useInsets;
