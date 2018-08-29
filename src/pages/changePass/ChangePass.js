import React, {Component} from 'react';
import {Toast, Icon} from 'native-base';
import {View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {Strings, Colors, PageModes} from '../../config';
import {BackHeader, PasswordTextBox,FullStatusBar} from '../../components';
import {checkPassword} from "../../helpers/Validators";
import ChangePassButton from '../../containers/ChangePassButton';
import {
    previousPasswordChanged,
    newPasswordChanged,
    repeatedPasswordChanged,
    changePassword,
    modeChanged,
    Actions,
    reset,
} from './actions';

class ChangePass extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {SAVE_NEW_PASSWORD, NEW_PASSWORD, CURRENT_PASSWORD, REPEAT_NEW_PASSWORD, CHANGE_PASS} = Strings;
        const {error, previousPassword, newPassword, repeatedPassword} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: Colors.BASE}}>
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={CHANGE_PASS}/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                    <View style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'center', marginTop: 0}}>
                        <FullStatusBar/>
                        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
                            <Icon name='key' style={{color: 'white'}}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-start'}}>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox error={error} placeholder={CURRENT_PASSWORD} value={previousPassword}
                                                 onChangePassword={(previousPassword) => this.onPreviousPasswordChange(previousPassword)}
                                                 reset={() => this.props.reset()}
                                />
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox error={error} placeholder={NEW_PASSWORD} value={newPassword}
                                                 onChangePassword={(newPassword) => this.onNewPasswordChange(newPassword)}
                                                 reset={() => this.props.reset()}
                                />
                            </View>
                            <View style={{marginTop: 16, marginLeft: 32, marginRight: 32}}>
                                <PasswordTextBox error={error} placeholder={REPEAT_NEW_PASSWORD}
                                                 value={repeatedPassword}
                                                 onChangePassword={(repeatedPassword) => this.onRepeatedPasswordChange(repeatedPassword)}
                                                 reset={() => this.props.reset()}
                                />
                            </View>
                        </View>

                        <View style={{alignSelf: 'center', justifyContent: 'flex-start', marginBottom: 20, flex: 1}}>
                            <ChangePassButton text={SAVE_NEW_PASSWORD} icon="check"
                                              onPress={this.onSaveChangesPressed.bind(this)}/>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    onBackPress() {
        this.props.navigation.navigate('Profile');
    }

    onSaveChangesPressed() {
        const {previousPassword, newPassword} = this.props;
        this.props.changeMode(PageModes.LOADING);
        this.props.changePassword(previousPassword, newPassword)
            .then((result) => {
                if (result.type === Actions.CHANGE_PASS_SUCCESS) {
                    this.onSuccess();
                } else {
                    this.onFail();
                }
            });
    }

    onSuccess() {
        Toast.show({
            text: Strings.CHANGE_PASS_SUCCESS,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'success',
            duration: 500,
            onClose: () => {
                this.props.navigation.navigate('Main');
                this.props.reset()
            }
        });
    }

    onFail() {
        Toast.show({
            text: Strings.CHANGE_PASS_FAIL,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'danger'
        });
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
    error: state.changePassPage.mode === PageModes.ERROR
});

const mapDispatchToProps = (dispatch) => ({
    changePreviousPassword: (previousPassword) => dispatch(previousPasswordChanged(previousPassword)),
    changeNewPassword: (newPassword) => dispatch(newPasswordChanged(newPassword)),
    changeRepeatedPassword: (repeatedPassword) => dispatch(repeatedPasswordChanged(repeatedPassword)),
    changePassword: (previousPassword, newPassword) => dispatch(changePassword(previousPassword, newPassword)),
    changeMode: (mode) => dispatch(modeChanged(mode)),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass)