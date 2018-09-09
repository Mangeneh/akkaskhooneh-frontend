import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { extractTagPictureUri } from '../helpers';

export default class TagMasonry extends Component {
  render() {
    const { tag } = this.props;
    console.log(tag);
    return (
      <View>
        {this.renderSingle(tag)}
      </View>
    );
  }

  renderSingle(tag) {
    return (
      <View style={styles.single}>
        <FastImage
          source={{
            uri: extractTagPictureUri(tag),
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            flex: 1,
            height: 100,
            width: 100
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  single: {
    height: 100,
    marginLeft: 16,
    marginRight: 16,
  },
});
