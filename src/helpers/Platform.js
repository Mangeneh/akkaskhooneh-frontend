import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

export const PlatformSpecificResizeMode = () => (Platform.OS === 'ios' ? FastImage.resizeMode.contain : FastImage.resizeMode.center);
