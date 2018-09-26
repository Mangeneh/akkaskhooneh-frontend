import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar } from '../../components';
import PostsPhotoList from '../../components/PostsPhotoList';
import { Pages, Parameters } from '../../config';
import {
  generatePaginatorActionCreators,
  generatePaginatorSelectors,
} from '../../reducers/paginator';
import { createTagPhotosURL } from '../../config/URLCreators';

class TagsPhotos extends Component {
  componentWillMount() {
    this.refresh();
  }

  render() {
    const {
      isRefreshing, tagsPhotos, isFirstFetch, navigation,
    } = this.props;
    const tagName = navigation.getParam(Parameters.TAG_NAME);
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <BackHeader title={tagName} onBackPress={() => navigation.goBack()} />
        <PostsPhotoList
          data={tagsPhotos}
          onRefresh={() => this.refresh()}
          refreshing={isRefreshing}
          isFirstFetch={isFirstFetch}
          onEndReached={() => this.loadMore()}
          onPhotoPress={postID => navigation.push(Pages.POST_INFO_PAGE, { postID })}
        />
      </View>
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
}

const mapStateToProps = (state, ownProps) => {
  const tagID = ownProps.navigation.getParam(Parameters.TAG_ID);
  const paginatorSelectors = generatePaginatorSelectors(state, 'tag', tagID);
  const {
    selectData, selectNextPage, selectTotalPages,
    selectIsFirstFetch, selectIsRefreshing, selectIsLoading,
  } = paginatorSelectors;
  return {
    tagsPhotos: selectData(),
    nextPage: selectNextPage(),
    totalPages: selectTotalPages(),
    isFirstFetch: selectIsFirstFetch(),
    isRefreshing: selectIsRefreshing(),
    isLoading: selectIsLoading(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const tagID = ownProps.navigation.getParam(Parameters.TAG_ID);
  const pagintorActionCreators = generatePaginatorActionCreators('tag', tagID);
  const { refresh, loadMore } = pagintorActionCreators;
  const { nextPage } = ownProps;
  return {
    refresh: () => dispatch(refresh(createTagPhotosURL(tagID))),
    loadMore: () => dispatch(loadMore(createTagPhotosURL(tagID, nextPage))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsPhotos);
