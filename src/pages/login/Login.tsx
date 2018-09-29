import LottieView from 'lottie-react-native';
import { Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import { CustomStatusBar, EmailTextBox, PasswordTextBox, SpinnerButton } from '../../components';
import { Colors, Fonts, Pages, Strings } from '../../config';
import { PageModes } from '../../config/PageModes';
import { checkEmail, checkPasgtsword } from '../../helpers/Validators';
import { strings } from '../../i18n';
import {
  emailChanged,
  loginUser,
  passwordChanged,
  reset,
  resetEmail,
  resetPassword,
} from './actions';
import { selectEmail, selectError, selectMode, selectPassword } from './reducer';

export interface IProps {
  navigation: NavigationScreenProp;
  loginUser: any;
}

interface IState {
  email: string;
  password: string;
  mode: PageModes;
  error: boolean;
}

const INITIAL_STATE = {
  email: '',
  password: '',
  mode: PageModes.DISABLED,
  error: false,
};

class Login extends Component<IProps, IState> {
  private interval: any;
  private animation: any;

  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  public componentDidMount () {
    this.animation.play();
    this.interval = setInterval(() => {
      this.animation.play();
    }, 5000);
  }

  public componentWillUnmount () {
    clearInterval(this.interval);
  }

  public render () {
    const { navigation } = this.props;
    const { error, email, password, mode } = this.state;
    return (
      <View style={{ flex: 1 }}>
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
                  value={email}
                  onChangeEmail={(email: string) => this.onChangeEmail(email)}
                  reset={this.resetEmail}
                />
              </View>
              <View style={{
                marginTop: 16,
                marginLeft: 32,
                marginRight: 32,
              }}
              >
                <PasswordTextBox
                  error={error}
                  value={password}
                  placeholder={strings(Strings.PASSWORD)}
                  onChangePassword={(password: string) => this.onChangePassword(password)}
                  reset={this.resetPassword}
                />
              </View>
              <SpinnerButton
                onPress={this.onLoginPress}
                mode={mode}
                text={strings(Strings.LOGIN)}
                icon="login"
              />
              <TouchableOpacity
                style={{ marginTop: 24 }}
                onPress={() => navigation.navigate(Pages.FORGOT_PASSWORD)}
              >
                <Text style={styles.text}>{strings(Strings.FORGOT_PASSWORD)}</Text>
              </TouchableOpacity>
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
        {this.renderAnimation()}
        <Text style={styles.text}>{strings('app_name')}</Text>
      </View>
    );
  }

  private renderAnimation () {
    return (
      <LottieView
        ref={(animation) => {
          this.animation = animation;
        }}
        source={require('../../assets/animations/foto_icon_')}
        loop={false}
        style={{ width: 300 }}
      />
    );
  }

  private renderOtherLoginSection () {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}
      >
        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.onSignUpPress()}>
          <Text style={styles.text}>{strings('sign_up')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private onLoginPress () {
    this.setState({ mode: PageModes.LOADING });
    const { loginUser } = this.props;
    const { email, password } = this.state;
    loginUser(email, password)
      .then((response) => {
        this.onSuccess(response);
      })
      .catch((error) => {
        this.onFail(error);
      });
  }

  private onSuccess (response) {
    const { updateUser, navigation } = this.props;
    updateUser();
    navigation.navigate(Pages.MAIN);
  }

  private onFail (error) {
    Toast.show({
      text: strings(Strings.WRONG_CREDENTIALS),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'danger',
    });
  }

  private onSignUpPress () {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  }

  private onChangeEmail (email: string) {
    this.setState(prevState => ({ email, mode: this.validate(email, prevState.password) }));
  }

  private onChangePassword (password: string) {
    this.setState(prevState => ({ password, mode: this.validate(prevState.email, password) }));
  }

  private resetEmail () {
    this.setState({ email: '', error: false, mode: PageModes.DISABLED });
  }

  private resetPassword () {
    this.setState({ password: '', error: false, mode: PageModes.DISABLED });
  }

  private validate (email: string, password: string) {
    if (checkPassword(password) && checkEmail(email)) {
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
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  updateUser: () => dispatch(updateUser()),
});

export default connect(null, mapDispatchToProps)(Login);
