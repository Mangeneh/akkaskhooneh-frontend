import React, {Component} from 'react';
import {Image, View} from 'react-native';
import Post from '../../components/Post';
import { PostHeader } from '../../components';
import { Colors, Constants, Strings} from '../../config';
import {CustomStatusBar} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {strings} from '../../i18n';
import {
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Item
} from 'native-base';

export default class PostInfo extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <CustomStatusBar/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                <View>
                    <PostHeader onBackPress={() => this.props.navigation.navigate('Main')}/>
                </View>
                <View>
                    <Card>
                        <CardItem>
                            <Left />
                            <Body/>
                            <Right style={{flexDirection: 'row', alignSelf: 'flex-end', paddingRight: 12}}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{
                                        fontSize: Constants.POST_NAME_FONT_SIZE,
                                        textAlign: 'right',
                                        paddingRight: 8
                                    }}>یاسمن جعفری</Text>
                                    <Text note style={{fontSize: Constants.POST_TIME_FONT_SIZE, paddingRight: 8}}>۲ ساعت
                                        پیش</Text>
                                    <Text/>
                                </View>
                                <Thumbnail source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5TH43KjTPkOGsCqmw8hjBcrHO-erQelSZ0FWlA29r0zOoJW92hg'}}/>
                            </Right>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5TH43KjTPkOGsCqmw8hjBcrHO-erQelSZ0FWlA29r0zOoJW92hg'}} style={{height: 250, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Item>
                                <Left/>
                                <Body/>
                                <Right>
                                    <Text style={{
                                        fontSize: Constants.ITEM_FONT_SIZE,
                                        textAlign: 'right'
                                    }}>همینجوری</Text>
                                    <Text/>
                                </Right>
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent style={{flexDirection: 'row'}}>
                                    <Icon name='heart-outlined' type='Entypo' style={{color: Colors.BASE}}/>
                                    <Text style={{color: Colors.BASE}}>2</Text>
                                </Button>
                                <Button transparent style={{flexDirection: 'row'}}>
                                    <Icon name='commenting-o' type='FontAwesome' style={{color: Colors.BASE}}/>
                                    <Text style={{color: Colors.BASE}}>4</Text>
                                </Button>
                                <Button transparent style={{flexDirection: 'row'}}>
                                    <Icon name='share-2' type='Feather' style={{color: Colors.BASE}}/>
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent style={{flexDirection: 'row'}} onPress={this.props.saveButtonPressed}>
                                    <Icon name='bookmark-o' type='FontAwesome' style={{color: Colors.BASE}}/>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </View>
                </KeyboardAwareScrollView>
            </View>
        )}
}