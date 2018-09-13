import { Icon, Text, Toast, Input } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar } from '../../components';
import { Colors, Constants, Strings } from '../../config';
import { strings } from '../../i18n';
import CodeInput from 'react-native-confirmation-code-input';
import { sendToken } from './actions';


class TokenPage extends Component {
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
                <CodeInput
                    // keyboardType="numeric"
                    codeLength={6}
                    className='border-circle'
                    autoFocus={false}
                    codeInputStyle={{ fontWeight: '800' }}
                    onFulfill={(code) => this.props.sendToken(code)
                        .then((result) => {
                            console.warn(response)
                        //   NavigationService.navigate(Pages.TOKEN_PAGE);
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
}

const mapDispatchToProps = dispatch => ({
  sendToken: token => dispatch(sendToken(token)),
});

export default connect(null, mapDispatchToProps)(TokenPage);