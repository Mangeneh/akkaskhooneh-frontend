import { Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { CustomStatusBar, EmailTextBox, PasswordTextBox } from '../../components';
import PasswordInstruction from '../../components/PasswordInstruction';
import {
  Addresses, Colors, Fonts, Strings,
} from '../../config';
import { SignUpButton } from '../../containers';
import { strings } from '../../i18n';
import {
  emailChanged,
  passwordChanged,
  repeatedPasswordChanged,
  reset,
  resetEmail,
  validateEmail,
} from './actions';
import {
  selectEmail,
  selectError,
  selectMode,
  selectPassword,
  selectRepeatedPassword,
} from './reducer';

class SignUp extends Component {
  render() {
    const {
      email,
      password,
      repeatedPassword,
      error,
      changeEmail,
      changePassword,
      resetEmail,
      changeRepeatedPassword,
    } = this.props;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <CustomStatusBar />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{
            backgroundColor: Colors.BASE,
            flex: 1,
          }}
          >
            {this.renderLogoSection()}
            <View style={{
              alignSelf: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
            >
              <View style={{
                marginLeft: 32,
                marginRight: 32,
              }}
              >
                <EmailTextBox
                  error={error}
                  reset={() => resetEmail()}
                  value={email}
                  onChangeEmail={email => changeEmail(email)}
                />
              </View>
              <View style={{
                marginTop: 16,
                marginLeft: 32,
                marginRight: 32,
              }}
              >
                <PasswordTextBox
                  placeholder={strings(Strings.PASSWORD)}
                  value={password}
                  onChangePassword={password => changePassword(password)}
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
                  placeholder={strings(Strings.REPEAT_PASSWORD)}
                  value={repeatedPassword}
                  onChangePassword={repeatedPassword => changeRepeatedPassword(repeatedPassword)}
                />
              </View>
              <SignUpButton
                onPress={() => this.onSignUpPress()}
                text={strings(Strings.SIGN_UP)}
                icon="login"
              />
            </View>
            {this.renderOtherLoginSection()}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  renderLogoSection() {
    return (
      <View style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      >
        <Avatar
          large
          containerStyle={{ marginBottom: 12 }}
          rounded
          source={{ uri: Addresses.LOGO }}
        />
        <Text style={styles.text}>{strings(Strings.APP_NAME)}</Text>
      </View>
    );
  }

  renderOtherLoginSection() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}
      >
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={() => this.onReturnToLoginPress()}
        >
          <Text style={styles.text}>{strings(Strings.ENTER_LOGIN_PAGE)}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onSignUpPress() {
    const { email } = this.props;
    this.props.validateEmail(email)
      .then((response) => {
        this.onSuccess();
      })
      .catch((error) => {
        this.onFail(error);
      });
  }

  onSuccess() {
    const { email, password } = this.props;
    this.props.navigation.navigate('SignUpComplete', {
      email,
      password,
    });
    this.props.reset();
  }

  onFail(error) {
    Toast.show({
      text: strings(Strings.EMAIL_ALREADY_EXISTS),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'danger',
    });
  }

  onReturnToLoginPress() {
    const { navigation, reset } = this.props;
    navigation.navigate('Login');
    reset();
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: Fonts.TEXT_NORMAL_SIZE,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = state => ({
  email: selectEmail(state)
    .toLowerCase(),
  password: selectPassword(state),
  repeatedPassword: selectRepeatedPassword(state),
  mode: selectMode(state),
  error: selectError(state),
});

const mapDispatchToProps = dispatch => ({
  changeEmail: email => dispatch(emailChanged(email)),
  changePassword: password => dispatch(passwordChanged(password)),
  changeRepeatedPassword: repeatedPassword => dispatch(repeatedPasswordChanged(repeatedPassword)),
  validateEmail: email => dispatch(validateEmail(email)),
  resetEmail: () => dispatch(resetEmail()),
  reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
