import LottieView from 'lottie-react-native';
import { Container, Icon, Tab, Tabs, Text, } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';
import {
  getUserBoardsNextPage,
  getUserPhotosNextPage,
  refreshUserBoards,
  refreshUserPhotos,
  updateUser,
} from '../../actions';
import { Board, ProfileHeader } from '../../components';
import FollowButton from '../../components/FollowButton';
import Loading from '../../components/Loading';
import PostsPhotoList from '../../components/PostsPhotoList';
import { Colors, Constants, FollowModes, Pages, Parameters, Strings, } from '../../config';
import { ProfileInfo } from '../../containers';
import { extractFollowMode } from '../../helpers';
import { strings } from '../../i18n';
import {
  selectUserBoards,
  selectUserBoardsIsFirstFetch,
  selectUserBoardsIsLoading,
  selectUserBoardsIsRefreshing,
  selectUserBoardsNextPage,
  selectUserBoardsTotalPages,
} from '../../reducers/BoardsReducer';
import {
  selectUserPhotos,
  selectUserPhotosIsFirstFetch,
  selectUserPhotosIsLoading,
  selectUserPhotosIsRefreshing,
  selectUserPhotosNextPage,
  selectUserPhotosTotalPages,
} from '../../reducers/PostsReducer';
import {
  selectProfileFollowStatus,
  selectProfileIsPrivate,
  selectUserInfoIsFirstFetch,
  selectUsername,
} from '../../reducers/UsersReducer';

class Profile extends Component {
  componentWillMount() {
    const { updateUser, isAccessible } = this.props;
    updateUser()
      .then((response) => {
        if (isAccessible) {
          this.refreshBoards();
          this.refreshPhotos();
        }
      });
  }

  componentDidMount() {
    const { isAccessible } = this.props;
    if (isAccessible) {
      setTimeout(this.tabs.goToPage.bind(this.tabs, 1));
    }
  }

  render() {
    const { navigation, isAccessible, userInfoIsFirstFetch } = this.props;
    const username = navigation.getParam(Parameters.USERNAME);
    return (
      <Container>
        <ProfileHeader
          username={username}
          onEditPress={() => this.onEditPress()}
          onSettingsPress={() => this.onSettingsPress()}
        />
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}
        >
          {!userInfoIsFirstFetch
            ? (
              <View>
                <View style={{
                  marginTop: 16,
                  marginRight: 16,
                  marginBottom: 8,
                }}
                >
                  <ProfileInfo username={navigation.getParam(Parameters.USERNAME)}/>
                </View>
                {!(this.isSelfProfile()) ? <FollowButton username={username}/> : null}
              </View>
            ) : <Loading/>}
          {isAccessible ? this.renderSharedMaterial() : this.renderPrivate()}
        </View>
      </Container>
    );
  }

  renderPrivate() {
    return (
      <LottieView
        source={require('../../assets/animations/lock')}
        loop
        autoPlay
        speed={0.5}
        style={{ width: '100%' }}
      />
    );
  }

  renderSharedMaterial() {
    return (
      <Tabs
        ref={(component) => {
          this.tabs = component;
        }}
        tabBarUnderlineStyle={{ backgroundColor: Colors.ACCENT }}
        initialPage={1}
        locked
      >
        <Tab
          heading={strings(Strings.INTERESTS)}
          activeTextStyle={{
            color: Colors.TEXT,
            fontSize: 12,
          }}
          textStyle={{
            color: Colors.TEXT,
            fontSize: 12,
          }}
          tabStyle={{ backgroundColor: 'white' }}
          activeTabStyle={{ backgroundColor: 'white' }}
        >
          {this.props.boards.length === 0 && !this.props.boardsIsFirstFetch ? this.showBoardsEmpty() : this.renderBoardsList()}
        </Tab>
        <Tab
          heading={strings(Strings.PHOTOS)}
          activeTextStyle={{
            color: Colors.TEXT,
            fontSize: 12,
          }}
          textStyle={{
            color: Colors.TEXT,
            fontSize: 12,
          }}
          activeTabStyle={{ backgroundColor: 'white' }}
          tabStyle={{ backgroundColor: 'white' }}
        >
          {this.props.photos.length === 0 && !this.props.photosIsFirstFetch ? this.showPostsEmpty() : this.renderPhotosList()}
        </Tab>
      </Tabs>
    );
  }

  showPostsEmpty() {
    return (
      <View style={{
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
      }}
      >
        <View>
          <Text style={{
            color: Colors.ICON,
            fontSize: Constants.TEXT_NORMAL_SIZE,
          }}
          >
            {strings(Strings.NO_POSTS_YET)}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.refreshPhotos()}
            style={{ alignSelf: 'center' }}
          >
            <Icon name="refresh" type="MaterialCommunityIcons" style={{ color: Colors.ICON }}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderBoardsList() {
    const {
      boardsIsRefreshing, boardsIsFirstFetch, boards,
    } = this.props;
    return (
      <View>
        {(boardsIsFirstFetch) ? (<ActivityIndicator size="large"/>) : (
          <FlatList
            onRefresh={() => this.refreshBoards()}
            refreshing={boardsIsRefreshing}
            onEndReached={() => this.updateBoards()}
            style={{
              width: '100%',
              marginTop: 8,
            }}
            keyExtractor={(item, index) => item.id.toString()}
            data={boards}
            renderItem={({ item, index }) => this.renderBoard(item, index)}
          />
        )}
      </View>
    );
  }

  showBoardsEmpty() {
    return (
      <View style={{
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
      }}
      >
        <View>
          <Text style={{
            color: Colors.ICON,
            fontSize: Constants.TEXT_NORMAL_SIZE,
          }}
          >
            {strings(Strings.NO_BOARDS_YET)}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.refreshBoards()}
            style={{ alignSelf: 'center' }}
          >
            <Icon name="refresh" type="MaterialCommunityIcons" style={{ color: Colors.ICON }}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderPhotosList() {
    const {
      photosIsRefreshing, photosIsFirstFetch, photos, navigation,
    } = this.props;
    return (
      <PostsPhotoList
        data={photos}
        onRefresh={() => this.refreshPhotos()}
        refreshing={photosIsRefreshing}
        isFirstFetch={photosIsFirstFetch}
        onEndReached={() => this.updatePhotos()}
        onPhotoPress={postID => navigation.push(Pages.POST_INFO_PAGE, { postID })}
      />
    );
  }

  renderBoard(item, index) {
    return (
      <Board board={item} onAllPress={() => this.showBoardDetails(item)}/>
    );
  }

  refreshPhotos() {
    const {
      refreshPhotos, photosIsLoading, photosIsRefreshing, updateUser,
    } = this.props;
    if (!photosIsLoading && !photosIsRefreshing) {
      refreshPhotos();
      updateUser();
    }
  }

  updatePhotos() {
    const {
      photosNextPage, photosTotalPages, getPhotosNextPage, photosIsLoading, photosIsRefreshing,
    } = this.props;
    if (photosNextPage <= photosTotalPages && !photosIsLoading && !photosIsRefreshing) {
      getPhotosNextPage(photosNextPage);
    }
  }

  refreshBoards() {
    const {
      refreshBoards, boardsIsLoading, boardsIsRefreshing, updateUser,
    } = this.props;
    if (!boardsIsLoading && !boardsIsRefreshing) {
      refreshBoards();
      updateUser();
    }
  }

  updateBoards() {
    const {
      boardsNextPage, getBoardsNextPage, boardsTotalPages, boardsIsLoading, boardsIsRefreshing,
    } = this.props;
    if (boardsNextPage <= boardsTotalPages && !boardsIsLoading && !boardsIsRefreshing) {
      getBoardsNextPage(boardsNextPage);
    }
  }

  onEditPress() {
    this.props.navigation.navigate(Pages.PROFILE_EDIT);
  }

  onSettingsPress() {
    this.props.navigation.navigate(Pages.PROFILE_SETTINGS);
  }

  showBoardDetails(item) {
    this.props.navigation.push(Pages.BOARDS_PAGE, {
      board: item,
      isSelf: this.isSelfProfile(),
    });
  }

  isSelfProfile() {
    const { navigation, selfUsername } = this.props;
    const username = navigation.getParam(Parameters.USERNAME);
    if (!username) {
      return true;
    }
    return username === selfUsername;
  }
}

// If no username is passed, it means this is the profile of the logged in user
const mapStateToProps = (state, ownProps) => {
  const username = ownProps.navigation.getParam(Parameters.USERNAME);
  return {
    isAccessible: !(selectProfileIsPrivate(state, username)
      && extractFollowMode(selectProfileFollowStatus(state, username)) !== FollowModes.FOLLOWED)
      || (username ? selectUsername(state) === username : true),
    isPrivate: selectProfileIsPrivate(state, username),
    followingStatus: selectProfileFollowStatus(state, username),
    userInfoIsFirstFetch: selectUserInfoIsFirstFetch(state, username),
    selfUsername: selectUsername(state),
    photos: selectUserPhotos(state, username),
    photosNextPage: selectUserPhotosNextPage(state, username),
    photosTotalPages: selectUserPhotosTotalPages(state, username),
    photosIsFirstFetch: selectUserPhotosIsFirstFetch(state, username),
    photosIsRefreshing: selectUserPhotosIsRefreshing(state, username),
    photosIsLoading: selectUserPhotosIsLoading(state, username),
    boards: selectUserBoards(state, username),
    boardsNextPage: selectUserBoardsNextPage(state, username),
    boardsTotalPages: selectUserBoardsTotalPages(state, username),
    boardsIsFirstFetch: selectUserBoardsIsFirstFetch(state, username),
    boardsIsRefreshing: selectUserBoardsIsRefreshing(state, username),
    boardsIsLoading: selectUserBoardsIsLoading(state, username),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const username = ownProps.navigation.getParam(Parameters.USERNAME);
  return {
    updateUser: () => dispatch(updateUser(username)),
    refreshPhotos: () => dispatch(refreshUserPhotos(username)),
    refreshBoards: () => dispatch(refreshUserBoards(username)),
    getPhotosNextPage: photosNext => dispatch(getUserPhotosNextPage(photosNext, username)),
    getBoardsNextPage: boardsNext => dispatch(getUserBoardsNextPage(boardsNext, username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
