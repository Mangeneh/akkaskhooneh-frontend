import { Icon } from 'native-base';
import React, { Component } from 'react';
import {
  Dimensions, Image, StyleSheet, TouchableOpacity,
} from 'react-native';

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
    const marker = (
      <Icon
        name="check-circle"
        style={styles.marker}
        type="MaterialCommunityIcons"
      />
    );
    return (
      <TouchableOpacity
        style={{
          marginBottom: 4,
          marginRight: 4,
          borderRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => this.handleClick(uri)}
      >
        <Image
          source={{ uri }}
          style={{
            height: this.imageSize,
            width: this.imageSize,
          }}
        />
        {(selected) ? marker : null}
      </TouchableOpacity>
    );
  }

  handleClick(uri) {
    this.props.onClick(uri);
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

export default ImageItem;
