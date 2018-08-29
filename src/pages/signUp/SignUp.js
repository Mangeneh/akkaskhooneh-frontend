import React, {Component,} from 'react';
import {Text, Toast} from 'native-base';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {SocialIcon, Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Strings, Colors, PageModes, Fonts} from '../../config';
import {EmailTextBox, PasswordTextBox, FullStatusBar} from '../../components';
import {checkEmail, checkPassword} from "../../helpers/Validators";
import {
    emailChanged,
    Actions,
    validateEmail,
    modeChanged,
    passwordChanged,
    repeatedPasswordChanged,
    passwordFieldPressed,
    reset,
    resetEmail,
} from './actions';
import SignUpButton from '../../containers/SignUpButton';

class SignUp extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {SIGN_UP, PASSWORD, REPEAT_PASSWORD} = Strings;
        const {error} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: Colors.BASE,}}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                    <FullStatusBar/>
                    <View style={{backgroundColor: Colors.BASE, flex: 1}}>
                        {this.renderLogoSection()}
                        <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                            <View style={{marginLeft: 32, marginRight: 32}}>
                                <EmailTextBox error={error} reset={() => this.props.resetEmail()}
                                              value={this.props.email}
                                              onChangeEmail={(email) => this.onEmailChange(email)}/>
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                {/* <Tooltip
                                    animated
                                    isVisible={this.props.toolTipVisible}
                                    content={<Text style={{fontSize: 8}}>Password must contain at least 6 characters, 1 number and 1 letter.</Text>}
                                    placement="top"
                                    onClose={() => this.setState({ toolTipVisible: false })}
                                > */}
                                <PasswordTextBox onPress={this.props.showPasswordTooltip.bind(this)}
                                                 placeholder={PASSWORD} value={this.props.password}
                                                 onChangePassword={(password) => this.onPasswordChange(password)}/>
                                {/* </Tooltip> */}
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox placeholder={REPEAT_PASSWORD} value={this.props.repeatedPassword}
                                                 onChangePassword={(repeatedPassword) => this.onRepeatedPasswordChange(repeatedPassword)}/>
                            </View>
                            <SignUpButton onPress={this.onSignUpPress.bind(this)} text={SIGN_UP} icon={'login'}/>
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
                <Avatar large containerStyle={{marginBottom: 12}} rounded
                        source={{uri: 'https://image.freepik.com/vector-gratis/logo-con-diseno-de-camara_1465-19.jpg'}}/>
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

    onRepeatedPasswordChange(repeatedPassword) {
        this.props.changeRepeatedPassword(repeatedPassword);
        this.validateRepeatedPasswordLocally(repeatedPassword);
    }

    validateEmailLocally(email) {
        const {repeatedPassword, password} = this.props;
        this.validate(email, password, repeatedPassword);
    }

    validatePasswordLocally(password) {
        const {repeatedPassword, email} = this.props;
        this.validate(email, password, repeatedPassword);
    }

    validateRepeatedPasswordLocally(repeatedPassword) {
        const {password, email} = this.props;
        this.validate(email, password, repeatedPassword);
    }

    validate(email, password, repeatedPassword) {
        if (checkPassword(password) && checkEmail(email) && password === repeatedPassword) {
            this.props.changeMode(PageModes.NORMAL)
        } else {
            this.props.changeMode(PageModes.DISABLED)
        }
    }

    onSignUpPress() {
        const {email, password} = this.props;
        this.props.validateEmail(email)
            .then((result) => {
                if (result.type === Actions.VALIDATE_EMAIL_SUCCESS) {
                    this.props.navigation.navigate('SignUpComplete', {email, password});
                    this.props.reset();
                } else {
                    Toast.show({
                        text: Strings.EMAIL_ALREADY_EXISTS,
                        textStyle: {textAlign: 'center'},
                        position: 'bottom',
                        type: 'danger'
                    });
                }
            });
    }

    onReturnToLoginPress() {
        this.props.navigation.navigate('Login');
        this.props.reset();
    }
}

const mapStateToProps = (state) => ({
    email: state.signUpPage.email.toLowerCase(),
    password: state.signUpPage.password,
    repeatedPassword: state.signUpPage.repeatedPassword,
    mode: state.signUpPage.mode,
    error: state.signUpPage.mode === PageModes.ERROR,
    toolTipVisible: state.signUpPage.toolTipVisible
});

const mapDispatchToProps = (dispatch) => ({
    changeEmail: (email) => dispatch(emailChanged(email)),
    changePassword: (password) => dispatch(passwordChanged(password)),
    changeRepeatedPassword: (repeatedPassword) => dispatch(repeatedPasswordChanged(repeatedPassword)),
    changeMode: (mode) => dispatch(modeChanged(mode)),
    validateEmail: (email) => dispatch(validateEmail(email)),
    resetEmail: () => dispatch(resetEmail()),
    showPasswordTooltip: () => dispatch(passwordFieldPressed()),
    reset: () => dispatch(reset())
});

const styles = StyleSheet.create({
    text: {
        fontFamily: Fonts.NORMAL_FONT,
        fontSize: Fonts.TEXT_NORMAL_SIZE,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)