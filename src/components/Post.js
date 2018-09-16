import {
  Body, Card, CardItem, Icon, Left, Right, Text, Thumbnail, Toast,
} from 'native-base';
import React, { Component } from 'react';
import {
  Dimensions, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modalbox';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  addPostToBoard,
  createBoard,
  getUserBoardsNextPage,
  refreshUserBoards,
  sendLikeOrDislike,
} from '../actions';
import {
  Colors, Graphics, Pages, Parameters, Strings,
} from '../config';
import {
  calculateTimeDifference,
  extractCaption,
  extractCommentsCount,
  extractIsLiked,
  extractLikesCount,
  extractOwnerUsername,
  extractPostDate,
  extractPostID,
  extractPostPictureUri,
  extractProfilePictureUri,
  PlatformSpecificResizeMode,
} from '../helpers';
import { strings } from '../i18n';
import {
  selectPostInfo,
  selectPostInfoIsFirstFetch,
  selectPostInfoIsLoading,
} from '../reducers/PostsReducer';
import AddBoardModal from './AddBoardModal';
import MoreModal from './MoreModal';

const WIDTH = Dimensions.get('window').width;

class Post extends Component {
  state = {
    newBoardName: '',
  };

  render() {
    const { margin, home } = this.props;
    return (
      <View>
        <Card style={{
          borderRadius: home ? Graphics.POST_CARD_RADIUS : 0,
          marginRight: margin,
          marginLeft: margin,
          marginTop: 8,
        }}
        >
          {this.renderTop()}
          {this.renderBorder()}
          {this.renderPostPicture()}
          {this.renderBorder()}
          {this.renderCaption()}
          {this.renderBottom()}
        </Card>
        {this.renderSaveModal()}
        {this.renderMoreModal()}
      </View>
    );
  }

  renderMoreModal() {
    return (
      <Modal
        style={{
          width: 300,
          height: null,
          borderRadius: 5,
          justifyContent: 'center',
        }}
        position="center"
        ref="moreModal"
        backButtonClose
        coverScreen
      >
        <MoreModal />
      </Modal>
    );
  }

  renderSaveModal() {
    const { newBoardName } = this.state;
    return (
      <Modal
        style={{
          width: 300,
          height: null,
          borderRadius: 5,
          justifyContent: 'center',
        }}
        position="center"
        ref="saveModal"
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
    );
  }

  renderBorder() {
    return (<View style={styles.border} />);
  }

  renderTop() {
    const { postInfo } = this.props;
    return (
      <CardItem style={{ borderRadius: Graphics.POST_CARD_RADIUS }}>
        <Left />
        <Body />
        <Right style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
        }}
        >
          <View style={{
            flexDirection: 'column',
            marginRight: 8,
          }}
          >
            <TouchableOpacity onPress={() => this.showProfile()}>
              <Text style={{
                fontSize: Graphics.POST_OWNER_NAME_FONT_SIZE,
                textAlign: 'right',
                marginRight: 4,
              }}
              >
                {extractOwnerUsername(postInfo)}
              </Text>
            </TouchableOpacity>
            <Text
              note
              style={{
                fontSize: Graphics.POST_TIME_FONT_SIZE,
                marginRight: 8,
              }}
            >
              {calculateTimeDifference(extractPostDate(postInfo))}
            </Text>
          </View>
          <TouchableOpacity style={{ marginRight: 8 }} onPress={() => this.showProfile()}>
            <Thumbnail small source={{ uri: extractProfilePictureUri(postInfo) }} />
          </TouchableOpacity>
        </Right>
      </CardItem>
    );
  }

  renderPostPicture() {
    const { postInfo, margin, home } = this.props;
    return (
      <TouchableOpacity onPress={() => this.showCompletePost()} activeOpacity={home ? 0.9 : 1}>
        <CardItem cardBody>
          <FastImage
            source={{ uri: extractPostPictureUri(postInfo) }}
            style={{
              width: null,
              height: WIDTH - 2 * margin,
              flex: 1,
            }}
            resizeMode={PlatformSpecificResizeMode()}
          />
        </CardItem>
      </TouchableOpacity>
    );
  }

  renderCaption() {
    const { postInfo } = this.props;
    return (postInfo.caption
      ? (
        <View>
          <CardItem style={{ justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: Graphics.POST_CAPTION_FONT_SIZE }}>
              {extractCaption(postInfo)}
            </Text>
          </CardItem>
          {this.renderBorder()}
        </View>
      ) : null
    );
  }

  renderBottom() {
    const { postInfo, home } = this.props;
    return (
      <CardItem style={{ borderRadius: home ? Graphics.POST_CARD_RADIUS : 0 }}>
        <Left>
          <TouchableOpacity onPress={() => this.onLikePressed()}>
            <Icon
              name={extractIsLiked(postInfo) ? 'heart' : 'heart-outline'}
              type="MaterialCommunityIcons"
              style={{
                color: extractIsLiked(postInfo) ? 'red' : Colors.ICON,
                fontSize: Graphics.POST_ICONS_FONT_SIZE,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.stats}>{extractLikesCount(postInfo)}</Text>
          <TouchableOpacity onPress={() => this.showCompletePost()}>
            <Icon name="comment-text" type="MaterialCommunityIcons" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.stats}>{extractCommentsCount(postInfo)}</Text>
        </Left>
        <Right>
          <TouchableOpacity onPress={() => this.showSaveModal()}>
            <Icon name="bookmark-plus" type="MaterialCommunityIcons" style={styles.icon} />
          </TouchableOpacity>
        </Right>
      </CardItem>
    );
  }

  showSaveModal() {
    const { refreshSelfBoards } = this.props;
    refreshSelfBoards()
      .then(response => this.refs.saveModal.open());
  }

  showMoreModal() {
    this.refs.moreModal.open();
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
      text: strings(Strings.CREATE_NEW_BOARD_FAIL),
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

  addNewPostToBoard(boardID) {
    const { addPostToBoard, refreshSelfBoards } = this.props;
    addPostToBoard(boardID)
      .then((response) => {
      })
      .catch((error) => {
      });
    this.refs.saveModal.close();
    refreshSelfBoards();
  }

  showProfile() {
    const { navigation, postInfo } = this.props;
    navigation.push(Pages.OTHERS_PROFILE, { [Parameters.USERNAME]: extractOwnerUsername(postInfo) });
  }

  showCompletePost() {
    const { home, navigation, postInfo } = this.props;
    if (home) {
      navigation.push(Pages.POST_INFO_PAGE, { [Parameters.POST_ID]: extractPostID(postInfo) });
    }
  }

  onLikePressed() {
    const { sendLikeOrDislike, postInfo } = this.props;
    sendLikeOrDislike(extractPostID(postInfo));
  }
}

const styles = StyleSheet.create({
  icon: {
    color: Colors.ICON,
    fontSize: Graphics.POST_ICONS_FONT_SIZE,
  },
  stats: {
    color: Colors.ICON,
    marginTop: 2,
    marginRight: 8,
  },
  border: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.BORDER,
  },
});

const mapStateToProps = (state, ownProps) => {
  const { postID } = ownProps;
  return {
    postInfo: selectPostInfo(state, postID),
    postInfoIsFirstFetch: selectPostInfoIsFirstFetch(state, postID),
    postInfoIsLoading: selectPostInfoIsLoading(state, postID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { postID } = ownProps;
  return {
    sendLikeOrDislike: () => dispatch(sendLikeOrDislike(postID)),
    getBoardsNextPage: boardsNext => dispatch(getUserBoardsNextPage(boardsNext)),
    addPostToBoard: boardID => dispatch(addPostToBoard(postID, boardID)),
    refreshSelfBoards: () => dispatch(refreshUserBoards()),
    createBoard: newBoardName => dispatch(createBoard(newBoardName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Post));
