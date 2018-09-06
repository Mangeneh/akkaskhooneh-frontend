import { Icon, Input, Item } from 'native-base';
import React from 'react';
import { Colors, Constants } from '../config';

export default (props) => {
  const {
    error, onChangePassword, value, reset, placeholder,
  } = props;
  const { TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS, TEXT_BOX_ELEVATION } = Constants;
  return (
    <Item
      style={{
        backgroundColor: 'white',
        borderRadius: TEXT_BOX_RADIUS,
        elevation: TEXT_BOX_ELEVATION,
      }}
      rounded
      error={error}
    >
      <Icon style={{ color: Colors.ICON }} name="key" />
      <Input
        placeholder={props.placeholder}
        secureTextEntry
        value={value}
        style={{
          textAlign: 'center',
          fontSize: TEXT_BOX_FONT_SIZE,
        }}
        onChangeText={onChangePassword}
      />
      <Icon name={error ? 'close-circle' : null} onPress={reset} />
    </Item>
  );
};
