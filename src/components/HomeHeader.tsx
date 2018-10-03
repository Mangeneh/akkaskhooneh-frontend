import { Body, Header, Title } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../config';

export default ({ title }) => (
  <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
    <Body style={{ flex: 1 }}>
    <Title style={styles.title}>
      {title}
    </Title>
    </Body>
  </Header>
);

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    color: 'white',
  },
});
