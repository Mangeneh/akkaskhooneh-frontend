import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Graphics } from '../config';
import { extractPostPictureUri } from '../helpers';

class ProfilePageImageItem extends Component {
  componentWillMount() {
    const { width } = Dimensions.get('window');
    const imagesPerRow = 2;
    const imageMargin = 8;
    this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  render() {
    const { image } = this.props;
    const uri = extractPostPictureUri(image);
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => this.handlePress()}
      >
        <FastImage
          source={{ uri }}
          resizeMode={FastImage.resizeMode.content}
          style={{
            height: this.imageSize,
            width: this.imageSize,
          }}
        />
      </TouchableOpacity>
    );
  }

  handlePress() {
    const { onPress, image } = this.props;
    onPress(image);
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 8,
    marginRight: 8,
    borderRadius: Graphics.PHOTO_RADIUS,
    overflow: 'hidden',
  },
});

export default ProfilePageImageItem;
