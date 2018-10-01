import { Icon } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import {
  BackHeader,
  CustomStatusBar,
  PasswordInstruction,
  PasswordTextBox,
  SpinnerButton,
} from '../../components';
import { Colors, PageModes, Pages, Parameters, Strings } from '../../config';
import { checkPassword } from '../../helpers';
import { showFailureToast } from '../../helpers/Toasts';
import { strings } from '../../i18n';
import { getNewPassword, passwordChanged } from './actions';
import { selectError, selectMode } from './reducer';

export interface IProps {
  navigation: NavigationScreenProp;
  sendNewPassword: any;
}

interface IState {
  password: string;
  repeatedPassword: string;
  mode: PageModes;
}

const INITIAL_STATE = {
  password: '',
  repeatedPassword: '',
  mode: PageModes.DISABLED,
};

class GetNewPassword extends Component<IProps, IState> {

  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSaveNewPasswordPressed = this.onSaveNewPasswordPressed.bind(this);
  }

  public render () {
    const { password, repeatedPassword, mode } = this.state;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <BackHeader title={strings(Strings.CHANGE_PASS)}/>
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
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            >
              <Icon name="key" style={{ color: 'white' }}/>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}
            >
              <View style={{
                marginTop: 16,
                marginLeft: 32,
                marginRight: 32,
              }}
              >
                <PasswordTextBox
                  placeholder={strings(Strings.NEW_PASSWORD)}
                  value={password}
                  onChangePassword={(password) => this.onChangePassword(password)}
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
                  placeholder={strings(Strings.REPEAT_NEW_PASSWORD)}
                  value={repeatedPassword}
                  onChangePassword={(repeatedPassword) => this.onChangeRepeatedPassword(repeatedPassword)}
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
                text={strings(Strings.SAVE_NEW_PASSWORD)}
                onPress={this.onSaveNewPasswordPressed}
                mode={mode}
                icon="check"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  public onChangePassword (password: string) {
    this.setState(prevState => ({
      password,
      mode: this.validate(password, prevState.repeatedPassword),
    }));

  }

  public onChangeRepeatedPassword (repeatedPassword: string) {
    this.setState(prevState => ({
      repeatedPassword,
      mode: this.validate(prevState.password, repeatedPassword),
    }));
  }

  private onSaveNewPasswordPressed () {
    this.setState({ mode: PageModes.LOADING });
    const { password, repeatedPassword } = this.state;
    const { sendNewPassword, navigation } = this.props;
    if (password === repeatedPassword) {
      sendNewPassword(navigation.getParam(Parameters.TOKEN), password)
        .then((response) => {
          this.setState({ mode: PageModes.SUCCESS });
          navigation.navigate(Pages.LOGIN);
        })
        .catch((error) => {
          this.setState({ mode: PageModes.ERROR });
          showFailureToast(strings(Strings.CHANGE_PASS_FAIL));
        });
    }
  }

  private validate (password: string, repeatedPassword: string) {
    if (checkPassword(password) && password === repeatedPassword) {
      return PageModes.NORMAL;
    }
    return PageModes.DISABLED;
  }
}

const mapDispatchToProps = dispatch => ({
  sendNewPassword: (token: string, password: string) => dispatch(getNewPassword(token, password)),
});

export default connect(null, mapDispatchToProps)(GetNewPassword);
