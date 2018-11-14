import { Icon, Input, Item } from 'native-base';
import React from 'react';
import { Strings } from '../config';
import { strings } from '../i18n';
import { textBoxStyle } from '../styles';

export default ({
  error, onChangeEmail, value, reset,
}) => (
  <Item
    style={textBoxStyle.item}
    rounded
    error={error}
  >
    <Icon name="mail" style={textBoxStyle.icon} />
    <Input
      type="email"
      placeholder={strings(Strings.EMAIL_ADDRESS)}
      value={value}
      style={textBoxStyle.input}
      onChangeText={onChangeEmail}
    />
    <Icon name={error ? 'close-circle' : null} onPress={reset} />
  </Item>
);
