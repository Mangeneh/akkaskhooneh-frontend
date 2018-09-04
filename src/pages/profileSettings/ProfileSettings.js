import React, {Component} from 'react';
import {Item, Right, Left, Icon} from 'native-base';
import {View, TouchableOpacity, StyleSheet, Text, SafeAreaView} from 'react-native'
import {connect} from 'react-redux';
import {Strings, Colors, Constants, Pages} from '../../config';
import {BackHeader, CustomStatusBar} from '../../components';
import {reset} from '../../actions/UserInfoActions';
import {strings} from "../../i18n";

class ProfileSettings extends Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={strings(Strings.PROFILE_SETTINGS)}/>
                <View style={{backgroundColor: 'white', flex: 1}}>
                    <CustomStatusBar/>
                    <View style={{flex: 1}}/>
                    <View style={{backgroundColor: 'white', flex: 10}}>
                        <View>
                            <Item onPress={this.onChangePassPressed.bind(this)}>
                                <Left>
                                    <TouchableOpacity onPress={this.onChangePassPressed.bind(this)}>
                                        <Icon type={'Ionicons'} name='ios-arrow-back'
                                              style={{color: Colors.ACCENT}}/>
                                    </TouchableOpacity>
                                </Left>
                                <Right>
                                    <TouchableOpacity onPress={this.onChangePassPressed.bind(this)}>
                                        <Text style={styles.text}>
                                            {strings(Strings.CHANGE_PASS)}
                                        </Text>
                                    </TouchableOpacity>
                                </Right>
                            </Item>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{marginBottom: 0, backgroundColor: 'white'}}
                                  onPress={this.onSignOutPress.bind(this)}>
                    <Text style={styles.exit}>{strings(Strings.SIGN_OUT)}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    onChangePassPressed() {
        this.props.navigation.navigate(Pages.CHANGE_PASS);
    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    onSignOutPress() {
        this.props.navigation.navigate(Pages.AUTH_STACK);
        this.props.reset();
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
        fontSize: 16,
        color: Colors.TEXT,
    },
    exit: {
        fontSize: Constants.TEXT_NORMAL_SIZE,
        color: Colors.TEXT,
        textAlign: 'center'
    },
});

const mapDispatchToProps = (dispatch) => ({
    reset: () => dispatch(reset())
});

export default connect(null, mapDispatchToProps)(ProfileSettings)