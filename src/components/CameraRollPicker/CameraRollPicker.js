import { Text } from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator, CameraRoll, FlatList, Platform, StyleSheet, View,
} from 'react-native';
import { Colors, Strings } from '../../config';
import { strings } from '../../i18n';

import ImageItem from './ImageItem';

class CameraRollPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedUri: '',
      lastCursor: null,
      initialLoading: true,
      loadingMore: false,
      noMore: false,
    };
  }

  componentWillMount() {
    this.fetch();
  }

  render() {
    const { images } = this.state;
    if (this.state.initialLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    const listOrEmptyText = images.length > 0 ? (
      <FlatList
        style={{ flex: 1 }}
        removeClippedSubviews
        onEndReachedThreshold={0.5}
        numColumns={3}
        keyExtractor={(item, index) => item.uri}
        renderFooter={() => this.renderFooterSpinner()}
        onEndReached={() => this.onEndReached()}
        data={images}
        renderItem={({ item, index }) => this.renderImage(item, index)}
      />
    ) : (
      <Text style={{ textAlign: 'center' }}>{strings(Strings.NO_PHOTOS)}</Text>
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
    if (!this.state.noMore) {
      return <ActivityIndicator style={styles.spinner} />;
    }
    return null;
  }

  fetch() {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages() {
    const { groupTypes, assetType } = this.props;
    const fetchParams = {
      first: 50,
      groupTypes,
      assetType,
    };
    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes;
    }
    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }
    CameraRoll.getPhotos(fetchParams)
      .then((data) => {
        this.appendImages(data);
      })
      .catch(error => console.log(error));
  }

  appendImages(data) {
    const images = data.edges
      .map(edge => edge.node)
      .map(node => node.image)
      .filter(image => image.width > 0 && image.height > 0);
    const newState = {
      loadingMore: false,
      initialLoading: false,
    };
    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }
    if (images.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.images = this.state.images.concat(images);
    }
    this.setState(newState);
  }

  selectImage(uri) {
    const newUri = this.state.selectedUri === uri ? '' : uri;
    this.setState({
      selectedUri: newUri,
    });
    this.props.onSelectImage(newUri);
  }

  onEndReached() {
    if (!this.state.noMore) {
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
});

export default CameraRollPicker;
