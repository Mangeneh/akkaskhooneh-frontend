import { Button, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import {
  addPostToBoard,
  choosePost,
  createBoard,
  getHomePostsNextPage,
  getPostInfo,
  getSelfBoardsNextPage,
  resetHomePosts,
  resetSelfBoards,
  selectedPostChanged,
  sendLikeOrDislike,
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.updatePosts();
    this.state = {
      newBoardName: '',
    };
  }

  render() {
    const { newBoardName } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <HomeHeader
          onAddFriendsPress={() => NavigationService.navigate(Pages.ADD_FRIENDS)}
          title={strings(Strings.APP_NAME)}
        />
        <Modal
          style={{
            width: 300,
            height: null,
            borderRadius: 5,
            justifyContent: 'center',
          }}
          position="center"
          ref="modal"
          backButtonClose
          coverScreen
        >
          <AddBoardModal
            newBoardName={newBoardName}
            onNameChange={newBoardName => this.setState({ newBoardName })}
            onAddPress={() => this.onAddPress()}
            onBoardNamePressed={selectedBoardID => this.addNewPostToBoard(selectedBoardID)}
          />
        </Modal>
        {this.renderContent()}
      </View>
    );
  }

  renderPost(item, index) {
    const { changeSelectedPostID } = this.props;
    return (
      <Post
        saveButtonPressed={() => {
          this.showModal();
          changeSelectedPostID(item.id);
        }}
        onLikePressed={() => this.likeOrDislike(item.id)}
        onCommentOrPicPressed={() => {
          this.getSinglePostInfo(item.id);
        }}
        item={item}
      />
    );
  }

  likeOrDislike(id) {
    const { sendLikeOrDislike, choosePost } = this.props;
    choosePost(id);
    sendLikeOrDislike(id)
      .then((response) => {

      })
      .catch((error) => {

      });
  }

  getSinglePostInfo(id) {
    const { changeSelectedPostID, getPostInfo, choosePost } = this.props;
    choosePost(id);
    getPostInfo(id)
      .then((response) => {
        changeSelectedPostID(id);
        NavigationService.navigate(Pages.POST_INFO_PAGE);
      })
      .catch((error) => {
        Toast.show({
          text: strings(Strings.SHOW_POST_INFO),
          textStyle: { textAlign: 'center' },
          position: 'bottom',
          type: 'danger',
        });
      });
  }

  renderContent() {
    const { posts, postsIsLoading } = this.props;
    return (posts.length === 0
    && !postsIsLoading ? this.renderNewUserFirstImpression() : this.renderFeed());
  }

  updatePosts() {
    const {
      postsNextPage, postsTotalPages, postsIsLoading, getPostsNextPage,
    } = this.props;
    if (postsNextPage <= postsTotalPages && !postsIsLoading) {
      getPostsNextPage(postsNextPage);
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
    const {
      resetHomePosts, getPostsNextPage, postsIsLoading, posts,
    } = this.props;
    return (
      <FlatList
        onRefresh={() => {
          resetHomePosts();
          getPostsNextPage(1);
        }}
        refreshing={postsIsLoading}
        onEndReached={() => this.updatePosts()}
        style={{
          width: '100%',
          marginTop: 8,
        }}
        keyExtractor={(item, index) => item.id.toString()}
        data={posts}
        renderItem={({ item, index }) => this.renderPost(item, index)}
      />
    );
  }

  showModal() {
    this.refs.modal.open();
  }

  onAddPress() {
    const { newBoardName } = this.state;
    if (newBoardName !== '') {
      this.props.createBoard(newBoardName)
        .then((response) => {
          this.onCreateBoardSuccess(response);
        })
        .catch((error) => {
          this.onCreateBoardFail(error);
        });
    }
  }

  onCreateBoardFail(error) {
    Toast.show({
      text: Strings.CREATE_NEW_BOARD_FAIL,
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'danger',
    });
  }

  onCreateBoardSuccess(response) {
    Toast.show({
      text: strings(Strings.CREATE_NEW_BOARD_SUCCESS),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'success',
    });
    this.addNewPostToBoard(response.payload.data.id);
  }

  addNewPostToBoard(selectedBoardID) {
    const { selectedPostID, addPostToBoard } = this.props;
    addPostToBoard(selectedPostID, selectedBoardID)
      .then((response) => {
      })
      .catch((error) => {
      });
    this.refs.modal.close();
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
  resetSelfBoards: () => dispatch(resetSelfBoards()),
  createBoard: newBoardName => dispatch(createBoard(newBoardName)),
  getPostsNextPage: postsNext => dispatch(getHomePostsNextPage(postsNext)),
  getBoardsNextPage: boardsNext => dispatch(getSelfBoardsNextPage(boardsNext)),
  addPostToBoard: (postID, boardID) => dispatch(addPostToBoard(postID, boardID)),
  getPostInfo: postID => dispatch(getPostInfo(postID)),
  sendLikeOrDislike: postID => dispatch(sendLikeOrDislike(postID)),
  choosePost: postID => dispatch(choosePost(postID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
