import React, {Component,} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import {Container, Icon, Item, Text} from 'native-base';
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import LoginButton from '../containers/LoginButton';
import {SocialIcon} from 'react-native-elements';
import {Strings} from '../config/Strings';
import RoundAvatar from "../components/RoundAvatar";
import {Colors} from "../config/Colors";
import EmailTextBox from "../components/EmailTextBox";
import PasswordTextBox from "../components/PasswordTextBox";
import Constants from "../config/Constants";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component {
    render() {
        const {ENTER, FORGOT_PASSWORD} = Strings;
        const {NORMAL_FONT} = Constants;
        return (
            <KeyboardAwareScrollView>
                <Container style={{backgroundColor: Colors.TEXT, flex: 1}}>
                    {this.renderLogoSection()}

                    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                        <View style={{marginLeft: 30, marginRight: 30}}>
                            <EmailTextBox onChangeEmail={this.onChangeEmail}/>
                        </View>
                        <View style={{marginTop: 15, marginLeft: 30, marginRight: 30}}>
                            <PasswordTextBox onChangePassword={this.onChangePassword}/>
                        </View>
                        <LoginButton text={ENTER} icon={"login"}/>
                        <TouchableOpacity style={{marginTop: 20}}>
                            <Text style={styles.text} fontFamily={NORMAL_FONT}>{FORGOT_PASSWORD}</Text>
                        </TouchableOpacity>
                    </View>

                    {this.renderOtherLoginSection()}
                </Container>
            </KeyboardAwareScrollView>
        );
    }

    onChangeEmail(email) {
        console.warn("emailsdnasdn")
    }

    onChangePassword(password) {

    }

    renderLogoSection() {
        const {APP_NAME} = Strings;
        const {NORMAL_FONT} = Constants;
        return (
            <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                <RoundAvatar style={{marginBottom: 10}}
                             uri={'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Chrome-icon.png'}/>
                <Text style={styles.text}
                      fontFamily={NORMAL_FONT}>{APP_NAME}</Text>
            </View>
        )
    }

    renderOtherLoginSection() {
        const {SIGN_UP} = Strings;
        const {NORMAL_FONT} = Constants;
        return (
            <View style={{flex: 1, justifyContent: 'center',}}>
                {this.renderOtherLoginButtons()}
                <TouchableOpacity style={{alignSelf: 'center'}}>
                    <Text style={styles.text} fontFamily={NORMAL_FONT}>{SIGN_UP}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderOtherLoginButtons() {
        return (
            <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 15}}>
                <TouchableOpacity>
                    <SocialIcon
                        light
                        type='facebook'
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <SocialIcon
                        light
                        type='google'
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <SocialIcon
                        light
                        type='twitter'
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {fontSize: Constants.TEXT_NORMAL_SIZE, color: 'white', textAlign: 'center', alignSelf: 'center'}
});