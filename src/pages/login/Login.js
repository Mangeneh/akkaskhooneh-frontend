import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import {Text, Toast} from 'native-base';
import {SocialIcon, Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {EmailTextBox, PasswordTextBox, CustomStatusBar} from '../../components';
import {Strings, Colors, PageModes, Fonts, Addresses} from '../../config';
import LoginButton from '../../containers/LoginButton';
import {emailChanged, Actions, loginUser, passwordChanged, reset, resetPassword, resetEmail} from './actions';
import {userUpdated, refreshTokenSet, accessTokenSet} from '../../actions/UserInfoActions';

class Login extends Component {
    render() {
        const {ENTER, FORGOT_PASSWORD, PASSWORD} = Strings;
        const {error, email, password, changeEmail, changePassword, resetEmail, resetPassword} = this.props;
        return (
            <View style={{flex: 1}}>
                <CustomStatusBar/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                    <View style={{backgroundColor: Colors.BASE, flex: 1}}>
                        {this.renderLogoSection()}
                        <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                            <View style={{marginLeft: 32, marginRight: 32}}>
                                <EmailTextBox error={error} value={email}
                                              onChangeEmail={(email) => changeEmail(email)}
                                              reset={() => resetEmail()}/>
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox error={error} value={password} placeholder={PASSWORD}
                                                 onChangePassword={(password) => changePassword(password)}
                                                 reset={() => resetPassword()}/>
                            </View>
                            <LoginButton onPress={() => this.onLoginPress()} text={ENTER} icon={'login'}/>
                            <TouchableOpacity style={{marginTop: 24}}>
                                <Text style={styles.text}>{FORGOT_PASSWORD}</Text>
                            </TouchableOpacity>
                        </View>
                        {this.renderOtherLoginSection()}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    renderLogoSection() {
        const {APP_NAME} = Strings;
        return (
            <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                <Avatar large rounded containerStyle={{marginBottom: 12}}
                        source={{uri: Addresses.LOGO}}/>
                <Text style={styles.text}>{APP_NAME}</Text>
            </View>
        )
    }

    renderOtherLoginSection() {
        const {SIGN_UP} = Strings;
        return (
            <View style={{flex: 1, justifyContent: 'center',}}>
                {this.renderOtherLoginButtons()}
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => this.onSignUpPress()}>
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

    onLoginPress() {
        const {email, password, loginUser} = this.props;
        loginUser(email, password)
            .then((response) => {
                if (response.type === Actions.LOGIN_SUCCESS) {
                    this.onSuccess(response);
                } else {
                    this.onFail(response);
                }
            });
    }

    onSuccess(response) {
        const {access, refresh} = response.payload.data;
        const {setAccessToken, setRefreshToken, updateUser, navigation, reset} = this.props;
        setAccessToken(access);
        setRefreshToken(refresh);
        updateUser();
        navigation.navigate('Main');
        reset();
    }

    onFail(response) {
        Toast.show({
            text: Strings.WRONG_CREDENTIALS,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'danger'
        });
    }

    onSignUpPress() {
        const {navigation, reset} = this.props;
        navigation.navigate('SignUp');
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
    email: state.loginPage.email.toLowerCase(),
    password: state.loginPage.password,
    mode: state.loginPage.mode,
    error: state.loginPage.mode === PageModes.ERROR
});

const mapDispatchToProps = (dispatch) => ({
    changeEmail: (email) => dispatch(emailChanged(email)),
    changePassword: (password) => dispatch(passwordChanged(password)),
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    setRefreshToken: (refreshToken) => dispatch(refreshTokenSet(refreshToken)),
    setAccessToken: (accessToken) => dispatch(accessTokenSet(accessToken)),
    updateUser: () => dispatch(userUpdated()),
    resetEmail: () => dispatch(resetEmail()),
    resetPassword: () => dispatch(resetPassword()),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);