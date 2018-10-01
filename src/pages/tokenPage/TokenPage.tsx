import { Icon, Input, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar, SpinnerButton } from '../../components';
import { Colors, Constants, PageModes, Pages, Parameters, Strings } from '../../config';
import { showFailureToast } from '../../helpers/Toasts';
import { strings } from '../../i18n';
import { sendToken } from './actions';

export interface IProps {
  navigation: NavigationScreenProp;
  sendToken: any;
}

interface IState {
  token: string;
  mode: PageModes;
}

const INITIAL_STATE = {
  token: '',
  mode: PageModes.DISABLED,
};

class TokenPage extends Component<IProps, IState> {
  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSendPress = this.onSendPress.bind(this);
  }

  public render () {
    const { token, mode } = this.state;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <BackHeader/>
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
            <CustomStatusBar/>
            <View style={{
              flex: 3,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            >
              <Icon name="key" style={{ color: 'white' }}/>
            </View>
            <View style={{
              flex: 6,
              alignSelf: 'center',
              flexDirection: 'column',
            }}
            >
              <Text style={{
                color: 'white',
                fontSize: Constants.TEXT_NORMAL_SIZE,
                textAlign: 'center',
                marginBottom: 20,
              }}
              >
                {strings(Strings.ENTER_TOKEN)}
              </Text>
              <Input
                style={styles.inputStyle}
                maxLength={6}
                value={token}
                onChangeText={token => this.onChangeToken(token)}
              />
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
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  private onChangeToken (token: string) {
    this.setState({ token, mode: this.validate(token) });
  }

  private onSendPress () {
    this.setState({ mode: PageModes.LOADING });
    const { sendToken, navigation } = this.props;
    const { token } = this.state;
    sendToken(token)
      .then((result) => {
        this.setState({ mode: PageModes.SUCCESS });
        navigation.navigate(Pages.GET_NEW_PASSWORD, {
          [Parameters.TOKEN]: token,
        });
      })
      .catch((error) => {
        this.setState({ mode: PageModes.ERROR });
        showFailureToast(strings(Strings.INVALID_TOKEN));
      });
  }

  private validate (code: string) {
    if (code.length === 6) {
      return PageModes.NORMAL;
    }
    return PageModes.DISABLED;
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: Constants.TEXT_BOX_RADIUS,
    minHeight: 40,
    maxHeight: 40,
    fontSize: Constants.TEXT_NORMAL_SIZE,
  },
});

const mapDispatchToProps = dispatch => ({
  sendToken: (token: string) => dispatch(sendToken(token)),
});

export default connect(null, mapDispatchToProps)(TokenPage);
