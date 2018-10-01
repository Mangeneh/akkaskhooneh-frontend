import { Icon, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { BackHeader, CustomStatusBar, EmailTextBox, SpinnerButton } from '../../components';
import { Colors, Constants, PageModes, Pages, Strings } from '../../config';
import { checkEmail } from '../../helpers';
import { showFailureToast } from '../../helpers/Toasts';
import { strings } from '../../i18n';
import { emailChanged, sendEmail } from './actions';
import { selectError, selectMode } from './reducer';

export interface IProps {
  navigation: NavigationScreenProp;
  sendEmail: any;
}

interface IState {
  email: string;
  mode: PageModes;
  error: boolean;
}

const INITIAL_STATE = {
  email: '',
  mode: PageModes.DISABLED,
  error: false,
};

class ForgotPassword extends Component<IProps, IState> {

  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSendPressed = this.onSendPressed.bind(this);
    this.onEmailReset = this.onEmailReset.bind(this);
  }

  public render () {
    const { email, mode, error } = this.state;
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
                marginBottom: 20,
              }}
              >
                {strings(Strings.FORGOT_PASSWORD_ENTER_EMAIL)}
              </Text>
              <EmailTextBox
                error={error}
                placeholder={strings(Strings.EMAIL_ADDRESS)}
                value={email}
                reset={this.onEmailReset}
                onChangeEmail={(email) => this.onEmailChange(email)}
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
                text={strings(Strings.SEND_FORGOT_LINK)}
                onPress={this.onSendPressed}
                mode={mode}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  private onEmailChange (email: string) {
    this.setState({ email, error: false, mode: this.validate(email) });
  }

  private onEmailReset () {
    this.setState({ email: '', error: false, mode: PageModes.DISABLED });
  }

  private onSendPressed () {
    this.setState({ mode: PageModes.LOADING });
    const { email } = this.state;
    const { sendEmail, navigation } = this.props;
    sendEmail(email)
      .then((result) => {
        this.setState({ mode: PageModes.SUCCESS });
        navigation.navigate(Pages.TOKEN_PAGE);
      })
      .catch((error) => {
        this.onFail(error);
      });
  }

  private onFail (error) {
    this.setState({ error: true, mode: PageModes.ERROR });
    showFailureToast(error.error.response.status === 404 ? strings(Strings.NON_EXISTING_EMAIL) : strings(Strings.TOKEN_TIME));
  }

  private validate (email: string) {
    if (checkEmail(email)) {
      return PageModes.NORMAL;
    }
    return PageModes.DISABLED;
  }
}

const mapDispatchToProps = dispatch => ({
  sendEmail: (email: string) => dispatch(sendEmail(email)),
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
