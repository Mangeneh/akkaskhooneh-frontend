import React, { Component } from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Constants, Colors, Fonts } from '../config';

export default class Post extends Component {
  render() {
    return (
      <Card style= {{borderRadius: Constants.POST_CARD_RADIUS, marginRight: 8, marginLeft: 8, marginTop: 10}}>
        <CardItem style= {{borderRadius: Constants.POST_CARD_RADIUS}}>
          <Left>
            <Button transparent style={{flexDirection: 'row'}}>
                <Icon name='more-horizontal' type='Feather' style={{color: Colors.BASE}}/>
            </Button>
          </Left>
          <Body />
          <Right style={{flexDirection: 'row', alignSelf: 'flex-end', marginRight: 24}}>
              <View style={{flexDirection: 'column'}}>
                <Text style = {{fontFamily: Fonts.NORMAL_FONT, fontSize: Constants.POST_NAME_FONT_SIZE, marginRight: 8}}>یاسمن جعفری</Text>
                <Text note style = {{fontFamily: Fonts.NORMAL_FONT, fontSize: Constants.POST_TIME_FONT_SIZE}}>۲ ساعت پیش</Text>
                <Text />
              </View>
              <Thumbnail source={{uri: 'https://www.publicdomainpictures.net/pictures/250000/velka/paint-abstract-colorful-background.jpg'}}/>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: this.props.imageSource}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
        <CardItem style= {{borderRadius: Constants.POST_CARD_RADIUS}}>
          <Left>
            <Button transparent style={{flexDirection: 'row'}}>
              <Icon name='heart-outlined' type='Entypo' style={{color: Colors.BASE}}/>
              <Text style={{color: Colors.BASE}}>12</Text>
            </Button>
            <Button transparent style={{flexDirection: 'row' }}>
              <Icon name='commenting-o' type='FontAwesome' style={{color: Colors.BASE}}/>
               <Text style={{color: Colors.BASE}}>4</Text>
            </Button>
            <Button transparent style={{flexDirection: 'row'}}>
              <Icon name='share-2' type='Feather' style={{color: Colors.BASE}}/>
            </Button>
          </Left>
          <Right>
            <Button transparent style={{flexDirection: 'row'}}>
                <Icon name='bookmark-o' type='FontAwesome' style={{color: Colors.BASE}}/>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}