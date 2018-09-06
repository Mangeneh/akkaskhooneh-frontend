import { Content, Form, Textarea } from 'native-base';
import React from 'react';

export default (props) => {
  const {
    style, placeholder, disabled, value, onChangeText,
  } = props;
  return (
    <Content>
      <Form>
        <Textarea
          rowSpan={5}
          style={style}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChangeText={onChangeText}
        />
      </Form>
    </Content>
  );
};
