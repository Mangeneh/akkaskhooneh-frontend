import React, {Component} from 'react';
import {Header, Left, Body, Right, Icon, Title} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import {Colors, Fonts} from '../config';

export default class SelfBoardsPageHeader extends Component {
    render() {
        const {boardName, onDeletePress, onAddPress} = this.props;
        return (
            <View>
                <Header androidStatusBarColor={Colors.BASE} style={{backgroundColor: Colors.BASE}}>
                    <Left style={{flex: 1, marginLeft: 4}}>
                        <TouchableOpacity onPress={() => onDeletePress()}>
                            <Icon type={'MaterialCommunityIcons'} name='arrow-left' style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title style={{
                        alignSelf: 'center',
                        color: 'white'
                    }}>{boardName}</Title>
                    </Body>
                    <Right style={{flex: 1, marginRight: 4}}>
                        <TouchableOpacity onPress={() => onAddPress()}>
                            <Icon type={'MaterialCommunityIcons'} name='plus' style={{marginRight: 4, color: 'white'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onDeletePress()}>
                            <Icon type={'MaterialCommunityIcons'} name='delete' style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </Right>
                </Header>
            </View>
        );
    }
}