import React, { Component } from 'react';
import {
  Dimensions, FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { withNavigation } from 'react-navigation';
import {
  Colors, Graphics, Pages, Parameters,
} from '../config';
import { extractPostID, extractPostPictureUri } from '../helpers';
import CustomStatusBar from './CustomStatusBar';
import Loading from './Loading';

class PostsPhotoList extends Component {
  componentWillMount() {
    const { width } = Dimensions.get('window');
    const imagesPerRow = 2;
    const imageMargin = 8;
    this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  render() {
    const {
      data, onRefresh, refreshing, onEndReached, isFirstFetch,
    } = this.props;
    return (
      (!isFirstFetch
        ? (
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
        ) : <Loading />)
    );
  }

  renderPostPhoto(item, index) {
    const uri = extractPostPictureUri(item);
    const postID = extractPostID(item);
    return (uri ? (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => this.props.navigation.push(Pages.POST_INFO_PAGE, { [Parameters.POST_ID]: postID })}
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
      </TouchableOpacity>) : null
    );
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

export default withNavigation(PostsPhotoList);
