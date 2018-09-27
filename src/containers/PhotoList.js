import React, { Component } from 'react';
import {
  Dimensions, FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { withNavigation } from 'react-navigation';
import { generatePaginatorActionCreators, generatePaginatorSelectors } from '../reducers/paginator';
import {
  Colors, Graphics, Pages, Parameters,
} from '../config';
import { extractPostID, extractPostPictureURI } from '../helpers';
import Loading from '../components/Loading';

const IMAGE_SIZE = (Dimensions.get('window').width - 24) / 2;

// TODO: Add Empty Mode

class PostsPhotoList extends Component {
  componentWillMount() {
    this.refresh();
  }

  render() {
    const { photos, isRefreshing, isFirstFetch } = this.props;
    return (
      (!isFirstFetch
        ? (
          <View style={styles.container}>
            <FlatList
              onRefresh={() => this.refresh()}
              refreshing={isRefreshing}
              onEndReached={() => this.loadMore()}
              style={styles.list}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              data={photos}
              renderItem={({ item }) => this.renderPhoto(item)}
            />
          </View>
        ) : <Loading />)
    );
  }

  renderPhoto(item) {
    const uri = extractPostPictureURI(item);
    const postID = extractPostID(item);
    return (uri ? (
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => this.onPhotoPress(postID)}
      >
        <FastImage
          source={{
            uri,
          }}
          resizeMode={FastImage.resizeMode.content}
          style={styles.photo}
        />
      </TouchableOpacity>) : null
    );
  }

  refresh() {
    const {
      isLoading, isRefreshing, refresh,
    } = this.props;
    if (!isLoading && !isRefreshing) {
      refresh();
    }
  }

  loadMore() {
    const {
      nextPage, totalPages, loadMore, isLoading, isRefreshing,
    } = this.props;
    if (nextPage <= totalPages && !isLoading && !isRefreshing) {
      loadMore(nextPage);
    }
  }

  onPhotoPress(postID) {
    const { navigation } = this.props;
    navigation.push(Pages.POST_INFO_PAGE, { [Parameters.POST_ID]: postID });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_BACK,
    paddingLeft: 8,
  },
  list: {
    flex: 1,
    marginTop: 8,
  },
  photoContainer: {
    marginBottom: 8,
    marginRight: 8,
    borderRadius: Graphics.PHOTO_RADIUS,
    overflow: 'hidden',
  },
  photo: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
});

const mapStateToProps = (state, ownProps) => {
  const { name, id } = ownProps;
  const paginatorSelectors = generatePaginatorSelectors(state, name, id);
  const {
    selectData, selectNextPage, selectTotalPages,
    selectIsFirstFetch, selectIsRefreshing, selectIsLoading,
  } = paginatorSelectors;
  return {
    photos: selectData(),
    nextPage: selectNextPage(),
    totalPages: selectTotalPages(),
    isFirstFetch: selectIsFirstFetch(),
    isRefreshing: selectIsRefreshing(),
    isLoading: selectIsLoading(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { name, id, createURL } = ownProps;
  const paginatorActionCreators = generatePaginatorActionCreators(name, id);
  const { refresh, loadMore } = paginatorActionCreators;
  return {
    refresh: () => dispatch(refresh(createURL(id))),
    loadMore: nextPage => dispatch(loadMore(createURL(id, nextPage))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PostsPhotoList));
