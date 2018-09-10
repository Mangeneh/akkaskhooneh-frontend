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
        component = this.renderQuad(tags);
        break;
      case 5:
        component = this.renderQuint(tags);
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

  renderDoubleHalf(tags) {
    return (
      <View>
        {this.renderQuarterBrick(tags[0])}
        {this.renderQuarterBrick(tags[1])}
      </View>
    );
  }

  renderTriple(tags) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.renderDoubleHalf(tags)}
        {this.renderHalfBrick(tags[2])}
      </View>
    );
  }

  renderQuad(tags) {
    return (
      <View>
        {this.renderFullBrick(tags[3])}
        {this.renderTriple(tags)}
      </View>
    );
  }

  renderQuint(tags) {
    return (
      <View>
        {this.renderFullBrick(tags[3])}
        {this.renderTriple(tags)}
        {this.renderFullBrick(tags[4])}
      </View>
    );
  }

  renderFullBrick(tag) {
    return (
      <FastImage
        source={{
          uri: extractTagPictureUri(tag),
        }}
        resizeMode={FastImage.resizeMode.cover}
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
    width: null,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
  },
  half: {
    height: 150,
    width: (WIDTH - 32) / 2,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
  },
  quarter: {
    height: 70,
    width: (WIDTH - 32) / 2,
    marginLeft: 12,
    marginRight: 0,
    marginBottom: 8,
  },
});
