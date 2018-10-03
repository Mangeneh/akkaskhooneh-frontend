import { Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Fonts, Strings } from '../config';
import { strings } from '../i18n';

export default () => (
  <Text
    note
    style={styles.instruction}
  >
    {strings(Strings.USERNAME_INSTRUCTION)}
  </Text>
);

const styles = StyleSheet.create({
  instruction: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: Fonts.INSTRUCTION_FONT_SIZE,
    marginBottom: 8,
    marginTop: 4,
  },
});
