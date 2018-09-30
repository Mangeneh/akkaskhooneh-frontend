import { ActionSheet, Icon, Input, Item, } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions';
import { updateUserInfo } from '../../actions/UsersActions.ts';
import { BackHeader, CustomLongTextBox, FullStatusBar, SpinnerButton } from '../../components';
import BioInstruction from '../../components/BioInstruction';
import UsernameInstruction from '../../components/UsernameInstruction';
import { Addresses, Colors, Constants, Pages, Parameters, Strings, } from '../../config';
import { PageModes } from '../../config/PageModes';
import { checkUsername, extractImageSource } from '../../helpers';
import { showFailureToast } from '../../helpers/Toasts';
import { strings } from '../../i18n';

export interface IProps {
  navigation: NavigationScreenProp;
  signUpUser: any;
}

interface IState {
  mode: PageModes;
  image: string;
  bio: string;
  username: string;
  fullName: string;
}

const INITIAL_STATE = {
  mode: PageModes.NORMAL,
  image: null,
  bio: '',
  username: '',
  fullName: '',
};

class SignUpComplete extends Component<IProps, IState> {

  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSaveChangesPress = this.onSaveChangesPress.bind(this);
    this.onChooseImagePress = this.onChooseImagePress.bind(this);
  }

  public render () {
    const { username, bio, fullName, mode, image } = this.state;
    const { navigation } = this.props;
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
          <FullStatusBar/>
          <View style={{
            backgroundColor: Colors.BASE,
            flex: 1,
          }}
          >
            <TouchableOpacity
              style={styles.avatar}
              onPress={this.onChooseImagePress}
            >
              <Avatar
                rounded
                large
                containerStyle={{ alignSelf: 'center' }}
                icon={{
                  name: 'camera',
                  type: 'Feather',
                }}
                source={{ uri: image === null ? Addresses.CHOOSE_AVATAR : image }}
              />
            </TouchableOpacity>
            <View style={{
              flex: 1,
              justifyContent: 'center',
            }}
            >
              <Item style={styles.item} rounded>
                <Input
                  placeholder={strings(Strings.USERNAME)}
                  style={styles.input}
                  value={username}
                  onChangeText={username => this.onChangeUsername(username)}
                />
              </Item>
              <UsernameInstruction/>
              <Item style={styles.middleItem} rounded>
                <Input
                  placeholder={strings(Strings.FIRST_LAST_NAME)}
                  style={styles.input}
                  value={fullName}
                  onChangeText={fullName => this.onChangeFullName(fullName)}
                />
              </Item>
              <Item style={styles.middleItem} rounded disabled>
                <Icon style={{ color: Colors.SUCCESS }} name="mail"/>
                <Input
                  disabled
                  placeholder={navigation.getParam(Parameters.EMAIL)}
                  style={styles.input}
                />
              </Item>
              <Item style={styles.item} rounded>
                <CustomLongTextBox
                  placeholder={strings(Strings.ABOUT_YOU)}
                  style={styles.input}
                  value={bio}
                  onChangeText={bio => this.onChangeBio(bio)}
                />
              </Item>
              <BioInstruction/>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
            }}
            >
              <SpinnerButton
                onPress={this.onSaveChangesPress}
                mode={mode}
                text={strings(Strings.COMPLETE_INFO)}
                icon="check"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  private onChooseImagePress () {
    const BUTTONS = [
      {
        text: strings(Strings.CAMERA),
        icon: 'camera',
        iconColor: Colors.ACCENT,
      },
      {
        text: strings(Strings.PHOTO_GALLERY),
        icon: 'flower',
        iconColor: Colors.BASE,
      },
      {
        text: strings(Strings.CANCEL),
        icon: 'close',
        iconColor: Colors.ICON,
      }];
    const CANCEL_INDEX = 2;
    ActionSheet.show({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.onOpenCameraPress();
        }
        if (buttonIndex === 1) {
          this.onChooseFromGalleryPress();
        }
      });
  }

  private onChooseFromGalleryPress () {
    ImagePicker.openPicker({
      width: Constants.UPLOAD_POST_PICTURE_SIZE,
      height: Constants.UPLOAD_POST_PICTURE_SIZE,
      cropping: true,
      avoidEmptySpaceAroundImage: false,
      cropperStatusBarColor: Colors.BASE,
      cropperToolbarColor: Colors.BASE,
    })
      .then((image) => {
        const imageSource = extractImageSource(image);
        this.setState({ image: imageSource });
      });
  }

  private onOpenCameraPress () {
    ImagePicker.openCamera({
      width: Constants.UPLOAD_POST_PICTURE_SIZE,
      height: Constants.UPLOAD_POST_PICTURE_SIZE,
      cropping: true,
      avoidEmptySpaceAroundImage: false,
      cropperStatusBarColor: Colors.BASE,
      cropperToolbarColor: Colors.BASE,
    })
      .then((image) => {
        const imageSource = extractImageSource(image);
        this.setState({ image: imageSource });
      });
  }

  private onChangeBio (bio: string) {
    this.setState({ bio });
  }

  private onChangeFullName (fullName: string) {
    this.setState({ fullName });
  }

  private onChangeUsername (username: string) {
    this.setState({ username, mode: this.validate(username) });
  }

  private validate (username: string) {
    if (checkUsername(username)) {
      return PageModes.NORMAL;
    }
    return PageModes.DISABLED;
  }


  private onSaveChangesPress () {
    this.setState({ mode: PageModes.LOADING });
    const { navigation, signUpUser } = this.props;
    const email = navigation.getParam(Parameters.EMAIL);
    const password = navigation.getParam(Parameters.PASSWORD);
    const { username, fullName, bio } = this.state;
    signUpUser(email, password, username, fullName, bio)
      .then((response) => {
        this.onSuccess(response);
      })
      .catch((error) => {
        this.onFail(error);
      });
  }

  private onSuccess (response) {
    this.setState({ mode: PageModes.SUCCESS });
    const { navigation } = this.props;
    navigation.navigate(Pages.MAIN);
  }

  private onFail (error) {
    this.setState({ mode: PageModes.ERROR });
    showFailureToast(strings(Strings.SIGN_UP_FAIL));
  }
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    flex: 1,
  },
  item: {
    marginLeft: 32,
    marginRight: 32,
    backgroundColor: 'white',
    borderRadius: Constants.TEXT_BOX_RADIUS,
    elevation: Constants.TEXT_BOX_ELEVATION,
  },
  middleItem: {
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: Constants.TEXT_BOX_RADIUS,
    elevation: Constants.TEXT_BOX_ELEVATION,
  },
  input: {
    textAlign: 'center',
    fontSize: 12,
  },
});

const mapDispatchToProps = dispatch => ({
  signUpUser: (email: string, password: string, username: string, fullname: string, bio: string) =>
    dispatch(dispatch => {
      return dispatch(signUpUser(email, password, username, fullname, bio))
        .then(() => dispatch(updateUserInfo()));
    }),
});

export default connect(null, mapDispatchToProps)(SignUpComplete);
