import {
  ActionSheet, Icon, Input, Item, Toast,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/UsersActions.ts';
import { BackHeader, CustomLongTextBox, FullStatusBar } from '../../components';
import BioInstruction from '../../components/BioInstruction';
import UsernameInstruction from '../../components/UsernameInstruction';
import {
  Addresses, Colors, Constants, Pages, Strings,
} from '../../config';
import SignUpCompleteButton from '../../containers/SignUpCompleteButton';
import { extractImageSource } from '../../helpers';
import { strings } from '../../i18n';
import {
  bioChanged,
  fullNameChanged,
  imageChanged,
  reset,
  signUpUser,
  usernameChanged,
} from './actions';
import {
  selectBio, selectFullName, selectImage, selectMode, selectUsername,
} from './reducer';

class SignUpComplete extends Component {
  render() {
    const {
      username, bio, fullName, changeUsername, changeFullName, changeBio,
    } = this.props;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <BackHeader onBackPress={() => this.props.navigation.goBack()} />

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <FullStatusBar />
          <View style={{
            backgroundColor: Colors.BASE,
            flex: 1,
          }}
          >
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => this.onChooseImagePress()}
            >
              <Avatar
                rounded
                large
                containerStyle={{ alignSelf: 'center' }}
                icon={{
                  name: 'camera',
                  type: 'Feather',
                }}
                source={{ uri: this.props.image === null ? Addresses.CHOOSE_AVATAR : this.props.image }}
              />
            </TouchableOpacity>
            <View style={{
              flex: 1,
              justifyContent: 'center',
            }}
            >
              <Item
                style={{
                  marginLeft: 32,
                  marginRight: 32,
                  backgroundColor: 'white',
                  borderRadius: Constants.TEXT_BOX_RADIUS,
                  elevation: Constants.TEXT_BOX_ELEVATION,
                }}
                rounded
              >
                <Input
                  placeholder={strings(Strings.USERNAME)}
                  style={styles.input}
                  value={username}
                  onChangeText={username => changeUsername(username)}
                />
              </Item>
              <UsernameInstruction />
              <Item style={styles.item} rounded>
                <Input
                  placeholder={strings(Strings.FIRST_LAST_NAME)}
                  style={styles.input}
                  value={fullName}
                  onChangeText={fullName => changeFullName(fullName)}
                />
              </Item>
              <Item style={styles.item} rounded disabled>
                <Icon style={{ color: Colors.SUCCESS }} name="mail" />
                <Input
                  disabled
                  placeholder={this.props.navigation.getParam('email')}
                  style={styles.input}
                />
              </Item>
              <Item
                style={{
                  marginLeft: 32,
                  marginRight: 32,
                  backgroundColor: 'white',
                  borderRadius: Constants.TEXT_BOX_RADIUS,
                  elevation: Constants.TEXT_BOX_ELEVATION,
                }}
                rounded
              >

                <CustomLongTextBox
                  placeholder={strings(Strings.ABOUT_YOU)}
                  style={styles.input}
                  value={bio}
                  onChangeText={bio => changeBio(bio)}
                />
              </Item>
              <BioInstruction />
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
            }}
            >
              <SignUpCompleteButton
                text={strings(Strings.COMPLETE_INFO)}
                icon="check"
                onPress={() => this.onSaveChangesPress()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  onSaveChangesPress() {
    const email = this.props.navigation.getParam('email');
    const password = this.props.navigation.getParam('password');
    const { username, fullName, bio } = this.props;
    this.props.signUpUser(email, password, username, fullName, bio)
      .then((response) => {
        this.onSuccess(response);
      })
      .catch((error) => {
        this.onFail();
      });
  }

  onSuccess(response) {
    const { updateUser, navigation } = this.props;
    updateUser();
    navigation.navigate(Pages.MAIN);
  }

  onFail(error) {
    Toast.show({
      text: strings(Strings.SIGN_UP_FAIL),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'danger',
    });
  }

  onChooseImagePress() {
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

  onChooseFromGalleryPress() {
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
        this.props.changeImage(imageSource);
      });
  }

  onOpenCameraPress() {
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
        this.props.changeImage(imageSource);
      });
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

const mapStateToProps = state => ({
  username: selectUsername(state),
  bio: selectBio(state),
  fullName: selectFullName(state),
  mode: selectMode(state),
  image: selectImage(state),
});

const mapDispatchToProps = dispatch => ({
  changeUsername: username => dispatch(usernameChanged(username)),
  changeBio: bio => dispatch(bioChanged(bio)),
  changeImage: image => dispatch(imageChanged(image)),
  changeFullName: fullname => dispatch(fullNameChanged(fullname)),
  signUpUser: (email, password, username, fullname, bio) => dispatch(signUpUser(email, password, username, fullname, bio)),
  updateUser: () => dispatch(updateUser()),
  reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComplete);
