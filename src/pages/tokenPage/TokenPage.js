import { Icon, Input, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar, SpinnerButton } from '../../components';
import {
  Colors, Constants, PageModes, Pages, Strings,
} from '../../config';
import { strings } from '../../i18n';
import { sendToken } from './actions';
import { showFailureToast } from '../../helpers/Toasts';

const INITIAL_STATE = {
  code: '',
};

class TokenPage extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSendPress = this.onSendPress.bind(this);
  }

  render() {
    const { code } = this.state;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <BackHeader />
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
                  onChangeText={code => this.setState({ code })}
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
              <SpinnerButton
                text={strings(Strings.SEND)}
                onPress={this.onSendPress}
                mode={mode}
                icon="login"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  onSendPress() {
    const { sendCurrentToken, navigation } = this.props;
    sendCurrentToken(this.state.code)
      .then((result) => {
        navigation.navigate(Pages.GET_NEW_PASSWORD, {
          token: this.state.code,
        });
      })
      .catch((error) => {
        showFailureToast(strings(Strings.INVALID_TOKEN));
      });
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  validate(code) {
    if (code.length === 6) {
      return PageModes.NORMAL;
    }
    return PageModes.DISABLED;
  }
}

const mapDispatchToProps = dispatch => ({
  sendCurrentToken: token => dispatch(sendToken(token)),
});

export default connect(null, mapDispatchToProps)(TokenPage);
