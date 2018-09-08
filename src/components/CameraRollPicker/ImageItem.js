import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

class ImageItem extends Component {
  componentWillMount() {
    const { width } = Dimensions.get('window');
    const imagesPerRow = 3;
    const imageMargin = 4;
    this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  render() {
    const {
      uri, selected,
    } = this.props;
    const priority = selected ? FastImage.priority.high : FastImage.priority.normal;
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => this.handleClick(uri)}
      >
        <FastImage
          source={{
            uri,
            priority,
          }}
          style={{
            height: this.imageSize,
            width: this.imageSize,
          }}
        />
        {(selected) ? this.renderMark() : null}
      </TouchableOpacity>
    );
  }

  renderMark() {
    return (
      <Icon
        name="check-circle"
        style={styles.marker}
        type="MaterialCommunityIcons"
      />
    );
  }

  handleClick(uri) {
    const { onClick } = this.props;
    onClick(uri);
  }
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'transparent',
    color: 'white',
  },
  imageContainer: {
    marginBottom: 4,
    marginRight: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default ImageItem;
