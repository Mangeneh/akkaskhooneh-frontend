import React, {Component,} from 'react';
import {Container, Text} from 'native-base';
import {TouchableOpacity, View, StyleSheet, StatusBar} from 'react-native'
import {SocialIcon} from 'react-native-elements';
import {Strings} from '../../config/Strings';
import RoundAvatar from "../../components/RoundAvatar";
import {Colors} from "../../config/Colors";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Constants from "../../config/Constants";
import EmailTextBox from "../../components/EmailTextBox";
import PasswordTextBox from "../../components/PasswordTextBox";
import {
    emailChanged,
    Actions,
    signUpUser,
    modeChanged,
    passwordChanged,
    repeatedPasswordChanged, reset
} from "./actions";
import {PageModes} from "../../config/PageModes";
import {connect} from 'react-redux';
import SignUpButton from '../../containers/SignUpButton';
import reducer from "./reducer";

class SignUp extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {APP_NAME, EMAIL_ADDRESS, PASSWORD, REPEAT_PASSWORD, SIGN_UP, ENTER_LOGIN_PAGE} = Strings;
        const {error} = this.props;
        return (
            <KeyboardAwareScrollView>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.BASE}
                />
                <Container style={{backgroundColor: Colors.BASE, flex: 1}}>
                    {this.renderLogoSection()}
                    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                        <View style={{marginLeft: 32, marginRight: 32}}>
                            <EmailTextBox error={error}
                                          onChangeEmail={(email) => this.onEmailChange(email)}/>
                        </View>
                        <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                            <PasswordTextBox error={error}
                                             onChangePassword={(password) => this.onPasswordChange(password)}/>
                        </View>
                        <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                            <PasswordTextBox error={error}
                                             onChangePassword={(repeatedPassword) => this.onRepeatedPasswordChange(repeatedPassword)}/>
                        </View>
                        <SignUpButton onPress={this.onSignUpPress.bind(this)} text={SIGN_UP} icon={"login"}/>
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

    onRepeatedPasswordChange(repeatedPassword) {
        this.props.changeRepeatedPassword(repeatedPassword);
        this.validateRepeatedPasswordLocally(repeatedPassword);
    }

    validateEmailLocally(email) {
        const {repeatedPassword, password} = this.props;

        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (password.length < 6 || reg.test(email) === false || password !== repeatedPassword) {
            this.props.changeMode(PageModes.DISABLED)
        } else {
            this.props.changeMode(PageModes.NORMAL)
        }
    }

    validatePasswordLocally(password) {
        const {repeatedPassword, email} = this.props;

        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (password.length < 6 || reg.test(email) === false || password !== repeatedPassword) {
            this.props.changeMode(PageModes.DISABLED)
        } else {
            this.props.changeMode(PageModes.NORMAL)
        }
    }

    validateRepeatedPasswordLocally(repeatedPassword) {
        const {password, email} = this.props;

        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (password.length < 6 || reg.test(email) === false || password !== repeatedPassword) {
            this.props.changeMode(PageModes.DISABLED)
        } else {
            this.props.changeMode(PageModes.NORMAL)
        }
    }

    renderLogoSection() {
        const {APP_NAME} = Strings;
        return (
            <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                <RoundAvatar large={true} style={{marginBottom: 12}}
                             uri={'https://image.freepik.com/vector-gratis/logo-con-diseno-de-camara_1465-19.jpg'}/>
                <Text style={styles.text}>{APP_NAME}</Text>
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

    onSignUpPress() {
        const {email, password} = this.props;
        this.props.signUpUser(email, password)
            .then((result) => {
                if (result.type === Actions.SIGN_UP_SUCCESS) {
                    this.props.navigation.navigate('Profile')
                }
            });
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

    onReturnToLoginPress() {
        this.props.reset();
        this.props.navigation.navigate('Login');
    }
}

const mapStateToProps = (state) => ({
    email: state.signUpPage.email.toLowerCase(),
    password: state.signUpPage.password,
    repeatedPassword: state.signUpPage.repeatedPassword,
    mode: state.signUpPage.mode,
    error: state.signUpPage.mode === PageModes.ERROR
});

const mapDispatchToProps = (dispatch) => ({
    changeEmail: (email) => dispatch(emailChanged(email)),
    changePassword: (password) => dispatch(passwordChanged(password)),
    changeRepeatedPassword: (repeatedPassword) => dispatch(repeatedPasswordChanged(repeatedPassword)),
    changeMode: (mode) => dispatch(modeChanged(mode)),
    signUpUser: (email, password) => dispatch(signUpUser(email, password)),
    reset: () => dispatch(reset())
});

const styles = StyleSheet.create({
    text: {
        fontFamily: Constants.NORMAL_FONT,
        fontSize: Constants.TEXT_NORMAL_SIZE,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)