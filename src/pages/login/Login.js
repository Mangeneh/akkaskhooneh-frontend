import React, {Component,} from 'react';
import {TouchableOpacity, View, StyleSheet, StatusBar} from 'react-native'
import {Text, Toast} from 'native-base';
import {SocialIcon, Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {checkEmail, checkPassword} from "../../helpers/Validators";
import {EmailTextBox, PasswordTextBox} from '../../components';
import {Strings, Colors, PageModes, Fonts} from '../../config';
import LoginButton from '../../containers/LoginButton';
import {
    emailChanged,
    Actions,
    loginUser,
    modeChanged,
    passwordChanged,
    reset,
    resetPassword,
    resetEmail
} from './actions';
import {userUpdated, refreshTokenSet, accessTokenSet} from '../../actions/UserInfoActions';

class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {ENTER, FORGOT_PASSWORD, PASSWORD} = Strings;
        const {error, email, password} = this.props;
        return (
            <View style={{flex: 1}}>

                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                    <StatusBar barStyle='light-content'
                               backgroundColor={Colors.BASE}/>
                    <View style={{backgroundColor: Colors.BASE, flex: 1}}>
                        {this.renderLogoSection()}
                        <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                            <View style={{marginLeft: 32, marginRight: 32}}>
                                <EmailTextBox error={error} value={email}
                                              onChangeEmail={(email) => this.onEmailChange(email)}
                                              reset={() => this.props.resetEmail()}/>
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox error={error} value={password} placeholder={PASSWORD}
                                                 onChangePassword={(password) => this.onPasswordChange(password)}
                                                 reset={() => this.props.resetPassword()}/>
                            </View>
                            <LoginButton onPress={this.onLoginPress.bind(this)} text={ENTER} icon={'login'}/>
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
            <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                <Avatar large rounded containerStyle={{marginBottom: 12}}
                        source={{uri: 'https://image.freepik.com/vector-gratis/logo-con-diseno-de-camara_1465-19.jpg'}}/>
                <Text style={styles.text}
                >{APP_NAME}</Text>
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
        this.validate(email, password);
    }

    validatePasswordLocally(password) {
        const {email} = this.props;
        this.validate(email, password);
    }

    validate(email, password) {
        if (checkPassword(password) && checkEmail(email)) {
            this.props.changeMode(PageModes.NORMAL)
        } else {
            this.props.changeMode(PageModes.DISABLED)
        }
    }

    onLoginPress() {
        const {email, password} = this.props;
        this.props.loginUser(email, password)
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
        this.props.setAccessToken(access);
        this.props.setRefreshToken(refresh);
        this.props.updateUser();
        this.props.navigation.navigate('Main');
        this.props.reset();
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
        this.props.navigation.navigate('SignUp');
        this.props.reset();
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
    changeMode: (mode) => dispatch(modeChanged(mode)),
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    setRefreshToken: (refreshToken) => dispatch(refreshTokenSet(refreshToken)),
    setAccessToken: (accessToken) => dispatch(accessTokenSet(accessToken)),
    updateUser: () => dispatch(userUpdated()),
    resetEmail: () => dispatch(resetEmail()),
    resetPassword: () => dispatch(resetPassword()),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)