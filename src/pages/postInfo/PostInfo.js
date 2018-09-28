import {
  Button, Icon, Item, Textarea, Toast,
} from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View,
} from 'react-native';
import { connect } from 'react-redux';
import { getPostInfo, sendComment } from '../../actions';
import { CustomStatusBar, PostHeader } from '../../components';
import CommentComponent from '../../components/CommentComponent';
import Post from '../../components/Post';
import {
  Colors, Constants, Parameters, Strings,
} from '../../config';
import { strings } from '../../i18n';
import {
  selectIsSendingComment,
  selectPostInfo,
  selectPostInfoIsFirstFetch,
  selectPostInfoIsLoading,
} from '../../reducers/posts.ts';
import {
  generatePaginatorActionCreators,
  generatePaginatorSelectors,
} from '../../reducers/paginator.ts';
import { createPostCommentsURL } from '../../config/URLCreators';
import Loading from '../../components/Loading';

class PostInfo extends Component {
  state = {
    commentText: '',
  };

  componentWillMount() {
    this.getPostInfo();
    this.refreshComments();
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <PostHeader />
        <CustomStatusBar />
        <View style={{ flex: 1 }}>
          {this.renderPostAndComments()}
          {this.renderInputBox()}
        </View>
      </SafeAreaView>
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
    const { isFirstFetch, navigation } = this.props;
    const postID = navigation.getParam(Parameters.POST_ID);
    return (
      <View>
        {!isFirstFetch
          ? (
            <Post
              margin={0}
              postID={postID}
              home={false}
            />
          ) : <Loading />}
      </View>
    );
  }

  renderPostAndComments() {
    const { isRefreshing, comments } = this.props;
    return (
      <FlatList
        onRefresh={() => {
          this.getPostInfo();
          this.refreshComments();
        }}
        refreshing={isRefreshing}
        onEndReached={() => {
          this.loadMoreComments();
        }}
        ListHeaderComponent={this.renderPost()}
        style={{
          width: '100%',
        }}
        keyExtractor={(item, index) => index.toString()}
        data={comments}
        renderItem={({ item }) => this.renderComment(item)}
      />
    );
  }

  renderComment(item) {
    return <CommentComponent comment={item} />;
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

  getPostInfo() {
    const { isLoading, getPostInfo } = this.props;
    if (!isLoading) {
      getPostInfo();
    }
  }

  refreshComments() {
    const { isRefreshing, isLoading, refreshComments } = this.props;
    if (!isRefreshing && !isLoading) {
      refreshComments();
    }
  }

  loadMoreComments() {
    const {
      nextPage, totalPages, isLoading, loadMore,
    } = this.props;
    if (nextPage <= totalPages && !isLoading) {
      loadMore(nextPage);
    }
  }

  sendComment() {
    const { commentOnPost } = this.props;
    if (this.state.commentText !== '') {
      commentOnPost(this.state.commentText)
        .then((response) => {
          this.setState({ commentText: '' });
          setTimeout(() => {
            this.refreshComments();
          }, 1000);
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

const styles = StyleSheet.create({});

const mapStateToProps = (state, ownProps) => {
  const postID = ownProps.navigation.getParam(Parameters.POST_ID);
  const paginatorSelectors = generatePaginatorSelectors(state, 'post_comments_', postID);
  const {
    selectData, selectNextPage, selectTotalPages,
    selectIsFirstFetch, selectIsRefreshing, selectIsLoading,
  } = paginatorSelectors;
  return {
    postInfo: selectPostInfo(state, postID),
    postInfoIsFirstFetch: selectPostInfoIsFirstFetch(state, postID),
    postInfoIsLoading: selectPostInfoIsLoading(state, postID),
    isSendingComment: selectIsSendingComment(state, postID),
    comments: selectData(),
    nextPage: selectNextPage(),
    totalPages: selectTotalPages(),
    isFirstFetch: selectIsFirstFetch(),
    isRefreshing: selectIsRefreshing(),
    isLoading: selectIsLoading(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const postID = ownProps.navigation.getParam(Parameters.POST_ID);
  const paginatorActionCreators = generatePaginatorActionCreators('post_comments_', postID);
  const { refresh, loadMore } = paginatorActionCreators;
  return {
    refreshComments: () => dispatch(refresh(createPostCommentsURL(postID))),
    loadMoreComments: nextPage => dispatch(loadMore(createPostCommentsURL(postID, nextPage))),
    getPostInfo: () => dispatch(getPostInfo(postID)),
    commentOnPost: comment => dispatch(sendComment(postID, comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
