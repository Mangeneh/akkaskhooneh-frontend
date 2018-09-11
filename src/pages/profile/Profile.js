import { Container, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import {
  getSelfBoardsNextPage,
  getSelfPhotosNextPage,
  refreshSelfBoards,
  refreshSelfPhotos,
} from '../../actions';
import { Board, ProfileHeader } from '../../components';
import PostsPhotoList from '../../components/PostsPhotoList';
import { Colors, Pages, Strings } from '../../config';
import { SelfProfileInfo } from '../../containers';
import { strings } from '../../i18n';
import NavigationService from '../../NavigationService';
import {
  selectSelfBoards,
  selectSelfBoardsIsLoading,
  selectSelfBoardsNextPage,
  selectSelfBoardsTotalPages,
} from '../../reducers/BoardsReducer';
import {
  selectSelfPhotos,
  selectSelfPhotosIsLoading,
  selectSelfPhotosNextPage,
  selectSelfPhotosTotalPages,
} from '../../reducers/PostsReducer';
import { selectSelfUsername } from '../../reducers/UserInfoReducer';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.updatePhotos();
    this.updateBoards();
  }

  componentDidMount() {
    setTimeout(this.tabs.goToPage.bind(this.tabs, 1));
  }

  render() {
    const {
      username, refreshSelfPhotos, refreshSelfBoards, boardsIsLoading, boards, postsIsLoading, photosIsLoading, photos, navigation,
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
            <SelfProfileInfo />
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
                <FlatList
                  onRefresh={() => refreshSelfBoards()}
                  refreshing={boardsIsLoading}
                  onEndReached={() => this.updateBoards()}
                  style={{
                    width: '100%',
                    marginTop: 8,
                  }}
                  keyExtractor={(item, index) => item.id.toString()}
                  data={boards}
                  renderItem={({ item, index }) => this.renderBoard(item, index)}
                />
                {(postsIsLoading) ? (<ActivityIndicator size="large" />) : <View />}
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
                onRefresh={() => refreshSelfPhotos()}
                refreshing={photosIsLoading}
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

  updatePhotos() {
    const {
      photosNextPage, photosTotalPages, getPhotosNextPage, photosIsLoading,
    } = this.props;
    if (photosNextPage <= photosTotalPages && !photosIsLoading) {
      getPhotosNextPage(photosNextPage);
    }
  }

  updateBoards() {
    const {
      boardsNextPage, getBoardsNextPage, boardsTotalPages, boardsIsLoading,
    } = this.props;
    if (boardsNextPage <= boardsTotalPages && !boardsIsLoading) {
      getBoardsNextPage(boardsNextPage);
    }
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

const mapStateToProps = state => ({
  username: selectSelfUsername(state),
  photos: selectSelfPhotos(state),
  photosNextPage: selectSelfPhotosNextPage(state),
  photosTotalPages: selectSelfPhotosTotalPages(state),
  photosIsLoading: selectSelfPhotosIsLoading(state),
  boards: selectSelfBoards(state),
  boardsNextPage: selectSelfBoardsNextPage(state),
  boardsTotalPages: selectSelfBoardsTotalPages(state),
  boardsIsLoading: selectSelfBoardsIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  refreshSelfPhotos: () => dispatch(refreshSelfPhotos()),
  refreshSelfBoards: () => dispatch(refreshSelfBoards()),
  getPhotosNextPage: photosNext => dispatch(getSelfPhotosNextPage(photosNext)),
  getBoardsNextPage: boardsNext => dispatch(getSelfBoardsNextPage(boardsNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
