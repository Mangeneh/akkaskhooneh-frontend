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
  Thumbnail,
} from 'native-base';
import React, { Component } from 'react';
import {
  Dimensions, Platform, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Constants, Graphics } from '../config';
import {
  extractCaptionFromPost,
  extractPostPictureUriFromPost,
  extractProfilePictureUriFromPost
} from '../helpers';

const WIDTH = Dimensions.get('window').width;

export default class Post extends Component {
  render() {
    const {
      saveButtonPressed, item, onCommentOrPicPressed, onLikePressed,
    } = this.props;
    console.log(item);
    return (
      <Card style={{
        borderRadius: Graphics.POST_CARD_RADIUS,
        marginRight: 8,
        marginLeft: 8,
        marginTop: 8,
      }}
      >
        <CardItem style={{ borderRadius: Graphics.POST_CARD_RADIUS }}>
          <Left>
            <Button transparent style={{ flexDirection: 'row' }}>
              <Icon name="more-horizontal" type="Feather" style={styles.icon} />
            </Button>
          </Left>
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
                {item.owner_username}
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
            <Thumbnail source={{ uri: extractProfilePictureUriFromPost(item) }} />
          </Right>
        </CardItem>
        <TouchableOpacity onPress={onCommentOrPicPressed} activeOpacity={0.5}>
          <CardItem cardBody>
            <FastImage
              source={{ uri: extractPostPictureUriFromPost(item) }}
              style={{
                height: WIDTH - 128,
                width: null,
                flex: 1,
              }}
              resizeMode={Platform.OS === 'ios' ? FastImage.resizeMode.contain : FastImage.resizeMode.center}
            />
          </CardItem>
        </TouchableOpacity>
        <CardItem>
          <Item>
            <Text style={{
              fontSize: Constants.ITEM_FONT_SIZE,
              textAlign: 'right',
            }}
            >
              {extractCaptionFromPost(item)}
            </Text>
            <Text />
          </Item>
        </CardItem>
        <CardItem style={{ borderRadius: Graphics.POST_CARD_RADIUS }}>
          <Left>
            <Button transparent style={{ flexDirection: 'row' }} onPress={onLikePressed}>
              <Icon name={item.is_liked ? 'heart' : 'heart-outlined'} type="Entypo" style={{ color: item.is_liked ? 'red' : Colors.BASE }} />
              <Text style={styles.stats}>{item.likes}</Text>
            </Button>
            <Button
              transparent
              style={{ flexDirection: 'row' }}
              onPress={onCommentOrPicPressed}
            >
              <Icon name="commenting-o" type="FontAwesome" style={styles.icon} />
              <Text style={styles.stats}>{item.comments}</Text>
            </Button>
            <Button transparent style={{ flexDirection: 'row' }}>
              <Icon name="share-2" type="Feather" style={styles.icon} />
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              style={{ flexDirection: 'row' }}
              onPress={saveButtonPressed}
            >
              <Icon name="bookmark-o" type="FontAwesome" style={{ color: Colors.BASE }} />
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  icon: { color: Colors.ICON },
  stats: { color: Colors.TEXT },
});
