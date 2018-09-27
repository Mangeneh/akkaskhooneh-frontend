import {
  Body, Button, Icon, Text,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addPostToBoard } from '../../actions';
import { AddPostToBoardHeader, CustomStatusBar, ProfilePageImageItem } from '../../components';
import Loading from '../../components/Loading';
import { Colors, Parameters, Strings } from '../../config';
import { strings } from '../../i18n';
import {
  generatePaginatorActionCreators,
  generatePaginatorSelectors,
} from '../../reducers/paginator';
import { selectUsername } from '../../reducers/users';
import { createUserPhotosURL } from '../../config/URLCreators';

class AddPostToBoard extends Component {
  state = {
    selectedPostID: '',
    hasChosen: false,
  };

  componentWillMount() {
    this.refresh();
  }

  render() {
    const {
      isRefreshing, isFirstFetch, photos, navigation,
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
          {!isFirstFetch
            ? (
              <FlatList
                onRefresh={() => this.refresh()}
                refreshing={isRefreshing}
                onEndReached={() => this.updatePhotos()}
                style={{
                  flex: 1,
                  marginTop: 8,
                }}
                numColumns={2}
                keyExtractor={(item) => item.id}
                data={photos}
                renderItem={({ item }) => this.renderPhoto(item)}
              />
            ) : <Loading />}
          {this.renderButton()}
        </View>
      </View>
    );
  }

  renderPhoto(item) {
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

  refresh() {
    const {
      refresh, isLoading, isRefreshing,
    } = this.props;
    if (!isLoading && !isRefreshing) {
      refresh();
    }
  }

  updatePhotos() {
    const {
      nextPage, totalPages, loadMore, isLoading, isRefreshing,
    } = this.props;
    if (nextPage <= totalPages && !isLoading && !isRefreshing) {
      loadMore(nextPage);
    }
  }

  onAddPress() {
    const { addPostToBoard, navigation } = this.props;
    addPostToBoard(this.state.selectedPostID)
      .then(response => navigation.goBack())
      .catch(error => navigation.goBack());
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

const mapStateToProps = (state) => {
  const paginatorSelectors = generatePaginatorSelectors(state, 'photos_', selectUsername(state));
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
    selfUsername: selectUsername(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  const boardID = navigation.getParam(Parameters.BOARD_ID);
  const selfUsername = navigation.getParam(Parameters.USERNAME);
  const pagintorActionCreators = generatePaginatorActionCreators('photos_', selfUsername);
  const { refresh, loadMore } = pagintorActionCreators;
  return {
    loadMore: nextPage => dispatch(loadMore(createUserPhotosURL(selfUsername, nextPage))),
    refresh: () => dispatch(refresh(createUserPhotosURL(selfUsername))),
    addPostToBoard: postID => dispatch(addPostToBoard(postID, boardID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostToBoard);
