import { Text } from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator, CameraRoll, FlatList, Platform, StyleSheet, View,
} from 'react-native';
import { Colors, Strings } from '../../config';
import { strings } from '../../i18n';

import ImageItem from './ImageItem';

class CameraRollPicker extends Component {
  state = {
    images: [],
    selectedUri: '',
    lastCursor: null,
    initialLoading: true,
    loadingMore: false,
    noMore: false,
  };

  componentWillMount() {
    this.fetch();
  }

  render() {
    const { images, initialLoading } = this.state;
    if (initialLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    const listOrEmptyText = images.length > 0 ? (
      <FlatList
        style={styles.list}
        removeClippedSubviews
        onEndReachedThreshold={0.5}
        numColumns={3}
        keyExtractor={item => item.uri}
        renderFooter={() => this.renderFooterSpinner()}
        onEndReached={() => this.onEndReached()}
        data={images}
        renderItem={({ item }) => this.renderImage(item)}
      />
    ) : (
      <Text style={styles.text}>{strings(Strings.NO_PHOTOS)}</Text>
    );
    return (
      <View
        style={styles.wrapper}
      >
        {listOrEmptyText}
      </View>
    );
  }

  renderImage(item) {
    const { selectedUri } = this.state;
    const { uri } = item;
    const isSelected = (uri === selectedUri);
    return (
      <ImageItem
        uri={uri}
        selected={isSelected}
        onClick={uri => this.selectImage(uri)}
      />
    );
  }

  renderFooterSpinner() {
    const { noMore } = this.state;
    if (!noMore) {
      return <ActivityIndicator />;
    }
    return null;
  }

  fetch() {
    const { loadingMore } = this.state;
    if (!loadingMore) {
      this.setState({ loadingMore: true }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages() {
    const { groupTypes, assetType } = this.props;
    const { lastCursor } = this.state;
    const fetchParams = {
      first: 50,
      groupTypes,
      assetType,
    };
    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes;
    }
    if (lastCursor) {
      fetchParams.after = lastCursor;
    }
    CameraRoll.getPhotos(fetchParams)
      .then((data) => {
        this.appendImages(data);
      });
  }

  appendImages(data) {
    const newImages = data.edges
      .map(edge => edge.node)
      .map(node => node.image)
      .filter(image => image.width > 0 && image.height > 0);
    const { images } = this.state;
    const newState = {
      loadingMore: false,
      initialLoading: false,
    };
    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }
    if (newImages.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.images = images.concat(newImages);
    }
    this.setState(newState);
  }

  selectImage(uri) {
    const { selectedUri } = this.state;
    const { onSelectImage } = this.props;
    const newUri = selectedUri === uri ? '' : uri;
    this.setState({
      selectedUri: newUri,
    });
    onSelectImage(newUri);
  }

  onEndReached() {
    const { noMore } = this.state;
    if (!noMore) {
      this.fetch();
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 4,
    paddingRight: 0,
  },
  loader: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
  },
  text: { textAlign: 'center' },
  list: { flex: 1 },
});

export default CameraRollPicker;
