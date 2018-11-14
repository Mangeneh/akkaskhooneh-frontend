import { StyleSheet } from 'react-native';
import { Colors, Graphics } from '../config';

export const textBoxStyle = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: Graphics.BOX_RADIUS,
    elevation: Graphics.BOX_ELEVATION,
  },
  input: {
    textAlign: 'center',
    fontSize: Graphics.TEXT_BOX_FONT_SIZE,
  },
  icon: { color: Colors.ICON },
});
