import React, {Component} from 'react';
import {Item, Right, Left, Icon} from 'native-base';
import {View, TouchableOpacity, StyleSheet, StatusBar, Text} from 'react-native'
import {Strings} from '../../config/Strings';
import {Colors} from "../../config/Colors";
import Constants from "../../config/Constants";
import BackHeader from "../../components/BackHeader";
import Fonts from "../../config/Fonts";

export default class ProfileSettings extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {SIGN_OUT, CHANGE_PASS} = Strings;
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.BASE}
                />
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={Strings.PROFILE_SETTINGS}/>
                <View style={{backgroundColor: 'white', flex: 1}}>
                    <View>
                        <Item onPress={this.onChangePassPressed.bind(this)}>
                            <Left>
                                <TouchableOpacity onPress={this.onChangePassPressed.bind(this)}>
                                    <Icon type={"Ionicons"} name='ios-arrow-back' style={{color: Colors.ACCENT}}/>
                                </TouchableOpacity>
                            </Left>
                            <Right>
                                <TouchableOpacity onPress={this.onChangePassPressed.bind(this)}>
                                    <Text style={styles.text}>
                                        {CHANGE_PASS}
                                    </Text>
                                </TouchableOpacity>
                            </Right>
                        </Item>
                    </View>
                </View>
                <TouchableOpacity style={{marginBottom: 0}}>
                    <Text style={styles.exit}>{SIGN_OUT}</Text>
                </TouchableOpacity>
            </View>
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
        fontFamily: Fonts.NORMAL_FONT,
        fontSize: 20,
        color: Colors.TEXT,
    },
    exit: {
        fontFamily: Fonts.NORMAL_FONT,
        fontSize: Constants.TEXT_NORMAL_SIZE,
        color: Colors.TEXT,
        textAlign: 'center'
    },
});