import { Icon, Toast } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar, PasswordTextBox } from '../../components';
import PasswordInstruction from '../../components/PasswordInstruction';
import { Colors, Strings } from '../../config';
import ChangePassButton from '../../containers/ChangePassButton';
import { strings } from '../../i18n';
import { selectRepeatedPassword } from '../signUp/reducer';
import {
  changePassword,
  newPasswordChanged,
  previousPasswordChanged,
  repeatedPasswordChanged,
  reset,
} from './actions';
import {
  selectError, selectMode, selectNewPassword, selectPreviousPassword,
} from './reducer';

class ChangePass extends Component {
  render() {
    const {
      error, previousPassword, newPassword, repeatedPassword,
    } = this.props;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <BackHeader onBackPress={() => this.onBackPress()} title={strings(Strings.CHANGE_PASS)} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{
            backgroundColor: Colors.BASE,
            flex: 1,
            justifyContent: 'center',
            marginTop: 0,
          }}
          >
            <CustomStatusBar />
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            >
              <Icon name="key" style={{ color: 'white' }} />
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}
            >
              <View style={{
                marginTop: 16,
                marginLeft: 32,
                marginRight: 32,
              }}
              >
                <PasswordTextBox
                  error={error}
                  placeholder={strings(Strings.CURRENT_PASSWORD)}
                  value={previousPassword}
                  onChangePassword={previousPassword => this.onPreviousPasswordChange(previousPassword)}
                  reset={() => this.props.reset()}
                />
              </View>
              <View style={{
                marginTop: 16,
                marginLeft: 32,
                marginRight: 32,
              }}
              >
                <PasswordTextBox
                  error={error}
                  placeholder={strings(Strings.NEW_PASSWORD)}
                  value={newPassword}
                  onChangePassword={newPassword => this.onNewPasswordChange(newPassword)}
                  reset={() => this.props.reset()}
                />
                <PasswordInstruction />
              </View>
              <View style={{
                marginTop: 16,
                marginLeft: 32,
                marginRight: 32,
              }}
              >
                <PasswordTextBox
                  error={error}
                  placeholder={strings(Strings.REPEAT_NEW_PASSWORD)}
                  value={repeatedPassword}
                  onChangePassword={repeatedPassword => this.onRepeatedPasswordChange(repeatedPassword)}
                  reset={() => this.props.reset()}
                />
              </View>
            </View>

            <View style={{
              alignSelf: 'center',
              justifyContent: 'flex-start',
              marginBottom: 20,
              flex: 1,
            }}
            >
              <ChangePassButton
                text={strings(Strings.SAVE_NEW_PASSWORD)}
                icon="check"
                onPress={() => this.onSaveChangesPressed()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  onSaveChangesPressed() {
    const { previousPassword, newPassword } = this.props;
    this.props.changePassword(previousPassword, newPassword)
      .then((result) => {
        this.onSuccess();
      })
      .catch((error) => {
        this.onFail();
      });
  }

  onSuccess() {
    Toast.show({
      text: strings(Strings.CHANGE_PASS_SUCCESS),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'success',
      duration: 500,
      onClose: () => {
        this.props.navigation.goBack();
        this.props.reset();
      },
    });
  }

  onFail() {
    Toast.show({
      text: strings(Strings.CHANGE_PASS_FAIL),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'danger',
    });
  }

  onPreviousPasswordChange(previousPassword) {
    this.props.changePreviousPassword(previousPassword);
  }

  onNewPasswordChange(newPassword) {
    this.props.changeNewPassword(newPassword);
  }

  onRepeatedPasswordChange(repeatedPassword) {
    this.props.changeRepeatedPassword(repeatedPassword);
  }
}

const mapStateToProps = state => ({
  mode: selectMode(state),
  previousPassword: selectPreviousPassword(state),
  newPassword: selectNewPassword(state),
  repeatedPassword: selectRepeatedPassword(state),
  error: selectError(state),
});

const mapDispatchToProps = dispatch => ({
  changePreviousPassword: previousPassword => dispatch(previousPasswordChanged(previousPassword)),
  changeNewPassword: newPassword => dispatch(newPasswordChanged(newPassword)),
  changeRepeatedPassword: repeatedPassword => dispatch(repeatedPasswordChanged(repeatedPassword)),
  changePassword: (previousPassword, newPassword) => dispatch(changePassword(previousPassword, newPassword)),
  reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);
