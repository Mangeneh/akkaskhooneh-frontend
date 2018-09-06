import { Icon } from 'native-base';
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
    this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  render() {
    const {
      item, selected, selectedMarker, imageMargin,
    } = this.props;
    const marker = selectedMarker || (
      <Icon
        name="check-circle"
        style={styles.marker}
        type="MaterialCommunityIcons"
      />
    );
    const { image } = item.node;
    return (
      <TouchableOpacity
        style={{
          marginBottom: imageMargin,
          marginRight: imageMargin,
          borderRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => this.handleClick(image)}
      >
        <Image
          source={{ uri: image.uri }}
          style={{
            height: this.imageSize,
            width: this.imageSize,
          }}
        />
        {(selected) ? marker : null}
      </TouchableOpacity>
    );
  }

  handleClick(item) {
    console.log('clicked');
    console.log(this.props);
    this.props.onClick(item);
  }
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
    color: 'white',
  },
});

ImageItem.defaultProps = {
  item: {},
  selected: false,
};

export default ImageItem;
