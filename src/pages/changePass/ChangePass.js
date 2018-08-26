import React, {Component} from 'react';
import {Container} from 'native-base';
import {View, StatusBar} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {Strings, Colors, PageModes} from '../../config';
import {BackHeader} from '../../components';
import {modeChanged, previousPasswordChanged, newPasswordChanged, repeatedPasswordChanged} from './actions';
import {PasswordTextBox} from '../../components';
import {checkPassword} from "../../helpers/Validators";
import ChangePassButton from '../../containers/ChangePassButton';

class ChangePass extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {SAVE_NEW_PASSWORD, NEW_PASSWORD, CURRENT_PASSWORD, REPEAT_NEW_PASSWORD, CHANGE_PASS} = Strings;
        const {error} = this.props;
        return (
            <View>
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={CHANGE_PASS}/>
                <KeyboardAwareScrollView>
                    <Container style={{backgroundColor: 'white', flex: 1, justifyContent: 'center', marginTop: 0}}>
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor={Colors.BASE}
                        />
                        <View style={{justifyContent: 'flex-start', marginTop: 32, flex: 1}}>

                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox error={error} placeholder={CURRENT_PASSWORD}
                                                onChangePassword={(previousPassword) => this.onPreviousPasswordChange(previousPassword)}
                                                />
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox error={error} placeholder={NEW_PASSWORD}
                                                onChangePassword={(newPassword) => this.onNewPasswordChange(newPassword)}
                                                />
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox error={error} placeholder={REPEAT_NEW_PASSWORD}
                                                onChangePassword={(repeatedPassword) => this.onRepeatedPasswordChange(repeatedPassword)}
                                                />
                            </View>

                            <View style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 20}}>
                                <ChangePassButton text={SAVE_NEW_PASSWORD} icon="check"
                                                   onPress={this.onSaveChangesPressed.bind(this)}/>
                            </View>

                        </View>
                    </Container>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    onBackPress() {
        this.props.navigation.navigate('Profile');
    }

    onSaveChangesPressed() {
        this.props.changeMode(PageModes.LOADING);
    }

    onPreviousPasswordChange(previousPassword) {
        this.props.changePreviousPassword(previousPassword);
    }

    onNewPasswordChange(newPassword) {
        this.props.changeNewPassword(newPassword);
        this.validateNewPasswordLocally(newPassword);
    }

    onRepeatedPasswordChange(repeatedPassword) {
        this.props.changeRepeatedPassword(repeatedPassword);
        this.validateRepeatedPasswordLocally(repeatedPassword);
    }

    validateNewPasswordLocally(newPassword) {
        const {repeatedPassword} = this.props;
        this.validate(newPassword, repeatedPassword);
    }

    validateRepeatedPasswordLocally(repeatedPassword) {
        const {newPassword} = this.props;
        this.validate(newPassword, repeatedPassword);
    }

    validate(newPassword, repeatedPassword) {
        if (checkPassword(newPassword) && newPassword === repeatedPassword) {
            this.props.changeMode(PageModes.NORMAL)
        } else {
            this.props.changeMode(PageModes.DISABLED)
        }
    }
}

const mapStateToProps = (state) => ({
    mode: state.changePassPage.mode,
    previousPassword: state.changePassPage.previousPassword,
    newPassword: state.changePassPage.newPassword,
    repeatedPassword: state.changePassPage.repeatedPassword,
    lastTokenUpdateTime: state.userInfo.lastTokenUpdateTime,
    error: state.changePassPage.mode === PageModes.ERROR
});

const mapDispatchToProps = (dispatch) => ({
    changePreviousPassword: (previousPassword) => dispatch(previousPasswordChanged(previousPassword)),
    changeNewPassword: (newPassword) => dispatch(newPasswordChanged(newPassword)),
    changeRepeatedPassword: (repeatedPassword) => dispatch(repeatedPasswordChanged(repeatedPassword)),
    changeMode: (mode) => dispatch(modeChanged(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass)