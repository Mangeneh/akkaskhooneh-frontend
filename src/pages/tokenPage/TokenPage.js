import {
  Icon, Input, Text, Toast,
} from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar } from '../../components';
import {
  Colors, Constants, Pages, Strings,
} from '../../config';
import { SendTokenButton } from '../../containers';
import { strings } from '../../i18n';
import { codeChanged, sendToken } from './actions';

class TokenPage extends Component {
  state = {
    code: '',
  };

  render() {
    const { validateCode } = this.props;
    const { code } = this.state;
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
                  textAlign: 'center',
                  marginBottom: 20,
                }}
                >
                  {strings(Strings.ENTER_TOKEN)}
                </Text>
              </View>
              <View>
                <Input
                  style={{
                    backgroundColor: 'white',
                    textAlign: 'center',
                    borderRadius: Constants.TEXT_BOX_RADIUS,
                    minHeight: 40,
                    maxHeight: 40,
                    fontSize: Constants.TEXT_NORMAL_SIZE,
                  }}
                  maxLength={6}
                  value={code}
                  onChangeText={(code) => {
                    this.setState({ code });
                    validateCode(code);
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
              <SendTokenButton
                text={strings(Strings.SEND)}
                onPress={() => this.onSendPress()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  onSendPress() {
    this.props.sendCurrentToken(this.state.code)
      .then((result) => {
        this.props.navigation.navigate(Pages.GET_NEW_PASSWORD, {
          token: this.state.code,
        });
      })
      .catch((error) => {
        Toast.show({
          text: strings(Strings.INVALID_TOKEN),
          textStyle: { textAlign: 'center' },
          position: 'bottom',
          type: 'danger',
        });
      });
  }

  onBackPress() {
    this.props.navigation.goBack();
  }
}

const mapDispatchToProps = dispatch => ({
  sendCurrentToken: token => dispatch(sendToken(token)),
  validateCode: code => dispatch(codeChanged(code)),
});

export default connect(null, mapDispatchToProps)(TokenPage);
