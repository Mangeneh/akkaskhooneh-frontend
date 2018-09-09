import {
  Body,
  Button,
  Card,
  CardItem,
  Icon,
  Item,
  Left,
  Right,
  Text,
  Textarea,
  Thumbnail,
} from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator, FlatList, SafeAreaView, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { getCommentsNextPage, refreshComments, sendComment } from '../../actions';
import { CustomStatusBar, PostHeader } from '../../components';
import CommentComponent from '../../components/CommentComponent';
import { Colors, Constants, Strings } from '../../config';
import { strings } from '../../i18n';
import {
  selectChosenPostID,
  selectComments,
  selectCommentsIsLoading,
  selectCommentsNextPage,
  selectCommentsSendLoading,
  selectCommentsTotalPages,
  selectPostInfo,
} from '../../reducers/PostsReducer';

class PostInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
    };
  }

  componentWillMount() {
    this.props.refreshComments(this.props.postId)
      .then((response) => {

      })
      .catch((error) => {

      });
  }

  render() {
    const { commentText } = this.state;
    const { postInfo, navigation, sendCommentLoading } = this.props;
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      >
        <PostHeader onBackPress={() => navigation.navigate('Main')} />
        <CustomStatusBar />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1 }}>
            <View style={{
              flex: 4,
              marginBottom: 0,
            }}
            >
              <Card>
                <CardItem>
                  <Left />
                  <Body />
                  <Right style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    paddingRight: 12,
                  }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{
                        fontSize: Constants.POST_NAME_FONT_SIZE,
                        textAlign: 'right',
                        paddingRight: 8,
                      }}
                      >
                        {postInfo.username}
                      </Text>
                      <Text
                        note
                        style={{
                          fontSize: Constants.POST_TIME_FONT_SIZE,
                          paddingRight: 8,
                        }}
                      >
                        ۲ ساعت
                        پیش
                      </Text>
                      <Text />
                    </View>
                    <Thumbnail
                      source={{ uri: postInfo.profile_picture }}
                    />
                  </Right>
                </CardItem>
                <CardItem cardBody>
                  <FastImage
                    source={{ uri: postInfo.picture }}
                    style={{
                      height: 250,
                      width: null,
                      flex: 1,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                </CardItem>
                <CardItem>
                  <Item>
                    <Left />
                    <Body />
                    <Right>
                      <Text style={{
                        fontSize: Constants.ITEM_FONT_SIZE,
                        textAlign: 'right',
                      }}
                      >
                        {postInfo.caption}
                      </Text>
                      <Text />
                    </Right>
                  </Item>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent style={{ flexDirection: 'row' }}>
                      <Icon
                        name={postInfo.is_liked ? 'heart' : 'heart-outlined'}
                        type="Entypo"
                        style={{ color: postInfo.is_liked ? 'red' : Colors.BASE }}
                      />
                      <Text style={{ color: Colors.BASE }}>{postInfo.likes_count}</Text>
                    </Button>
                    <Button transparent style={{ flexDirection: 'row' }}>
                      <Icon name="commenting-o" type="FontAwesome" style={{ color: Colors.BASE }} />
                      <Text style={{ color: Colors.BASE }}>{postInfo.comments_count}</Text>
                    </Button>
                    <Button transparent style={{ flexDirection: 'row' }}>
                      <Icon name="share-2" type="Feather" style={{ color: Colors.BASE }} />
                    </Button>
                  </Left>
                  <Right>
                    <Button
                      transparent
                      style={{ flexDirection: 'row' }}
                    >
                      <Icon name="bookmark-o" type="FontAwesome" style={{ color: Colors.BASE }} />
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            </View>
            <View style={{ flex: 4 }}>
              {this.renderCommentsList()}
            </View>
            <View style={{
              backgroundColor: Colors.LIGHT_GRAY,
              flex: 1,
              justifyContent: 'flex-end',
              alignSelf: 'center',
              width: '100%',
              height: 46,
            }}
            >
              <Item>
                {sendCommentLoading
                  ? (
                    <ActivityIndicator
                      size="large"
                      style={{
                        marginLeft: 12,
                        marginRight: 8,
                      }}
                      color={Colors.ACCENT}
                    />
                  ) : this.renderSendIcon()}
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
                    marginRight: this.props.sendCommentLoading ? 8 : 16,
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
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  renderCommentsList() {
    const {
      refreshComments, commentsIsLoading, comments, postId,
    } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshComments(postId)}
        refreshing={commentsIsLoading}
        onEndReached={() => this.updateComments()}
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
    return (
      <CommentComponent comment={item} />
    );
  }

  updateComments() {
    const {
      postId, commentsNextPage, commentsTotalPages, commentsIsLoading, getCommentsNextPage,
    } = this.props;
    if (commentsNextPage <= commentsTotalPages && !commentsIsLoading) {
      getCommentsNextPage(postId, commentsNextPage)
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
    const { commentOnPost, postId } = this.props;
    commentOnPost(postId, this.state.commentText)
      .then((response) => {
      })
      .catch((error) => {
      });
  }
}

const mapStateToProps = (state, ownProps) => {
  const postID = ownProps.navigation.getParam('postID');
  return ({
    postInfo: selectPostInfo(state, postID),
    sendCommentLoading: selectCommentsSendLoading(state, postID),
    postId: selectChosenPostID(state),
    comments: selectComments(state, postID),
    commentsNextPage: selectCommentsNextPage(state, postID),
    commentsTotalPages: selectCommentsTotalPages(state, postID),
    commentsIsLoading: selectCommentsIsLoading(state, postID),
  });
};

const mapDispatchToProps = dispatch => ({
  commentOnPost: (id, content) => dispatch(sendComment(id, content)),
  refreshComments: id => dispatch(refreshComments(id)),
  getCommentsNextPage: (id, commentsNext) => dispatch(getCommentsNextPage(id, commentsNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
