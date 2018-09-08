import { Container, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator, Dimensions, FlatList, StyleSheet, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import {
  getSelfBoardsNextPage,
  getSelfPhotosNextPage,
  resetSelfBoards,
  resetSelfPhotos,
} from '../../actions';
import { Board, CustomStatusBar, ProfileHeader } from '../../components';
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

const WIDTH = Dimensions.get('window').width;

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
    return (
      <Container>
        <CustomStatusBar />
        <ProfileHeader
          username={this.props.username}
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
            ref={(component) => { this.tabs = component; }}
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
                  onRefresh={() => {
                    this.props.resetSelfBoards();
                    this.props.getBoardsNextPage(1);
                  }}
                  refreshing={this.props.boardsIsLoading}
                  onEndReached={() => this.updateBoards()}
                  style={{
                    width: '100%',
                    marginTop: 8,
                  }}
                  keyExtractor={(item, index) => item.id.toString()}
                  data={this.props.boards}
                  renderItem={({ item, index }) => this.renderBoard(item, index)}
                />
                {(this.props.postsIsLoading) ? (<ActivityIndicator size="large" />) : <View />}
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
              <View style={{
                backgroundColor: Colors.WHITE_BACK,
                flex: 1,
              }}
              >
                <FlatList
                  onRefresh={() => {
                    this.props.resetSelfPhotos();
                    this.props.getPhotosNextPage(1);
                  }}
                  refreshing={this.props.photosIsLoading}
                  onEndReached={() => this.updatePhotos()}
                  style={{
                    width: '100%',
                    marginTop: 8,
                  }}
                  numColumns={2}
                  keyExtractor={(item, index) => item.id}
                  data={this.props.photos}
                  renderItem={({ item, index }) => this.renderPhoto(item, index)}
                />
                {(this.props.photosIsLoading) ? (<ActivityIndicator size="large" />) : <View />}
              </View>
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }

  renderPhoto(item, index) {
    return (
      <View style={index % 2 === 0 ? styles.evenPhoto : styles.oddPhoto}>
        <FastImage
          source={{ uri: item.picture }}
          resizeMode={FastImage.resizeMode.center}
          style={{
            width: WIDTH / 2 - 12,
            height: WIDTH / 2 - 12,
          }}
        />
      </View>
    );
  }

  updatePhotos() {
    if (this.props.photosNextPage <= this.props.photosTotalPages && !this.props.photosIsLoading) {
      this.props.getPhotosNextPage(this.props.photosNextPage);
    }
  }

  updateBoards() {
    if (this.props.boardsNextPage <= this.props.boardsTotalPages && !this.props.boardsIsLoading) {
      this.props.getBoardsNextPage(this.props.boardsNextPage);
    }
  }

  renderBoard(item, index) {
    return (
      <Board board={item} onAllPress={() => this.showBoardDetails(item)} />
    );
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

const styles = StyleSheet.create({
  evenPhoto: {
    justifyContent: 'flex-start',
    marginRight: 4,
    marginLeft: 8,
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  oddPhoto: {
    justifyContent: 'flex-start',
    marginBottom: 8,
    marginRight: 8,
    marginLeft: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

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
  resetSelfPhotos: () => dispatch(resetSelfPhotos()),
  resetSelfBoards: () => dispatch(resetSelfBoards()),
  getPhotosNextPage: photosNext => dispatch(getSelfPhotosNextPage(photosNext)),
  getBoardsNextPage: boardsNext => dispatch(getSelfBoardsNextPage(boardsNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
