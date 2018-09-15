import { Icon, Toast } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar, PasswordTextBox } from '../../components';
import PasswordInstruction from '../../components/PasswordInstruction';
import { Colors, Strings, Pages } from '../../config';
import GetNewPassButton from '../../containers/GetNewPassButton';
import { strings } from '../../i18n';
import {
  passwordChanged,
  getNewPassword,
} from './actions';
import {
  selectError, selectMode,
} from './reducer';

class GetNewPassword extends Component {
  state = {
    newPassword: '',
    repeatedPassword: '',
  }

  render() {
    const {
      error,
    } = this.props;
    const { newPassword, repeatedPassword } = this.state;
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
                  placeholder={strings(Strings.NEW_PASSWORD)}
                  value={newPassword}
                  onChangePassword={(newPassword) => { this.setState({ newPassword }); this.props.changePassword(newPassword, repeatedPassword); }}
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
                  onChangePassword={(repeatedPassword) => { this.setState({ repeatedPassword }); this.props.changePassword(newPassword, repeatedPassword); }}
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
              <GetNewPassButton
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
    if (this.state.newPassword === this.state.repeatedPassword) {
      this.props.sendNewPassword(this.props.navigation.getParam('token'), this.state.newPassword)
        .then((response) => {
          this.props.navigation.navigate(Pages.LOGIN);
        })
        .catch((error) => {
          Toast.show({
            text: strings(Strings.CHANGE_PASS_FAIL),
            textStyle: { textAlign: 'center' },
            position: 'bottom',
            type: 'danger',
          });
        });
    }
  }
}

const mapStateToProps = state => ({
  mode: selectMode(state),
  error: selectError(state),
});

const mapDispatchToProps = dispatch => ({
  changePassword: (password, repeatedPassword) => dispatch(passwordChanged(password, repeatedPassword)),
  sendNewPassword: (token, password) => dispatch(getNewPassword(token, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetNewPassword);
