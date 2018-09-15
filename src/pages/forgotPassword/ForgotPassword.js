import { Icon, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar, EmailTextBox } from '../../components';
import { Colors, Constants, Strings, Pages } from '../../config';
import { ForgotPasswordButton } from '../../containers';
import { strings } from '../../i18n';
import { emailChanged, sendEmailForForgotPassword } from './actions';
import { selectError, selectMode } from './reducer';
import NavigationService from '../../NavigationService';

class ForgotPassword extends Component {
  state = {
    email: '',
  };

  render() {
    const { email } = this.state;
    const {
      error,
    } = this.props;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <BackHeader onBackPress={() => this.onBackPress()} />
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
              flex: 3,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            >
              <Icon name="key" style={{ color: 'white' }} />
            </View>
            <View style={{
              flex: 6,
              alignSelf: 'center',
              flexDirection: 'column',
            }}
            >
              <View>
                <Text style={{
                  color: 'white',
                  fontSize: Constants.TEXT_NORMAL_SIZE,
                  marginBottom: 20,
                }}
                >
                  {strings(Strings.FORGOT_PASSWORD_ENTER_EMAIL)}
                </Text>
              </View>
              <View>
                <EmailTextBox
                  error={error}
                  placeholder={strings(Strings.EMAIL_ADDRESS)}
                  value={email}
                  onChangeEmail={(email) => {
                    this.setState({ email: email.toLowerCase() });
                    this.props.validateEmail(email);
                  }}
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
              <ForgotPasswordButton
                onPress={() => this.onSaveChangesPressed()}
                text={strings(Strings.SEND_FORGOT_LINK)}
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
    const { email } = this.state;
    this.props.sendEmailForForgotPassword(email)
      .then((result) => {
        NavigationService.navigate(Pages.TOKEN_PAGE);
      })
      .catch((error) => {
        this.onFail(error);
      });
  }

  onFail(error) {
    Toast.show({
      text: error.error.response.status === 404 ? strings(Strings.NON_EXISTING_EMAIL) : strings(Strings.TOKEN_TIME),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'danger',
    });
  }
}

const mapStateToProps = state => ({
  mode: selectMode(state),
  error: selectError(state),
});

const mapDispatchToProps = dispatch => ({
  sendEmailForForgotPassword: email => dispatch(sendEmailForForgotPassword(email)),
  validateEmail: email => dispatch(emailChanged(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
