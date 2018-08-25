import React, {Component} from 'react';
import {Container, Item, Header, Right, Left, Icon, Body} from 'native-base';
import {View, TouchableOpacity, StyleSheet, StatusBar, Text} from 'react-native'
import {Strings} from '../../config/Strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from "../../config/Colors";
import Constants from "../../config/Constants";
import BackHeader from "../../components/BackHeader";

export default class ProfileSettings extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {SIGN_OUT, CHANGE_PASS} = Strings;
        return (
            <KeyboardAwareScrollView>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.BASE}
                />
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={Strings.PROFILE_SETTINGS}/>
                <Header />
                <Container style={{backgroundColor: 'white', flex: 1}}>
                    <View style={{flex: 4}}>
                    <Item onPress={this.onChangePassPressed.bind(this)}>
                        <Left>
                            <TouchableOpacity>
                                <Icon type={"Ionicons"} name='ios-arrow-back' style={{color: Colors.ACCENT}}/> 
                            </TouchableOpacity> 
                        </Left>
                        <Right>
                            <TouchableOpacity>
                                <Text style={{fontFamily: Constants.NORMAL_FONT, fontSize: Constants.TEXT_NORMAL_SIZE, color: Colors.TEXT,}}>
                                    {CHANGE_PASS}
                                </Text>
                            </TouchableOpacity>
                        </Right>
                    </Item>
                    </View>
                    <View style={{flex: 2}}>
                        <TouchableOpacity style={{ marginBottom: 24}}>
                            <Text style={styles.text}>{SIGN_OUT}</Text>
                        </TouchableOpacity>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        );
    }

    onChangePassPressed() {
        this.props.navigation.navigate('Profile');
    }

    onBackPress() {
        this.props.navigation.navigate('Profile');
    }
}

const styles = StyleSheet.create({
    item: {
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: Constants.TEXT_BOX_RADIUS,
        elevation: Constants.TEXT_BOX_ELEVATION
    },

    text: {
        fontFamily: Constants.NORMAL_FONT,
        fontSize: Constants.TEXT_NORMAL_SIZE,
        color: Colors.TEXT,
        textAlign: 'center',
        alignSelf: 'center'
    }
});