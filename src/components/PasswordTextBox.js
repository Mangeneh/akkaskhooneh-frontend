import { Icon, Input, Item } from 'native-base';
import React from 'react';
import { TextBoxStyle } from '../styles';

export default ({
  error, onChangePassword, value, reset, placeholder,
}) => (
  <Item
    style={TextBoxStyle.item}
    rounded
    error={error}
  >
    <Icon name="key" style={TextBoxStyle.icon} />
    <Input
      placeholder={placeholder}
      secureTextEntry
      value={value}
      style={TextBoxStyle.input}
      onChangeText={onChangePassword}
    />
    <Icon name={error ? 'close-circle' : null} onPress={reset} />
  </Item>
);
