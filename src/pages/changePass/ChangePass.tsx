import { Icon, Toast } from 'native-base';
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
import { Colors, PageModes, Strings } from '../../config';
import { checkPassword } from '../../helpers';
import { showFailureToast } from '../../helpers/Toasts';
import { strings } from '../../i18n';
import { changePassword } from './actions';

export interface IProps {
  navigation: NavigationScreenProp;
  changePassword: any;
}

interface IState {
  email: string;
  previousPassword: string;
  newPassword: string;
  repeatedPassword: string;
  mode: PageModes;
  error: boolean;
}

const INITIAL_STATE = {
  email: '',
  previousPassword: '',
  newPassword: '',
  repeatedPassword: '',
  mode: PageModes.DISABLED,
  error: false,
};

class ChangePass extends Component<IProps, IState> {

  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSaveChangesPressed = this.onSaveChangesPressed.bind(this);
  }

  public render () {
    const {
      error, previousPassword, newPassword, repeatedPassword, mode,
    } = this.state;
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
                  error={error}
                  placeholder={strings(Strings.CURRENT_PASSWORD)}
                  value={previousPassword}
                  onChangePassword={previousPassword => this.onPreviousPasswordChange(previousPassword)}
                  reset={() => this.props.reset()}
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
                  placeholder={strings(Strings.NEW_PASSWORD)}
                  value={newPassword}
                  onChangePassword={newPassword => this.onNewPasswordChange(newPassword)}
                  reset={() => this.props.reset()}
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
                  error={error}
                  placeholder={strings(Strings.REPEAT_NEW_PASSWORD)}
                  value={repeatedPassword}
                  onChangePassword={repeatedPassword => this.onRepeatedPasswordChange(repeatedPassword)}
                  reset={() => this.props.reset()}
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
                onPress={this.onSaveChangesPressed()}
                mode={mode}
                icon="check"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  private onSaveChangesPressed () {
    const { previousPassword, newPassword } = this.state;
    const { changePassword } = this.props;
    changePassword(previousPassword, newPassword)
      .then((result) => {
        this.onSuccess();
      })
      .catch((error) => {
        this.onFail();
      });
  }

  private onSuccess () {
    Toast.show({
      text: strings(Strings.CHANGE_PASS_SUCCESS),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'success',
      duration: 500,
      onClose: () => {
        this.props.navigation.goBack();
      },
    });
  }

  private onFail () {
    showFailureToast(strings(Strings.CHANGE_PASS_FAIL));
  }

  private onPreviousPasswordChange (previousPassword: string) {
    this.setState(prevState => ({
      previousPassword,
      mode: this.validate(previousPassword, prevState.newPassword, prevState.repeatedPassword),
    }));
  }

  private onNewPasswordChange (newPassword: string) {
    this.setState(prevState => ({
      newPassword,
      mode: this.validate(prevState.previousPassword, newPassword, prevState.repeatedPassword),
    }));
  }

  private onRepeatedPasswordChange (repeatedPassword: string) {
    this.setState(prevState => ({
      repeatedPassword,
      mode: this.validate(prevState.previousPassword, prevState.newPassword, repeatedPassword),
    }));
  }

  private validate (previousPassword: string, newPassword: string, repeatedPassword: string) {
    if (checkPassword(newPassword) && checkPassword(previousPassword)
      && newPassword === repeatedPassword) {
      return PageModes.NORMAL;
    }
    return PageModes.DISABLED;
  }
}

const mapDispatchToProps = dispatch => ({
  changePassword: (previousPassword: string, newPassword: string) =>
    dispatch(changePassword(previousPassword, newPassword)),
});

export default connect(null, mapDispatchToProps)(ChangePass);
