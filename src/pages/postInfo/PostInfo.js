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
  Toast,
} from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import {
  getCommentsNextPage, getPostInfo, refreshComments, sendComment,
} from '../../actions';
import { CustomStatusBar, PostHeader } from '../../components';
import CommentComponent from '../../components/CommentComponent';
import { Colors, Constants, Strings } from '../../config';
import {
  extractCaption,
  extractCommentsCount,
  extractIsLiked,
  extractLikesCount,
  extractOwnerUsername,
  extractPostPictureUri,
  extractProfilePictureUri,
} from '../../helpers';
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
  selectPostInfoIsLoading,
} from '../../reducers/PostsReducer';

const WIDTH = Dimensions.get('window').width;

class PostInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
    };
  }

  componentWillMount() {
    const { refreshComments, getPostInfo } = this.props;
    getPostInfo();
    refreshComments();
  }

  render() {
    const { navigation, postInfoIsLoading } = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <PostHeader onBackPress={() => navigation.navigate('Main')} />
        <CustomStatusBar />
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flexGrow: 1 }}>
            <View
              style={{
                flex: 4,
                marginBottom: 0,
              }}
            >
              {!postInfoIsLoading ? this.renderCard() : null}
            </View>
            <View style={{ flex: 4 }}>{this.renderCommentsList()}</View>
          </ScrollView>
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

  renderCard() {
    const { postInfo } = this.props;
    return (
      <Card>
        <CardItem>
          <Left />
          <Body />
          <Right
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              paddingRight: 12,
            }}
          >
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  fontSize: Constants.POST_NAME_FONT_SIZE,
                  textAlign: 'right',
                  paddingRight: 8,
                }}
              >
                {extractOwnerUsername(postInfo)}
              </Text>
              <Text
                note
                style={{
                  fontSize: Constants.POST_TIME_FONT_SIZE,
                  paddingRight: 8,
                }}
              >
                ۲ ساعت پیش
              </Text>
              <Text />
            </View>
            <Thumbnail source={{ uri: extractProfilePictureUri(postInfo) }} />
          </Right>
        </CardItem>
        <CardItem cardBody>
          <FastImage
            source={{ uri: extractPostPictureUri(postInfo) }}
            style={{
              height: WIDTH,
              width: WIDTH,
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
              <Text
                style={{
                  fontSize: Constants.ITEM_FONT_SIZE,
                  textAlign: 'right',
                }}
              >
                {extractCaption(postInfo)}
              </Text>
              <Text />
            </Right>
          </Item>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent style={{ flexDirection: 'row' }}>
              <Icon
                name={extractIsLiked(postInfo) ? 'heart' : 'heart-outlined'}
                type="Entypo"
                style={{ color: extractIsLiked(postInfo) ? 'red' : Colors.BASE }}
              />
              <Text style={{ color: Colors.BASE }}>{extractLikesCount(postInfo)}</Text>
            </Button>
            <Button transparent style={{ flexDirection: 'row' }}>
              <Icon name="commenting-o" type="FontAwesome" style={{ color: Colors.BASE }} />
              <Text style={{ color: Colors.BASE }}>{extractCommentsCount(postInfo)}</Text>
            </Button>
            <Button transparent style={{ flexDirection: 'row' }}>
              <Icon name="share-2" type="Feather" style={{ color: Colors.BASE }} />
            </Button>
          </Left>
          <Right>
            <Button transparent style={{ flexDirection: 'row' }}>
              <Icon name="bookmark-o" type="FontAwesome" style={{ color: Colors.BASE }} />
            </Button>
          </Right>
        </CardItem>
      </Card>
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
  const postID = ownProps.navigation.getParam('postID');
  return {
    postInfo: selectPostInfo(state, postID),
    postInfoIsLoading: selectPostInfoIsLoading(state, postID),
    isSendingComment: selectIsSendingComment(state, postID),
    comments: selectComments(state, postID),
    commentsNextPage: selectCommentsNextPage(state, postID),
    commentsTotalPages: selectCommentsTotalPages(state, postID),
    commentsIsRefreshing: selectCommentsIsRefreshing(state, postID),
    commentsIsFirstFetch: selectCommentsIsFirstFetch(state, postID),
    commentsIsLoading: selectCommentsIsLoading(state, postID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const postID = ownProps.navigation.getParam('postID');
  return {
    getPostInfo: () => dispatch(getPostInfo(postID)),
    commentOnPost: content => dispatch(sendComment(postID, content)),
    refreshComments: () => dispatch(refreshComments(postID)),
    getCommentsNextPage: commentsNext => dispatch(getCommentsNextPage(postID, commentsNext)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
