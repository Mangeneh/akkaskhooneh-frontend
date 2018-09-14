import {
  Body, Card, CardItem, Icon, Left, Right, Text, Thumbnail,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { sendLikeOrDislike } from '../actions';
import {
  Colors, Graphics, Pages, Parameters,
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

class Post extends Component {
  render() {
    const { margin } = this.props;
    return (
      <Card style={{
        borderRadius: Graphics.POST_CARD_RADIUS,
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
    );
  }

  renderBorder() {
    return (<View style={styles.border} />);
  }

  renderTop() {
    const { post } = this.props;
    return (
      <CardItem style={{ borderRadius: Graphics.POST_CARD_RADIUS }}>
        <Left>
          <TouchableOpacity hitSlop={Graphics.HIT_SLOP}>
            <Icon name="dots-horizontal" type="MaterialCommunityIcons" style={styles.icon} />
          </TouchableOpacity>
        </Left>
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
                {extractOwnerUsername(post)}
              </Text>
            </TouchableOpacity>
            <Text
              note
              style={{
                fontSize: Graphics.POST_TIME_FONT_SIZE,
                marginRight: 8,
              }}
            >
              {calculateTimeDifference(extractPostDate(post))}
            </Text>
          </View>
          <View style={{ marginRight: 8 }}>
            <Thumbnail small source={{ uri: extractProfilePictureUri(post) }} />
          </View>
        </Right>
      </CardItem>
    );
  }

  renderPostPicture() {
    const { post, imageHeight } = this.props;
    return (
      <TouchableOpacity onPress={() => this.showCompletePost()} activeOpacity={0.8}>
        <CardItem cardBody>
          <FastImage
            source={{ uri: extractPostPictureUri(post) }}
            style={{
              width: null,
              height: imageHeight,
              flex: 1,
            }}
            resizeMode={PlatformSpecificResizeMode()}
          />
        </CardItem>
      </TouchableOpacity>
    );
  }

  renderCaption() {
    const { post } = this.props;
    return (post.caption
      ? (
        <View>
          <CardItem style={{ justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: Graphics.POST_CAPTION_FONT_SIZE }}>
              {extractCaption(post)}
            </Text>
          </CardItem>
          {this.renderBorder()}
        </View>
      ) : null
    );
  }

  renderBottom() {
    const {
      saveButtonPressed, post,
    } = this.props;
    return (
      <CardItem style={{ borderRadius: Graphics.POST_CARD_RADIUS }}>
        <Left>
          <TouchableOpacity onPress={() => this.onLikePressed()}>
            <Icon
              name={extractIsLiked(post) ? 'heart' : 'heart-outline'}
              type="MaterialCommunityIcons"
              style={{
                color: extractIsLiked(post) ? 'red' : Colors.ICON,
                fontSize: Graphics.POST_ICONS_FONT_SIZE,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.stats}>{extractLikesCount(post)}</Text>
          <TouchableOpacity onPress={() => this.showCompletePost()}>
            <Icon name="comment-text" type="MaterialCommunityIcons" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.stats}>{extractCommentsCount(post)}</Text>
          <TouchableOpacity>
            <Icon name="share-variant" type="MaterialCommunityIcons" style={styles.icon} />
          </TouchableOpacity>
        </Left>
        <Right>
          <TouchableOpacity onPress={saveButtonPressed}>
            <Icon name="bookmark-plus" type="MaterialCommunityIcons" style={styles.icon} />
          </TouchableOpacity>
        </Right>
      </CardItem>
    );
  }

  showProfile() {
    const { navigation, post } = this.props;
    navigation.push(Pages.OTHERS_PROFILE, { [Parameters.USERNAME]: extractOwnerUsername(post) });
  }

  showCompletePost() {
    const { home, navigation, post } = this.props;
    if (home) {
      navigation.push(Pages.POST_INFO_PAGE, { [Parameters.POST_ID]: extractPostID(post) });
    }
  }

  onLikePressed() {
    const { sendLikeOrDislike, post } = this.props;
    sendLikeOrDislike(extractPostID(post));
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  sendLikeOrDislike: postID => dispatch(sendLikeOrDislike(postID)),
});

export default connect(null, mapDispatchToProps)(withNavigation(Post));
