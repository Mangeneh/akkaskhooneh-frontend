import { Icon, Text, Toast, Input } from 'native-base';
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar } from '../../components';
import { Colors, Constants, Strings, Pages } from '../../config';
import { strings } from '../../i18n';
import CodeInput from 'react-native-confirmation-code-input';
import { sendToken, codeChanged } from './actions';
import NavigationService from '../../NavigationService';
import { SendTokenButton } from '../../containers';

class TokenPage extends Component {
  state = {
    code: '',
  }
  render() {
    const {
      error, validateCode, sendCurrentToken,
    } = this.props;
    const {code} = this.state;
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
              <Input style = {{backgroundColor: 'white', textAlign: 'center', borderRadius: Constants.TEXT_BOX_RADIUS, minHeight: 40, maxHeight: 40}} 
                    maxLength={6}
                    value={code}
                    onChangeText={(code) => {this.setState({code}); validateCode(code);}}
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
                text = {strings(Strings.SEND)}
                onPress={() => sendCurrentToken(code).then((result) => {
                  console.warn(result)
                  NavigationService.navigate(Pages.GET_NEW_PASSWORD, {
                      token: this.state.code,
                  })
              })
              .catch((error) => {
                  console.warn(error)
                  Toast.show({
                      text: strings(Strings.INVALID_TOKEN),
                      textStyle: { textAlign: 'center' },
                      position: 'bottom',
                      type: 'danger',
                    });
              })
              } 
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
}

const mapDispatchToProps = dispatch => ({
  sendCurrentToken: token => dispatch(sendToken(token)),
  validateCode: code => dispatch(codeChanged(code)),
});

export default connect(null, mapDispatchToProps)(TokenPage);
