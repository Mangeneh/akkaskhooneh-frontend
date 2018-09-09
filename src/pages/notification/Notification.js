import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Colors, Constants } from '../../config';

export default class Notification extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      >
        <Text style={{
          fontSize: Constants.TEXT_NORMAL_SIZE,
          color: Colors.ICON,
        }}
        >
هنوز آماده نیست، بعدا برگردین بازم!
        </Text>
      </View>

    );
  }
}