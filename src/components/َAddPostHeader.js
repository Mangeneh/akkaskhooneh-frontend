import React, {Component} from 'react';
import {Header, Left, Body, Right, Icon, Title, Text} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Strings, Fonts} from '../config';

class AddPostHeader extends Component {
    render() {
        return (
            <View>
                <Header androidStatusBarColor={Colors.BASE} style={{backgroundColor: Colors.BASE}}>
                    <Left style={{flex: 1, marginLeft: 16}}>
                        <TouchableOpacity onPress={() => {
                            this.props.onEditPress()
                        }}>
                            <Text style={{color: 'white', fontFamily: Fonts.NORMAL_FONT}}>{Strings.EDIT}</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title style={{
                        alignSelf: 'center',
                        color: 'white',
                        fontFamily: Fonts.NORMAL_FONT
                    }}>{this.props.username}</Title>
                    </Body>
                    <Right style={{flex: 1, marginRight: 16}}>
                        <TouchableOpacity onPress={() => this.props.onSettingsPress()}>
                            <Icon type={'MaterialCommunityIcons'} name='ship-wheel' style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </Right>
                </Header>
            </View>
        );
    }
}

export default connect(null, null)(AddPostHeader);