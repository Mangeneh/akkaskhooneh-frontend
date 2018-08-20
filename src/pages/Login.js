import React, {Component,} from 'react';
import {Container, Text} from 'native-base';
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import {SocialIcon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import RoundAvatar from "../components/RoundAvatar";
import LoginButton from '../containers/LoginButton';
import {Strings} from '../config/Strings';
import {Colors} from "../config/Colors";
import EmailTextBox from "../components/EmailTextBox";
import PasswordTextBox from "../components/PasswordTextBox";
import Constants from "../config/Constants";
import {emailChanged, modeChanged, passwordChanged} from "../actions/LoginPageActions";
import {LoginPageModes} from "../config/LoginPageModes";

class Login extends Component {
    render() {
        const {ENTER, FORGOT_PASSWORD} = Strings;
        return (
            <KeyboardAwareScrollView>
                <Container style={{backgroundColor: Colors.BASE, flex: 1}}>
                    {this.renderLogoSection()}
                    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                        <View style={{marginLeft: 32, marginRight: 32}}>
                            <EmailTextBox error={false} onChangeEmail={(email) => this.onEmailChange(email)}/>
                        </View>
                        <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                            <PasswordTextBox error={false} onChangePassword={(password) => this.onPasswordChange(password)}/>
                        </View>
                        <LoginButton onPress={this.onLoginPress.bind(this)} text={ENTER} icon={"login"}/>
                        <TouchableOpacity style={{marginTop: 24}}>
                            <Text style={styles.text}>{FORGOT_PASSWORD}</Text>
                        </TouchableOpacity>
                    </View>
                    {this.renderOtherLoginSection()}
                </Container>
            </KeyboardAwareScrollView>
        );
    }

    onEmailChange(email) {
        this.props.changeEmail(email);
        this.validateEmailLocally(email);
    }

    onPasswordChange(password) {
        this.props.changePassword(password);
        this.validatePasswordLocally(password);
    }

    validateEmailLocally(email) {
        const {password} = this.props;
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (password.length < 6 || reg.test(email) === false) {
            this.props.changeMode(LoginPageModes.DISABLED)
        } else {
            this.props.changeMode(LoginPageModes.NORMAL)
        }
    }

    validatePasswordLocally(password) {
        const {email} = this.props;
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (password.length < 6 || reg.test(email) === false) {
            this.props.changeMode(LoginPageModes.DISABLED)
        } else {
            this.props.changeMode(LoginPageModes.NORMAL)
        }
    }

    onLoginPress() {
        const {email, password} = this.props;
        console.warn(email)
    }

    renderLogoSection() {
        const {APP_NAME} = Strings;
        const {NORMAL_FONT} = Constants;
        return (
            <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                <RoundAvatar style={{marginBottom: 12}}
                             uri={'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Chrome-icon.png'}/>
                <Text style={styles.text}
                >{APP_NAME}</Text>
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
                    <Text style={styles.text}>{SIGN_UP}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderOtherLoginButtons() {
        return (
            <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 16}}>
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
    text: {
        fontFamily: Constants.NORMAL_FONT,
        fontSize: Constants.TEXT_NORMAL_SIZE,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center'
    }
});

const mapStateToProps = (state) => ({
    email: state.loginPage.email,
    password: state.loginPage.password,
    mode: state.loginPage.mode,
});

const mapDispatchToProps = (dispatch) => ({
    changeEmail: (email) => dispatch(emailChanged(email)),
    changePassword: (password) => dispatch(passwordChanged(password)),
    changeMode: (mode) => dispatch(modeChanged(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)