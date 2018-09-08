import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { getSelfPhotosNextPage, refreshSelfPhotos } from '../../actions';
import {
  selectSelfPhotos,
  selectSelfPhotosIsLoading,
  selectSelfPhotosNextPage,
  selectSelfPhotosTotalPages,
} from '../../reducers/PostsReducer';

class AddPostToBoard extends Component {
  render() {
    const {
      resetSelfPhotos, getPhotosNextPage, photosIsLoading, photos,
    } = this.props;
    return (
      <View>
        <FlatList
          onRefresh={() => {
            resetSelfPhotos();
            getPhotosNextPage(1);
          }}
          refreshing={photosIsLoading}
          onEndReached={() => this.updatePhotos()}
          style={{
            flex: 1,
            marginTop: 8,
          }}
          numColumns={2}
          keyExtractor={(item, index) => item.id}
          data={photos}
          renderItem={({ item, index }) => this.renderPhoto(item, index)}
        />
      </View>
    );
  }

  updatePhotos() {
    const {
      photosNextPage, photosTotalPages, getPhotosNextPage, photosIsLoading,
    } = this.props;
    if (photosNextPage <= photosTotalPages && !photosIsLoading) {
      getPhotosNextPage(photosNextPage);
    }
  }
}

const mapStateToProps = state => ({
  photos: selectSelfPhotos(state),
  photosNextPage: selectSelfPhotosNextPage(state),
  photosTotalPages: selectSelfPhotosTotalPages(state),
  photosIsLoading: selectSelfPhotosIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  getPhotosNextPage: photosNext => dispatch(getSelfPhotosNextPage(photosNext)),
  refreshSelfPhotos: () => dispatch(refreshSelfPhotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)();
