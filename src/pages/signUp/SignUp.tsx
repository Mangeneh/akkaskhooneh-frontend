import { Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { validateEmail } from '../../actions';
import {
  CustomStatusBar,
  EmailTextBox,
  PasswordInstruction,
  PasswordTextBox,
  SpinnerButton,
} from '../../components';
import { Addresses, Colors, Fonts, Pages, Parameters, Strings } from '../../config';
import { PageModes } from '../../config/PageModes';
import { checkEmail, checkPassword } from '../../helpers/Validators';
import { strings } from '../../i18n';

export interface IProps {
  navigation: NavigationScreenProp;
  validateEmail: any;
}

interface IState {
  email: string;
  password: string;
  repeatedPassword: string;
  mode: PageModes;
  error: boolean;
}

const INITIAL_STATE = {
  email: '',
  password: '',
  repeatedPassword: '',
  mode: PageModes.DISABLED,
  error: false,
};

class SignUp extends Component<IProps, IState> {

  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSignUpPress = this.onSignUpPress.bind(this);
    this.resetEmail = this.resetEmail.bind(this);
    this.onReturnToLoginPress = this.onReturnToLoginPress.bind(this);
  }

  public render () {
    const {
      email,
      password,
      repeatedPassword,
      mode,
      error,
    } = this.state;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <CustomStatusBar/>
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
                  reset={this.resetEmail}
                  value={email}
                  onChangeEmail={email => this.onChangeEmail(email)}
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
                  onChangePassword={password => this.onChangePassword(password)}
                />
                <PasswordInstruction/>
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
                  onChangePassword={repeatedPassword => this.onChangeRepeatedPassword(repeatedPassword)}
                />
              </View>
              <SpinnerButton
                onPress={this.onSignUpPress}
                mode={mode}
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

  private renderLogoSection () {
    return (
      <View style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      >
        <Avatar
          large={true}
          containerStyle={{ marginBottom: 12 }}
          rounded={true}
          source={{ uri: Addresses.LOGO }}
        />
        <Text style={styles.text}>{strings(Strings.APP_NAME)}</Text>
      </View>
    );
  }

  private renderOtherLoginSection () {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}
      >
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={this.onReturnToLoginPress}
        >
          <Text style={styles.text}>{strings(Strings.ENTER_LOGIN_PAGE)}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private onSignUpPress () {
    this.setState({ mode: PageModes.LOADING });
    const { email } = this.state;
    const { validateEmail } = this.props;
    validateEmail(email)
      .then(() => {
        this.onSuccess();
      })
      .catch((error) => {
        this.onFail(error);
      });
  }

  private onSuccess () {
    const { email, password } = this.state;
    this.props.navigation.navigate(Pages.SIGN_UP_COMPLETE, {
      [Parameters.EMAIL]: email,
      [Parameters.PASSWORD]: password,
    });
  }

  private onFail (error) {
    this.setState({ mode: PageModes.ERROR, error: true });
    Toast.show({
      text: strings(Strings.EMAIL_ALREADY_EXISTS),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'danger',
    });
  }

  private onReturnToLoginPress () {
    const { navigation } = this.props;
    navigation.navigate(Pages.LOGIN);
  }

  private onChangeEmail (email: string) {
    this.setState(prevState => ({
      email,
      mode: this.validate(email, prevState.password, prevState.repeatedPassword),
    }));
  }

  private onChangePassword (password: string) {
    this.setState(prevState => ({
      password,
      mode: this.validate(prevState.email, password, prevState.repeatedPassword),
    }));
  }

  private onChangeRepeatedPassword (repeatedPassword: string) {
    this.setState(prevState => ({
      repeatedPassword,
      mode: this.validate(prevState.email, prevState.password, repeatedPassword),
    }));
  }

  private resetEmail () {
    this.setState({ email: '', error: false, mode: PageModes.DISABLED });
  }

  private validate (email: string, password: string, repeatedPassword: string) {
    if (checkPassword(password) && checkEmail(email) && password === repeatedPassword) {
      return PageModes.NORMAL;
    }
    return PageModes.DISABLED;
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

const mapDispatchToProps = dispatch => ({
  validateEmail: (email: string) => dispatch(validateEmail(email)),
});

export default connect(null, mapDispatchToProps)(SignUp);
