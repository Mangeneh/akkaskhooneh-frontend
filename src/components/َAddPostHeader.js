import React, {Component} from 'react';
import {Header, Left, Body, Right, Icon, Title, Text} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Strings} from '../config';
import {strings} from "../i18n";

class AddPostHeader extends Component {
    render() {
        return (
            <View>
                <Header androidStatusBarColor={Colors.BASE} style={{backgroundColor: Colors.BASE}}>
                    <Left style={{flex: 1, marginLeft: 16}}>
                        <TouchableOpacity onPress={() => {
                            this.props.onEditPress()
                        }}>
                            <Text style={{color: 'white'}}>{strings(Strings.EDIT)}</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title style={{
                        alignSelf: 'center',
                        color: 'white'
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