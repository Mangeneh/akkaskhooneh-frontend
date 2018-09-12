import { Icon, Toast, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar, EmailTextBox } from '../../components';
import { Colors, Strings, Constants } from '../../config';
import { strings } from '../../i18n';
import {
    sendEmailForForgotPassword
} from './actions';

class ForgotPassword extends Component {
  state = {
      email: '',
  }
  render() {
    const {email} = this.state;
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
              // justifyContent: 'center',
              alignSelf: 'center',
              flexDirection: 'column',
            }}
            >
              >
              <View>
                <Text style={{color: 'white', fontSize: Constants.TEXT_NORMAL_SIZE, marginBottom: 20}}>{strings(Strings.FORGOT_PASSWORD_ENTER_EMAIL)} </Text>
              </View>
              <View>
                <EmailTextBox
                  placeholder={strings(Strings.EMAIL_ADDRESS)}
                  value={email}
                  onChangeEmail={email => this.setState({email})}
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
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

//   onSaveChangesPressed() {
//     const { previousPassword, newPassword } = this.props;
//     this.props.changePassword(previousPassword, newPassword)
//       .then((result) => {
//         this.onSuccess();
//       })
//       .catch((error) => {
//         this.onFail();
//       });
//   }

//   onSuccess() {
//     Toast.show({
//       text: strings(Strings.CHANGE_PASS_SUCCESS),
//       textStyle: { textAlign: 'center' },
//       position: 'bottom',
//       type: 'success',
//       duration: 500,
//       onClose: () => {
//         this.props.navigation.goBack();
//         this.props.reset();
//       },
//     });
//   }

//   onFail() {
//     Toast.show({
//       text: strings(Strings.CHANGE_PASS_FAIL),
//       textStyle: { textAlign: 'center' },
//       position: 'bottom',
//       type: 'danger',
//     });
//   }
}

const mapDispatchToProps = dispatch => ({
    sendEmailForForgotPassword: email => dispatch(sendEmailForForgotPassword(email)),
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
