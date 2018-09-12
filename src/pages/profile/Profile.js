import { Container, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import {
  getUserBoardsNextPage,
  getUserPhotosNextPage,
  refreshUserBoards,
  refreshUserPhotos,
} from '../../actions';
import { Board, ProfileHeader } from '../../components';
import PostsPhotoList from '../../components/PostsPhotoList';
import {
  Colors, Pages, Parameters, Strings,
} from '../../config';
import { ProfileInfo } from '../../containers';
import { strings } from '../../i18n';
import NavigationService from '../../NavigationService';
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

class Profile extends Component {
  componentWillMount() {
    this.refreshBoards();
    this.refreshPhotos();
  }

  componentDidMount() {
    setTimeout(this.tabs.goToPage.bind(this.tabs, 1));
  }

  render() {
    const {
      username, boardsIsRefreshing, boardsIsFirstFetch, boards, photosIsRefreshing, photosIsFirstFetch, photos, navigation,
    } = this.props;
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
          <View style={{
            marginTop: 16,
            marginRight: 16,
            marginBottom: 8,
          }}
          >
            <ProfileInfo onListPressed={() => this.onListPressed()} />
          </View>
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
              <View style={{
                backgroundColor: Colors.WHITE_BACK,
                flex: 1,
              }}
              >
                {(boardsIsFirstFetch) ? (<ActivityIndicator size="large" />) : (
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
              <PostsPhotoList
                data={photos}
                onRefresh={() => this.refreshPhotos()}
                refreshing={photosIsRefreshing}
                isFirstFetch={photosIsFirstFetch}
                onEndReached={() => this.updatePhotos()}
                onPhotoPress={postID => navigation.push(Pages.POST_INFO_PAGE, { postID })}
              />
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }

  renderBoard(item, index) {
    return (
      <Board board={item} onAllPress={() => this.showBoardDetails(item)} />
    );
  }

  refreshPhotos() {
    const {
      refreshPhotos, photosIsLoading, photosIsRefreshing,
    } = this.props;
    if (!photosIsLoading && !photosIsRefreshing) {
      refreshPhotos();
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
      refreshBoards, boardsIsLoading, boardsIsRefreshing,
    } = this.props;
    if (!boardsIsLoading && !boardsIsRefreshing) {
      refreshBoards();
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

  onListPressed() {
    this.props.navigation.push(Pages.CONTACT_LIST, { username: this.props.username });
  }

  onEditPress() {
    NavigationService.navigate(Pages.PROFILE_EDIT);
  }

  onSettingsPress() {
    NavigationService.navigate(Pages.PROFILE_SETTINGS);
  }

  showBoardDetails(item) {
    NavigationService.navigate(Pages.BOARDS_PAGE, { board: item });
  }
}

const mapStateToProps = (state, ownProps) => {
  const username = ownProps.navigation.getParam(Parameters.USERNAME);
  return {
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
    refreshPhotos: () => dispatch(refreshUserPhotos(username)),
    refreshBoards: () => dispatch(refreshUserBoards(username)),
    getPhotosNextPage: photosNext => dispatch(getUserPhotosNextPage(photosNext, username)),
    getBoardsNextPage: boardsNext => dispatch(getUserBoardsNextPage(boardsNext, username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
