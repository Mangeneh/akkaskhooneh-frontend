import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getTagsPhotosNextPage, refreshTagsPhotos } from '../../actions';
import { BackHeader, CustomStatusBar } from '../../components';
import PostsPhotoList from '../../components/PostsPhotoList';
import { Pages } from '../../config';
import {
  selectTagsPhotos,
  selectTagsPhotosIsLoading,
  selectTagsPhotosNextPage,
  selectTagsPhotosTotalPages,
} from '../../reducers/PostsReducer';

class TagsPhotos extends Component {
  componentWillMount() {
    const { refreshTagsPhotos } = this.props;
    refreshTagsPhotos();
  }

  render() {
    const {
      refreshTagsPhotos, tagsPhotosIsLoading, tagsPhotos, navigation,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <BackHeader onBackPress={() => navigation.goBack()} />
        <PostsPhotoList
          data={tagsPhotos}
          onRefresh={() => refreshTagsPhotos()}
          refreshing={tagsPhotosIsLoading}
          onEndReached={() => this.updateTagsPhotos()}
          onPhotoPress={postID => navigation.push(Pages.POST_INFO_PAGE, { postID })}
        />
      </View>
    );
  }

  updateTagsPhotos() {
    const {
      tagsPhotosNextPage, tagsPhotosTotalPages, getTagsPhotosNextPage, tagsPhotosIsLoading,
    } = this.props;
    if (tagsPhotosNextPage <= tagsPhotosTotalPages && !tagsPhotosIsLoading) {
      getTagsPhotosNextPage(tagsPhotosNextPage);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const tagID = ownProps.navigation.getParam('tagID');
  return {
    tagsPhotos: selectTagsPhotos(state, tagID),
    tagsPhotosPage: selectTagsPhotosNextPage(state, tagID),
    tagsPhotosTotalPages: selectTagsPhotosTotalPages(state, tagID),
    tagsPhotosIsLoading: selectTagsPhotosIsLoading(state, tagID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const tagID = ownProps.navigation.getParam('tagID');
  return {
    refreshTagsPhotos: () => dispatch(refreshTagsPhotos(tagID)),
    getTagsPhotosNextPage: commentsNext => dispatch(getTagsPhotosNextPage(tagID, commentsNext)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsPhotos);
