import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { getSelfPhotosNextPage, refreshSelfPhotos } from '../../actions';
import { AddPostToBoardHeader, ProfilePageImageItem, CustomStatusBar } from '../../components';
import { Colors } from '../../config';
import {
  selectSelfPhotos,
  selectSelfPhotosIsLoading,
  selectSelfPhotosNextPage,
  selectSelfPhotosTotalPages,
} from '../../reducers/PostsReducer';

class AddPostToBoard extends Component {
  state = {
    selectedUri: '',
  };

  render() {
    const {
      refreshSelfPhotos, photosIsLoading, photos, navigation,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <AddPostToBoardHeader onClosePress={() => navigation.goBack()} />
        <View style={{
          backgroundColor: Colors.WHITE_BACK,
          flex: 1,
          paddingLeft: 8,
        }}
        >
          <CustomStatusBar />
          <FlatList
            onRefresh={() => refreshSelfPhotos()}
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
      </View>
    );
  }

  renderPhoto(item, index) {
    return (
      <ProfilePageImageItem
        image={item}
        onPress={(image) => {
        }}
      />
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


const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'transparent',
    color: 'white',
  },
  imageContainer: {
    marginBottom: 4,
    marginRight: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(AddPostToBoard);
