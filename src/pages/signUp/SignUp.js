import React, {Component,} from 'react';
import {Text, Toast} from 'native-base';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {SocialIcon, Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Strings, Colors, PageModes, Fonts, Addresses} from '../../config';
import {EmailTextBox, PasswordTextBox, CustomStatusBar} from '../../components';
import {
    emailChanged,
    validateEmail,
    passwordChanged,
    repeatedPasswordChanged,
    reset,
    resetEmail,
} from './actions';
import {SignUpButton} from '../../containers';
import {strings} from "../../i18n";

class SignUp extends Component {
    render() {
        const {SIGN_UP, PASSWORD, REPEAT_PASSWORD} = Strings;
        const {email, password, repeatedPassword, error, changeEmail, changePassword, resetEmail, changeRepeatedPassword} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: Colors.BASE,}}>
                <CustomStatusBar/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                    <View style={{backgroundColor: Colors.BASE, flex: 1}}>
                        {this.renderLogoSection()}
                        <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                            <View style={{marginLeft: 32, marginRight: 32}}>
                                <EmailTextBox error={error} reset={() => resetEmail()}
                                              value={email}
                                              onChangeEmail={(email) => changeEmail(email)}/>
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox placeholder={PASSWORD} value={password}
                                                 onChangePassword={(password) => changePassword(password)}/>
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox placeholder={REPEAT_PASSWORD} value={repeatedPassword}
                                                 onChangePassword={(repeatedPassword) => changeRepeatedPassword(repeatedPassword)}/>
                            </View>
                            <SignUpButton onPress={() => this.onSignUpPress()} text={SIGN_UP} icon={'login'}/>
                        </View>
                        {this.renderOtherLoginSection()}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    renderLogoSection() {
        return (
            <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                <Avatar large containerStyle={{marginBottom: 12}} rounded
                        source={{uri: Addresses.LOGO}}/>
                <Text style={styles.text}>{strings(Strings.APP_NAME)}</Text>
            </View>
        )
    }

    renderOtherLoginSection() {
        const {ENTER_LOGIN_PAGE} = Strings;
        return (
            <View style={{flex: 1, justifyContent: 'center',}}>
                {this.renderOtherLoginButtons()}
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => this.onReturnToLoginPress()}>
                    <Text style={styles.text}>{ENTER_LOGIN_PAGE}</Text>
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
                        type='facebook'/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <SocialIcon
                        light
                        type='google'/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <SocialIcon
                        light
                        type='twitter'/>
                </TouchableOpacity>
            </View>
        )
    }

    onSignUpPress() {
        const {email} = this.props;
        this.props.validateEmail(email)
            .then((response) => {
                this.onSuccess();
            })
            .catch((error) => {
                this.onFail(error);
            });
    }

    onSuccess() {
        const {email, password} = this.props;
        this.props.navigation.navigate('SignUpComplete', {email, password});
        this.props.reset();
    }

    onFail(error) {
        Toast.show({
            text: Strings.EMAIL_ALREADY_EXISTS,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'danger'
        });
    }

    onReturnToLoginPress() {
        const {navigation, reset} = this.props;
        navigation.navigate('Login');
        reset();
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: Fonts.NORMAL_FONT,
        fontSize: Fonts.TEXT_NORMAL_SIZE,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center'
    }
});

const mapStateToProps = (state) => ({
    email: state.signUpPage.email.toLowerCase(),
    password: state.signUpPage.password,
    repeatedPassword: state.signUpPage.repeatedPassword,
    mode: state.signUpPage.mode,
    error: state.signUpPage.mode === PageModes.ERROR,
});

const mapDispatchToProps = (dispatch) => ({
    changeEmail: (email) => dispatch(emailChanged(email)),
    changePassword: (password) => dispatch(passwordChanged(password)),
    changeRepeatedPassword: (repeatedPassword) => dispatch(repeatedPasswordChanged(repeatedPassword)),
    validateEmail: (email) => dispatch(validateEmail(email)),
    resetEmail: () => dispatch(resetEmail()),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)