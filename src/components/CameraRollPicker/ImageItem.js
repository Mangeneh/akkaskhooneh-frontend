import React, { Component } from 'react';
import {
  Dimensions, Image, StyleSheet, TouchableOpacity,
} from 'react-native';

class ImageItem extends Component {
  componentWillMount() {
    let { width } = Dimensions.get('window');
    const { imageMargin, imagesPerRow, containerWidth } = this.props;

    if (typeof containerWidth !== 'undefined') {
      width = containerWidth;
    }
    this._imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  render() {
    const {
      item, selected, selectedMarker, imageMargin,
    } = this.props;

    const marker = selectedMarker || (
      <Image
        style={[styles.marker, {
          width: 25,
          height: 25,
        }]}
        source={require('./circle-check.png')}
      />
    );

    const image = item.node.image;

    return (
      <TouchableOpacity
        style={{
          marginBottom: imageMargin,
          marginRight: imageMargin,
        }}
        onPress={() => this._handleClick(image)}
      >
        <Image
          source={{ uri: image.uri }}
          style={{
            height: this._imageSize,
            width: this._imageSize,
          }}
        />
        {(selected) ? marker : null}
      </TouchableOpacity>
    );
  }

  _handleClick(item) {
    this.props.onClick(item);
  }
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
});

ImageItem.defaultProps = {
  item: {},
  selected: false,
};

export default ImageItem;
