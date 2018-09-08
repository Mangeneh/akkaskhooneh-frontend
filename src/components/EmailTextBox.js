import { Icon, Input, Item } from 'native-base';
import React from 'react';
import { Strings } from '../config';
import { strings } from '../i18n';
import { TextBoxStyle } from '../styles';

export default (props) => {
  const {
    error, onChangeEmail, value, reset,
  } = props;
  return (
    <Item
      style={TextBoxStyle.item}
      rounded
      error={error}
    >
      <Icon name="mail" style={TextBoxStyle.icon} />
      <Input
        type="email"
        placeholder={strings(Strings.EMAIL_ADDRESS)}
        value={value}
        style={TextBoxStyle.input}
        onChangeText={onChangeEmail}
      />
      <Icon name={error ? 'close-circle' : null} onPress={reset} />
    </Item>
  );
};
