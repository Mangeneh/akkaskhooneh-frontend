import React, {Component,} from 'react';
import {TouchableOpacity, View, StyleSheet, StatusBar} from 'react-native'
import {Container, Text, Toast} from 'native-base';
import {SocialIcon, Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import FormData from 'form-data';
import ImagePicker from 'react-native-image-crop-picker';
import {EmailTextBox, PasswordTextBox} from '../../components';
import {Strings, Colors, PageModes, Fonts} from '../../config';
import LoginButton from '../../containers/LoginButton';
import {emailChanged, Actions, loginUser, modeChanged, passwordChanged, reset} from './actions';
import {userUpdated, refreshTokenSet, accessTokenSet} from '../../actions/UserInfoActions';


class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            showToast: true
        };
    }

    render() {
        const {ENTER, FORGOT_PASSWORD} = Strings;
        const {error, email, password} = this.props;
        return (
            <KeyboardAwareScrollView>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={Colors.BASE}
                />
                <Container style={{backgroundColor: Colors.BASE, flex: 1}}>
                    {this.renderLogoSection()}
                    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                        <View style={{marginLeft: 32, marginRight: 32}}>
                            <EmailTextBox error={error} value={email}
                                          onChangeEmail={(email) => this.onEmailChange(email)}
                                          reset={() => this.props.reset()}/>
                        </View>
                        <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                            <PasswordTextBox error={error} value={password}
                                             onChangePassword={(password) => this.onPasswordChange(password)}
                                             reset={() => this.props.reset()}/>
                        </View>
                        <LoginButton onPress={this.onLoginPress.bind(this)} text={ENTER} icon={'login'}/>
                        <TouchableOpacity style={{marginTop: 24}}>
                            <Text style={styles.text}>{FORGOT_PASSWORD}</Text>
                        </TouchableOpacity>
                    </View>
                    {this.renderOtherLoginSection()}
                </Container>
            </KeyboardAwareScrollView>
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
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (password.length < 6 || reg.test(email) === false) {
            this.props.changeMode(PageModes.DISABLED)
        } else {
            this.props.changeMode(PageModes.NORMAL)
        }
    }

    validatePasswordLocally(password) {
        const {email} = this.props;
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (password.length < 6 || reg.test(email) === false) {
            this.props.changeMode(PageModes.DISABLED)
        } else {
            this.props.changeMode(PageModes.NORMAL)
        }
    }

    onLoginPress() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        });
        const {email, password} = this.props;
        this.props.loginUser(email, password)
            .then((result) => {
                if (result.type === Actions.LOGIN_SUCCESS) {
                    const {access, refresh} = result.payload.data;
                    console.log(access, refresh);
                    this.props.setAccessToken(access);
                    this.props.setRefreshToken(refresh);
                    this.props.updateUser();
                    this.props.navigation.navigate('Profile');
                } else {
                    Toast.show({
                        text: 'Wrong Credentials!',
                        textStyle: {textAlign: 'center'},
                        position: 'bottom',
                        type: 'warning'
                    });
                }
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
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)