import { Icon, Input, Item } from 'native-base';
import React from 'react';
import { TextBoxStyle } from '../styles';

export default (props) => {
  const {
    error, onChangePassword, value, reset,
  } = props;
  return (
    <Item
      style={TextBoxStyle.item}
      rounded
      error={error}
    >
      <Icon name="key" style={TextBoxStyle.icon} />
      <Input
        placeholder={props.placeholder}
        secureTextEntry
        value={value}
        style={TextBoxStyle.input}
        onChangeText={onChangePassword}
      />
      <Icon name={error ? 'close-circle' : null} onPress={reset} />
    </Item>
  );
};
