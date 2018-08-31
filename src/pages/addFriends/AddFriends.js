import React, {Component} from 'react';
import {View} from 'react-native';
import {Container, Header, Item, Input, Icon, Button, Text} from 'native-base';
import BackHeader from "../../components/BackHeader";
import {Colors, Constants, Fonts, Strings} from "../../config";
import {CustomStatusBar} from "../../components";

class AddFriends extends Component {
    render() {
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS, TEXT_BOX_ELEVATION} = Constants;
        return (
            <Container>
                <CustomStatusBar/>
                <BackHeader title={Strings.INVITE_FRIENDS} onBackPress={() => this.props.navigation.goBack()}/>
                <View style={{marginRight: 32,marginLeft: 32,marginTop: 16}}>
                    <Item rounded style={{
                        alignSelf: 'center',
                        backgroundColor: Colors.WHITE_BACK,
                        borderRadius: TEXT_BOX_RADIUS
                    }}>
                        <Icon name="ios-people"/>
                        <Input placeholder={Strings.SEARCH_CONTACT} style={{textAlign: 'right', fontSize: TEXT_BOX_FONT_SIZE}}
                               fontFamily={Fonts.NORMAL_FONT}/>
                        <Icon name="ios-search"/>
                    </Item>
                </View>
            </Container>
        );
    }
}

export default AddFriends;