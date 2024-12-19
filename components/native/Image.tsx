import { Image as RNImage } from 'expo-image';
import { cssInterop } from 'nativewind';

const Image = cssInterop(RNImage, {
  className: 'style',
});

export default Image;
