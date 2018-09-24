import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getTagsPhotosNextPage, refreshTagsPhotos } from '../../actions';
import { BackHeader, CustomStatusBar } from '../../components';
import PostsPhotoList from '../../components/PostsPhotoList';
import { Pages, Parameters } from '../../config';
import {
  selectTagsPhotos,
  selectTagsPhotosIsFirstFetch,
  selectTagsPhotosIsLoading,
  selectTagsPhotosIsRefreshing,
  selectTagsPhotosNextPage,
  selectTagsPhotosTotalPages,
} from '../../reducers/posts';

class TagsPhotos extends Component {
  componentWillMount() {
    this.refreshTagsPhotos();
  }

  render() {
    const {
      tagsPhotosIsRefreshing, tagsPhotos, tagsPhotosIsFirstFetch, navigation,
    } = this.props;
    const tagName = navigation.getParam(Parameters.TAG_NAME);
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <BackHeader title={tagName} onBackPress={() => navigation.goBack()} />
        <PostsPhotoList
          data={tagsPhotos}
          onRefresh={() => this.refreshTagsPhotos()}
          refreshing={tagsPhotosIsRefreshing}
          isFirstFetch={tagsPhotosIsFirstFetch}
          onEndReached={() => this.updateTagsPhotos()}
          onPhotoPress={postID => navigation.push(Pages.POST_INFO_PAGE, { postID })}
        />
      </View>
    );
  }

  refreshTagsPhotos() {
    const {
      tagsPhotosIsLoading, tagsPhotosIsRefreshing, refreshTagsPhotos,
    } = this.props;
    if (!tagsPhotosIsLoading && !tagsPhotosIsRefreshing) {
      refreshTagsPhotos();
    }
  }

  updateTagsPhotos() {
    const {
      tagsPhotosNextPage, tagsPhotosTotalPages, getTagsPhotosNextPage, tagsPhotosIsLoading, tagsPhotosIsRefreshing,
    } = this.props;
    if (tagsPhotosNextPage <= tagsPhotosTotalPages && !tagsPhotosIsLoading && !tagsPhotosIsRefreshing) {
      getTagsPhotosNextPage(tagsPhotosNextPage);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const tagID = ownProps.navigation.getParam(Parameters.TAG_ID);
  return {
    tagsPhotos: selectTagsPhotos(state, tagID),
    tagsPhotosPage: selectTagsPhotosNextPage(state, tagID),
    tagsPhotosTotalPages: selectTagsPhotosTotalPages(state, tagID),
    tagsPhotosIsFirstFetch: selectTagsPhotosIsFirstFetch(state, tagID),
    tagsPhotosIsRefreshing: selectTagsPhotosIsRefreshing(state, tagID),
    tagsPhotosIsLoading: selectTagsPhotosIsLoading(state, tagID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const tagID = ownProps.navigation.getParam(Parameters.TAG_ID);
  return {
    refreshTagsPhotos: () => dispatch(refreshTagsPhotos(tagID)),
    getTagsPhotosNextPage: commentsNext => dispatch(getTagsPhotosNextPage(tagID, commentsNext)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsPhotos);
