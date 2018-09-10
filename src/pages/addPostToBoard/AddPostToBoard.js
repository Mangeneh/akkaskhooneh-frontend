import {
  Body, Button, Icon, Text,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addPostToBoard, getSelfPhotosNextPage, refreshSelfPhotos } from '../../actions';
import { AddPostToBoardHeader, CustomStatusBar, ProfilePageImageItem } from '../../components';
import { Colors, Strings } from '../../config';
import { strings } from '../../i18n';
import {
  selectSelfPhotos,
  selectSelfPhotosIsLoading,
  selectSelfPhotosNextPage,
  selectSelfPhotosTotalPages,
} from '../../reducers/PostsReducer';

class AddPostToBoard extends Component {
  state = {
    selectedPostID: '',
    hasChosen: false,
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
          {this.renderButton()}
        </View>
      </View>
    );
  }

  renderPhoto(item, index) {
    const isSelected = (item.id === this.state.selectedPostID);
    return (
      <View>
        <ProfilePageImageItem
          image={item}
          onPress={image => this.selectImage(image)}
        />
        {isSelected ? this.renderMark() : null}
      </View>
    );
  }

  renderMark() {
    return (
      <Icon
        name="check-circle"
        style={styles.marker}
        type="MaterialCommunityIcons"
      />
    );
  }

  renderButton() {
    if (this.state.hasChosen) {
      return (
        <View style={{
          position: 'absolute',
          bottom: 40,
          alignContent: 'center',
          alignSelf: 'center',
          width: '100%',
        }}
        >
          <Button
            onPress={() => this.onAddPress()}
            style={{
              alignSelf: 'center',
              marginRight: 32,
              marginLeft: 32,
              marginTop: 16,
              width: 300,
              height: 50,
              backgroundColor: Colors.ACCENT,
              borderRadius: 10,
            }}
          >
            <Body>
              <Text style={{ color: 'white' }}>{strings(Strings.ADD)}</Text>
            </Body>
          </Button>
        </View>
      );
    }
  }

  selectImage(image) {
    if (this.state.selectedPostID === image.id) {
      this.setState({
        selectedPostID: '',
        hasChosen: false,
      });
    } else {
      this.setState({
        selectedPostID: image.id,
        hasChosen: true,
      });
    }
  }

  updatePhotos() {
    const {
      photosNextPage, photosTotalPages, getPhotosNextPage, photosIsLoading,
    } = this.props;
    if (photosNextPage <= photosTotalPages && !photosIsLoading) {
      getPhotosNextPage(photosNextPage);
    }
  }

  onAddPress() {
    this.props.addPostToBoard(this.state.selectedPostID, this.props.navigation.getParam('boardID'))
      .then(response => this.props.navigation.goBack());
  }
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 4,
    right: 8,
    backgroundColor: 'transparent',
    color: 'white',
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
  addPostToBoard: (postID, boardID) => dispatch(addPostToBoard(postID, boardID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostToBoard);
