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
import { Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomStatusBar, PostHeader } from '../../components';
import { Colors, Constants } from '../../config';
import {
  selectPostInfo,
} from '../../reducers/PostsReducer';
import { connect } from 'react-redux';

class PostInfo extends Component {
  render() {
    const {postInfo} = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View>
            <PostHeader onBackPress={() => this.props.navigation.navigate('Main')} />
          </View>
          <View>
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
                <Image
                  source={{ uri: postInfo.picture }}
                  style={{
                    height: 250,
                    width: null,
                    flex: 1,
                  }}
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
                    <Icon name="heart-outlined" type="Entypo" style={{ color: Colors.BASE }} active={postInfo.is_liked?true:false}/>
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
                    style={{ flexDirection: 'row' }} >
                    <Icon name="bookmark-o" type="FontAwesome" style={{ color: Colors.BASE }} />
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  postInfo: selectPostInfo(state),
});

export default connect(mapStateToProps, null)(PostInfo);
