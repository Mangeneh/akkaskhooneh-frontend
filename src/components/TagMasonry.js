import { Text } from 'native-base';
import React, { Component } from 'react';
import {
  Dimensions, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Pages } from '../config';
import { extractTagID, extractTagName, extractTagPictureUri } from '../helpers';
import NavigationService from '../NavigationService';

const WIDTH = Dimensions.get('window').width;

export default class TagMasonry extends Component {
  render() {
    const { tags } = this.props;
    let component;
    switch (tags.length) {
      case 1:
        component = this.renderBrick(tags[0], styles.full);
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
        {this.renderBrick(tags[1], styles.leftHalf)}
        {this.renderBrick(tags[0], styles.rightHalf)}
      </View>
    );
  }

  renderDoubleHalf(tags) {
    return (
      <View>
        {this.renderBrick(tags[0], styles.quarter)}
        {this.renderBrick(tags[1], styles.quarter)}
      </View>
    );
  }

  renderTriple(tags) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.renderDoubleHalf(tags)}
        {this.renderBrick(tags[2], styles.rightHalf)}
      </View>
    );
  }

  renderQuad(tags) {
    return (
      <View>
        {this.renderBrick(tags[3], styles.full)}
        {this.renderTriple(tags)}
      </View>
    );
  }

  renderQuint(tags) {
    return (
      <View>
        {this.renderBrick(tags[3], styles.full)}
        {this.renderTriple(tags)}
        {this.renderBrick(tags[4], styles.full)}
      </View>
    );
  }

  renderBrick(tag, style) {
    return (
      <TouchableOpacity
        onPress={() => NavigationService.navigate(Pages.TAGS_PHOTOS, { tagID: extractTagID(tag) })}
      >
        <FastImage
          source={{
            uri: extractTagPictureUri(tag),
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={style}
        >
          <View color={{ backgroundColor: Colors.ICON }}>
            <Text style={{
              color: 'white',
              alignSelf: 'center',
            }}
            >
              {`#${extractTagName(tag)}`}
            </Text>
          </View>
          <View pointerEvents="none" style={styles.overlay} />
        </FastImage>
      </TouchableOpacity>
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
    borderRadius: 5,
    justifyContent: 'center',
  },
  rightHalf: {
    height: 150,
    width: (WIDTH - 32) / 2,
    marginLeft: 8,
    marginRight: 12,
    marginBottom: 8,
    borderRadius: 5,
    justifyContent: 'center',
  },
  leftHalf: {
    height: 150,
    width: (WIDTH - 32) / 2,
    marginLeft: 12,
    marginBottom: 8,
    borderRadius: 5,
    justifyContent: 'center',
  },
  quarter: {
    height: 70,
    width: (WIDTH - 32) / 2,
    marginLeft: 12,
    marginBottom: 8,
    borderRadius: 5,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});
