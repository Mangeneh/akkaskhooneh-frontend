import { Button, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import {
  addPostToBoard,
  createBoard,
  getHomePostsNextPage,
  getPostInfo,
  getUserBoardsNextPage,
  refreshHomePosts,
  refreshUserBoards,
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

  renderContent() {
    const { posts, postsIsLoading } = this.props;
    return (posts.length === 0
    && !postsIsLoading ? this.renderNewUserFirstImpression() : this.renderFeed());
  }

  renderFeed() {
    const {
      refreshHomePosts, postsIsLoading, posts,
    } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshHomePosts()}
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

  renderPost(item, index) {
    return (
      <Post
        saveButtonPressed={() => {
          this.showModal();
        }}
        onLikePressed={() => this.likeOrDislike(item.id)}
        onCommentOrPicPressed={() => {
          this.onCommentOrPicPressed(item.id);
        }}
        item={item}
      />
    );
  }

  likeOrDislike(id) {
    const { sendLikeOrDislike } = this.props;
    sendLikeOrDislike(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {

      });
  }

  onCommentOrPicPressed(id) {
    const { navigation } = this.props;
    navigation.push(Pages.POST_INFO_PAGE, { postID: id });
  }

  updatePosts() {
    const {
      postsNextPage, postsTotalPages, postsIsLoading, getPostsNextPage,
    } = this.props;
    if (postsNextPage <= postsTotalPages && !postsIsLoading) {
      getPostsNextPage(postsNextPage);
    }
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
    const { selectedPostID, addPostToBoard, refreshSelfBoards } = this.props;
    addPostToBoard(selectedPostID, selectedBoardID)
      .then((response) => {
      })
      .catch((error) => {
      });
    this.refs.modal.close();
    refreshSelfBoards();
  }
}

const mapStateToProps = state => ({
  posts: selectHomePosts(state),
  postsNextPage: selectHomePostsNextPage(state),
  postsTotalPages: selectHomePostsTotalPages(state),
  postsIsLoading: selectHomePostsIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  refreshHomePosts: () => dispatch(refreshHomePosts()),
  refreshSelfBoards: () => dispatch(refreshUserBoards()),
  createBoard: newBoardName => dispatch(createBoard(newBoardName)),
  getPostsNextPage: postsNext => dispatch(getHomePostsNextPage(postsNext)),
  getBoardsNextPage: boardsNext => dispatch(getUserBoardsNextPage(boardsNext)),
  addPostToBoard: (postID, boardID) => dispatch(addPostToBoard(postID, boardID)),
  getPostInfo: postID => dispatch(getPostInfo(postID)),
  sendLikeOrDislike: postID => dispatch(sendLikeOrDislike(postID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
