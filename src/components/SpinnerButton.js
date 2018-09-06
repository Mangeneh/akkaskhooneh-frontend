import {
  Button, Icon, Spinner, Text,
} from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';

export default class SpinnerButton extends Component {
  render() {
    const { disabled, onPress, style } = this.props;
    return (
      <Button
        onPress={onPress}
        block
        style={style}
        disabled={disabled}
      >
        {this.renderButtonContent()}
      </Button>
    );
  }

  renderButtonContent() {
    const { text, icon, loading } = this.props;
    if (loading) {
      return <Spinner color="white" />;
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon type="MaterialCommunityIcons" name={icon} />
        <Text>{text}</Text>
      </View>
    );
  }
}
