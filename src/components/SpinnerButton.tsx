import { Button, Icon, Spinner, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { PageModes } from '../config';
import { chooseStyle } from '../styles';

export interface IProps {
  onPress: () => void;
  mode: PageModes;
  text: string;
  icon: string;
}

export default class SpinnerButton extends Component<IProps> {
  public render () {
    const { onPress, mode } = this.props;
    return (
      <Button
        onPress={onPress}
        block
        style={chooseStyle(mode)}
        disabled={mode === PageModes.DISABLED || mode === PageModes.LOADING}
      >
        {this.renderButtonContent()}
      </Button>
    );
  }

  public renderButtonContent () {
    const { text, icon, mode } = this.props;
    if (mode === PageModes.LOADING) {
      return <Spinner color="white"/>;
    }
    return (
      <View style={styles.buttonContent}>
        <Icon name={icon} type="MaterialCommunityIcons"/>
        <Text>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContent: { flexDirection: 'row' },
});
