import { Body, Header, Title } from 'native-base';
import React from 'react';
import { Colors } from '../config';

const HomeHeader = ({ title }) => (
  <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
    <Body style={{ flex: 1 }}>
      <Title style={{
        alignSelf: 'center',
        color: 'white',
      }}
      >
        {title}
      </Title>
    </Body>
  </Header>
);

export default HomeHeader;
