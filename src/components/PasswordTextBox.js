import { Icon, Input, Item } from 'native-base';
import React from 'react';
import { textBoxStyle } from '../styles';

export default ({
  error, onChangePassword, value, reset, placeholder,
}) => (
  <Item
    style={textBoxStyle.item}
    rounded
    error={error}
  >
    <Icon name="key" style={textBoxStyle.icon} />
    <Input
      placeholder={placeholder}
      secureTextEntry
      value={value}
      style={textBoxStyle.input}
      onChangeText={onChangePassword}
    />
    <Icon name={error ? 'close-circle' : null} onPress={reset} />
  </Item>
);
