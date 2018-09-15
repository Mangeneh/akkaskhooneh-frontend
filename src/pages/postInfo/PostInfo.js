import {
  Button, Icon, Item, Textarea, Toast, Text,
} from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator, FlatList, SafeAreaView, ScrollView, View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  getCommentsNextPage, getPostInfo, refreshComments, sendComment,
} from '../../actions';
import { CustomStatusBar, PostHeader } from '../../components';
import CommentComponent from '../../components/CommentComponent';
import Post from '../../components/Post';
import {
  Colors, Constants, Graphics, Parameters, Strings,
} from '../../config';
import { extractPostID } from '../../helpers';
import { strings } from '../../i18n';
import {
  selectComments,
  selectCommentsIsFirstFetch,
  selectCommentsIsLoading,
  selectCommentsIsRefreshing,
  selectCommentsNextPage,
  selectCommentsTotalPages,
  selectIsSendingComment,
  selectPostInfo,
  selectPostInfoIsFirstFetch,
  selectPostInfoIsLoading,
} from '../../reducers/PostsReducer';

class PostInfo extends Component {
  state = {
    commentText: '',
  };

  componentWillMount() {
    this.getPostInfo();
    this.refreshComments();
  }

  render() {
    const { navigation, postInfoIsFirstFetch } = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <PostHeader onBackPress={() => navigation.goBack()} />
        <CustomStatusBar />
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flexGrow: 1 }}>
            <View
              style={{
                flex: 4,
                marginBottom: 0,
              }}
            >
              {!postInfoIsFirstFetch ? this.renderPost() : null}
            </View>
            <View style={{ flex: 4 }}>
              {this.props.comments.length === 0 && !this.props.commentsIsFirstFetch ? this.showEmpty() : this.renderCommentsList()}
            </View>
          </ScrollView>
          {this.renderInputBox()}
        </View>
      </SafeAreaView>
    );
  }

  showEmpty() {
    return (
      <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ color: Colors.ICON, fontSize: Constants.TEXT_NORMAL_SIZE }}>{strings(Strings.NO_COMMENTS_YET)}</Text>
      </View>
    );
  }

  renderInputBox() {
    const { commentText } = this.state;
    const { isSendingComment } = this.props;
    return (
      <View
        style={{
          backgroundColor: Colors.LIGHT_GRAY,
          alignSelf: 'center',
          width: '100%',
        }}
      >
        <Item>
          {isSendingComment ? (
            <ActivityIndicator
              size="large"
              style={{
                marginLeft: 12,
                marginRight: 8,
              }}
              color={Colors.ACCENT}
            />
          ) : (
              this.renderSendIcon()
            )}
          <Textarea
            rowSpan={2}
            placeholder={strings(Strings.COMMENT)}
            style={{
              backgroundColor: 'white',
              textAlign: 'right',
              fontSize: Constants.ITEM_FONT_SIZE,
              width: '80%',
              borderRadius: Constants.TEXT_BOX_RADIUS,
              marginLeft: 8,
              marginRight: isSendingComment ? 8 : 16,
              marginTop: 8,
              marginBottom: 8,
            }}
            value={commentText}
            onChangeText={(commentText) => {
              this.setState({ commentText });
            }}
          />
        </Item>
      </View>
    );
  }

  renderPost() {
    const postID = this.props.navigation.getParam(Parameters.POST_ID);
    return (
      <Post
        margin={0}
        postID={postID}
        imageHeight={Graphics.POST_IMAGE_HEIGHT}
        home={false}
      />
    );
  }

  renderCommentsList() {
    const { refreshComments, commentsIsRefreshing, comments } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshComments()}
        refreshing={commentsIsRefreshing}
        onEndReached={() => {
          this.updateComments();
        }}
        style={{
          width: '100%',
          marginTop: 8,
        }}
        keyExtractor={(item, index) => index.toString()}
        data={comments}
        renderItem={({ item, index }) => this.renderComment(item, index)}
      />
    );
  }

  renderComment(item, index) {
    return <CommentComponent comment={item} />;
  }

  getPostInfo() {
    const { postInfoIsLoading, getPostInfo } = this.props;
    if (!postInfoIsLoading) {
      getPostInfo();
    }
  }

  refreshComments() {
    const { commentsIsRefreshing, commentsIsLoading, refreshComments } = this.props;
    if (!commentsIsRefreshing && !commentsIsLoading) {
      refreshComments();
    }
  }

  updateComments() {
    const {
      commentsNextPage, commentsTotalPages, commentsIsLoading, getCommentsNextPage,
    } = this.props;
    if (commentsNextPage <= commentsTotalPages && !commentsIsLoading) {
      getCommentsNextPage(commentsNextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  renderSendIcon() {
    return (
      <Button
        transparent
        style={{
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}
        onPress={() => this.sendComment()}
      >
        <Icon name="send" type="FontAwesome" style={{ color: Colors.ACCENT }} />
      </Button>
    );
  }

  sendComment() {
    const { commentOnPost, refreshComments } = this.props;
    if (this.state.commentText !== '') {
      commentOnPost(this.state.commentText)
        .then((response) => {
          this.setState({ commentText: '' });
          refreshComments();
        })
        .catch((error) => {
          this.setState({ commentText: '' });
          Toast.show({
            text: strings(Strings.COMMENT_FAILED),
            textStyle: { textAlign: 'center' },
            position: 'bottom',
            type: 'danger',
          });
        });
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const postID = ownProps.navigation.getParam(Parameters.POST_ID);
  return {
    postInfo: selectPostInfo(state, postID),
    postInfoIsFirstFetch: selectPostInfoIsFirstFetch(state, postID),
    postInfoIsLoading: selectPostInfoIsLoading(state, postID),
    comments: selectComments(state, postID),
    commentsNextPage: selectCommentsNextPage(state, postID),
    commentsTotalPages: selectCommentsTotalPages(state, postID),
    commentsIsFirstFetch: selectCommentsIsFirstFetch(state, postID),
    commentsIsRefreshing: selectCommentsIsRefreshing(state, postID),
    commentsIsLoading: selectCommentsIsLoading(state, postID),
    isSendingComment: selectIsSendingComment(state, postID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const postID = ownProps.navigation.getParam(Parameters.POST_ID);
  return {
    getPostInfo: () => dispatch(getPostInfo(postID)),
    refreshComments: () => dispatch(refreshComments(postID)),
    getCommentsNextPage: commentsNext => dispatch(getCommentsNextPage(postID, commentsNext)),
    commentOnPost: comment => dispatch(sendComment(postID, comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
