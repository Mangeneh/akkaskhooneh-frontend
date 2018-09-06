import { Button, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import {
  addPostToBoard,
  getHomePostsNextPage,
  getSelfBoardsNextPage,
  resetHomePosts,
  resetSelfBoards,
  selectedPostChanged,
} from '../../actions';
import { HomeHeader } from '../../components';
import AddBoardModal from '../../components/AddBoardModal';
import Post from '../../components/Post';
import {
  Colors, Constants, Pages, Strings,
} from '../../config';
import { strings } from '../../i18n';
import NavigationService from '../../NavigationService';
import { selectSelectedPostID } from '../../reducers/BoardsReducer';
import {
  selectHomePosts,
  selectHomePostsIsLoading,
  selectHomePostsNextPage,
  selectHomePostsTotalPages,
} from '../../reducers/PostsReducer';
import { boardNameChanged, createBoard } from './actions';


class Home extends Component {
  constructor(props) {
    super(props);
    this.updatePosts();
  }

  state = {
    newBoardName: '',
    visibleModal: false,
  };

  render() {
    const { boardName, changeBoardName } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <HomeHeader
          onAddFriendsPress={() => NavigationService.navigate(Pages.ADD_FRIENDS)}
          title={strings(Strings.APP_NAME)}
        />
        {this.renderContent()}
        <Modal
          isVisible={this.state.visibleModal}
          onBackdropPress={() => this.setState({ visibleModal: false })}
          onModalHide={() => changeBoardName('')}
        >
          <AddBoardModal
            value={boardName}
            onNameChange={boardName => changeBoardName(boardName)}
            onAddPress={() => this.onAddPress()}
            onBoardNamePressed={selectedBoardID => this.addNewPostToBoard(selectedBoardID)}
          />
        </Modal>
      </View>
    );
  }

  renderPost(item, index) {
    return (
      <Post
        saveButtonPressed={() => {
          this.showModal();
          this.props.changeSelectedPostID(item.id);
        }}
        item={item}
      />
    );
  }

  renderContent() {
    return (this.props.posts.length === 0 && !this.props.postsIsLoading ? this.renderNewUserFirstImpression() : this.renderFeed());
  }

  updatePosts() {
    if (this.props.postsNextPage <= this.props.postsTotalPages
      && !this.props.postsIsLoading) {
      this.props.getPostsNextPage(this.props.postsNextPage);
    }
  }

  renderNewUserFirstImpression() {
    return (
      <View style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      >
        <Text style={{
          fontSize: Constants.TEXT_NORMAL_SIZE,
          color: Colors.ICON,
          marginBottom: 8,
        }}
        >
          {strings(Strings.NEW_USER_FIRST_IMPRESSION)}
        </Text>
        <Button
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
          }}
          onPress={() => NavigationService.navigate(Pages.ADD_FRIENDS)}
        >
          <Text style={{
            fontSize: Constants.TEXT_NORMAL_SIZE,
            color: Colors.ICON,
          }}
          >
            {strings(Strings.INVITE_FRIENDS)}
          </Text>
        </Button>
      </View>
    );
  }

  renderFeed() {
    return (
      <FlatList
        onRefresh={() => {
          this.props.resetHomePosts();
          this.props.getPostsNextPage(1);
        }}
        refreshing={this.props.postsIsLoading}
        onEndReached={() => this.updatePosts()}
        style={{
          width: '100%',
          marginTop: 8,
        }}
        keyExtractor={(item, index) => item.id.toString()}
        data={this.props.posts}
        renderItem={({ item, index }) => this.renderPost(item, index)}
      />
    );
  }

  showModal() {
    this.setState({ visibleModal: true });
  }

  onCreateBoardFail(error) {
    Toast.show({
      text: Strings.CREATE_NEW_BOARD_FAIL,
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'danger',
    });
    this.setState({ visibleModal: false });
  }

  onCreateBoardSuccess(response) {
    Toast.show({
      text: strings(Strings.CREATE_NEW_BOARD_SUCCESS),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'success',
    });
    this.setState({ visibleModal: false });
    this.addNewPostToBoard(response.payload.data.id);
  }

  addNewPostToBoard(selectedBoardID) {
    const { selectedPostID } = this.props;
    this.props.addPostToBoard(selectedPostID, selectedBoardID)
      .then((response) => {
      })
      .catch((error) => {
      });
    this.setState({ visibleModal: false });
  }

  onAddPress() {
    const { boardName } = this.props;
    if (boardName !== '') {
      this.props.createBoard(boardName)
        .then((response) => {
          this.onCreateBoardSuccess(response);
        })
        .catch((error) => {
          this.onCreateBoardFail(error);
        });
    }
  }
}

const mapStateToProps = state => ({
  boardName: state.homePage.boardName,
  posts: selectHomePosts(state),
  postsNextPage: selectHomePostsNextPage(state),
  postsTotalPages: selectHomePostsTotalPages(state),
  postsIsLoading: selectHomePostsIsLoading(state),
  selectedPostID: selectSelectedPostID(state),
});

const mapDispatchToProps = dispatch => ({
  resetHomePosts: () => dispatch(resetHomePosts()),
  changeSelectedPostID: id => dispatch(selectedPostChanged(id)),
  changeBoardName: boardName => dispatch(boardNameChanged(boardName)),
  resetSelfBoards: () => dispatch(resetSelfBoards()),
  createBoard: boardName => dispatch(createBoard(boardName)),
  getPostsNextPage: postsNext => dispatch(getHomePostsNextPage(postsNext)),
  getBoardsNextPage: boardsNext => dispatch(getSelfBoardsNextPage(boardsNext)),
  addPostToBoard: (postID, boardID) => dispatch(addPostToBoard(postID, boardID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
