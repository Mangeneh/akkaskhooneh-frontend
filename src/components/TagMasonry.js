import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { extractTagPictureUri } from '../helpers';

const WIDTH = Dimensions.get('window').width;

export default class TagMasonry extends Component {
  render() {
    const { tags } = this.props;
    let component;
    switch (tags.length) {
      case 1:
        component = this.renderFullBrick(tags[0]);
        break;
      case 2:
        component = this.renderDouble(tags);
        break;
      case 3:
        component = this.renderTriple(tags);
        break;
      case 4:
        component = this.renderFullBlock(tags);
        break;
    }
    return (
      <View>
        {component}
      </View>
    );
  }

  renderDouble(tags) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.renderHalfBrick(tags[0])}
        {this.renderHalfBrick(tags[1])}
      </View>
    );
  }

  renderTriple(tags) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.renderHalfBrick(tags[2])}
        {this.renderDouble(tags)}
      </View>
    );
  }

  renderFullBlock(tags) {
    return (
      <View>
        {this.renderFullBrick(tags[0])}
        {this.renderQuarterBrick(tags[1])}
        {this.renderQuarterBrick(tags[2])}
      </View>
    );
  }

  renderFullBrick(tag) {
    return (
      <FastImage
        source={{
          uri: extractTagPictureUri(tag),
        }}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.full}
      />
    );
  }

  renderHalfBrick(tag) {
    return (
      <FastImage
        source={{
          uri: extractTagPictureUri(tag),
        }}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.half}
      />
    );
  }

  renderQuarterBrick(tag) {
    return (
      <FastImage
        source={{
          uri: extractTagPictureUri(tag),
        }}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.quarter}
      />
    );
  }
}

const styles = StyleSheet.create({
  full: {
    height: 100,
    width: WIDTH - 32,
    marginLeft: 16,
    marginRight: 16,
  },
  half: {
    height: 150,
    width: (WIDTH - 32) / 2,
    marginLeft: 16,
    marginRight: 16,
  },
  quarter: {
    height: 75,
    width: (WIDTH - 32) / 2,
    marginLeft: 16,
    marginRight: 16,
  },
});
