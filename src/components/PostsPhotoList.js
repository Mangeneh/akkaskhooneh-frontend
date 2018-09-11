import React, { Component } from 'react';
import {
  Dimensions, FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Graphics, Pages } from '../config';
import {
  extractPostIDFromPhoto,
  extractPostIDFromPost,
  extractPostPictureUriFromPhoto,
  extractPostPictureUriFromPost,
} from '../helpers';
import NavigationService from '../NavigationService';

export default class PostsPhotoList extends Component {
  componentWillMount() {
    const { width } = Dimensions.get('window');
    const imagesPerRow = 2;
    const imageMargin = 8;
    this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  render() {
    const {
      data, onRefresh, refreshing, onEndReached,
    } = this.props;
    return (
      <View style={{
        backgroundColor: Colors.WHITE_BACK,
        flex: 1,
        paddingLeft: 8,
      }}
      >
        <FlatList
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
          onEndReached={() => onEndReached()}
          style={{
            flex: 1,
            marginTop: 8,
          }}
          numColumns={2}
          keyExtractor={(item, index) => item.id}
          data={data}
          renderItem={({ item, index }) => this.renderPostPhoto(item, index)}
        />
      </View>
    );
  }

  renderPostPhoto(item, index) {
    const { post } = this.props;
    const uri = post ? extractPostPictureUriFromPost(item) : extractPostPictureUriFromPhoto(item);
    const postID = post ? extractPostIDFromPost(item) : extractPostIDFromPhoto(item);
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => this.onPhotoPress(postID)}
      >
        <FastImage
          source={{
            uri,
          }}
          resizeMode={FastImage.resizeMode.content}
          style={{
            height: this.imageSize,
            width: this.imageSize,
          }}
        />
      </TouchableOpacity>
    );
  }

  onPhotoPress(postID) {
    NavigationService.navigate(Pages.POST_INFO_PAGE, { postID });
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
