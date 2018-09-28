import FormData from 'form-data';
import {
  ActionSheet, Input, Item, Text, Toast,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/UsersActions';
import { BackHeader, CustomLongTextBox, CustomStatusBar } from '../../components';
import BioInstruction from '../../components/BioInstruction';
import {
  Colors, Constants, PageModes, Strings,
} from '../../config';
import SaveChangesButton from '../../containers/SaveChangesButton';
import { extractImageSource } from '../../helpers';
import { strings } from '../../i18n';
import {
  selectBio,
  selectFullName,
  selectProfileIsPrivate,
  selectProfilePicture,
  selectSelfEmail,
  selectUsername,
} from '../../reducers/users.ts';
import {
  changeProfilePic, changeStatus, editProfile, normalize,
} from './actions';
import { selectImage, selectMode } from './reducer';

class ProfileEdit extends Component {
  state = {
    fullName: this.props.fullNameFromDB,
    bio: this.props.bioFromDB,
    imageFile: null,
    imageSource: this.props.imageSourceFromDB,
    isSwitchOn: false,
    toggleStatus: false,
  };

  componentWillMount() {
    this.props.normalize();
    this.setState({ isSwitchOn: this.props.isPrivate });
    this.setState({ toggleStatus: false });
  }

  render() {
    const { isSwitchOn, toggleStatus } = this.state;
    const { emailFromDB, usernameFromDB } = this.props;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <BackHeader
          onBackPress={() => this.onBackPress()}
          title={strings(Strings.EDIT_PROFILE)}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{
            backgroundColor: Colors.BASE,
            flex: 1,
            justifyContent: 'center',
          }}
          >
            <CustomStatusBar />
            <View style={{
              justifyContent: 'flex-start',
              marginTop: 32,
              flex: 1,
            }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: 32,
                  flex: 1,
                }}
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
                  source={{ uri: this.state.imageSource }}
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginBottom: 16,
                }}
                >
                  <View style={{ marginRight: 8 }}>
                    <Text style={{
                      color: 'white',
                      fontSize: Constants.TEXT_NORMAL_SIZE,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    >
                      {strings(Strings.PRIVATE)}
                    </Text>
                  </View>
                  <View>
                    <Switch
                      color={Colors.ACCENT}
                      value={isSwitchOn}
                      onValueChange={() => {
                        this.setState({ isSwitchOn: !isSwitchOn });
                        this.setState({ toggleStatus: !toggleStatus });
                      }
                      }
                    />
                  </View>
                </View>
                <Item style={styles.item} rounded>
                  <Input
                    disabled
                    placeholder={usernameFromDB}
                    style={{
                      textAlign: 'center',
                      fontSize: 10,
                    }}
                  />
                </Item>
                <Item style={styles.item} rounded>
                  <Input
                    value={this.state.fullName}
                    placeholder={strings(Strings.FIRST_LAST_NAME)}
                    style={{
                      textAlign: 'center',
                      fontSize: 10,
                    }}
                    onChangeText={(fullName) => {
                      this.setState({ fullName });
                    }}
                  />
                </Item>
                <Item style={styles.item} rounded>
                  <Input
                    disabled
                    placeholder={emailFromDB}
                    secureTextEntry={false}
                    style={{
                      textAlign: 'center',
                      fontSize: 10,
                    }}
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
                    style={{
                      textAlign: 'center',
                      fontSize: 10,
                    }}
                    value={this.state.bio}
                    onChangeText={(bio) => {
                      this.setState({ bio });
                    }}
                  />
                </Item>
                <BioInstruction />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  flex: 1,
                }}
              >
                <SaveChangesButton
                  text={strings(Strings.SAVE_CHANGES)}
                  icon="check"
                  onPress={() => this.onSaveChangesPressed()}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  onSaveChangesPressed() {
    const {
      mode, sendChangeStatus, updateUser, editProfile,
    } = this.props;
    const {
      fullName, bio, toggleStatus, imageFile,
    } = this.state;
    if (mode !== PageModes.LOADING && mode !== PageModes.SUCCESS) {
      editProfile(fullName, bio)
        .then((response) => {
          if (toggleStatus) {
            sendChangeStatus(toggleStatus);
          }
          if (imageFile !== null) {
            this.changeImage();
          } else {
            this.onSuccess();
          }
          updateUser();
        })
        .catch((error) => {
          this.onFail();
        });
    }
  }

  onSuccess() {
    this.props.updateUser();
    Toast.show({
      text: strings(Strings.EDIT_PROFILE_SUCCESS),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'success',
      duration: 250,
      onClose: () => this.props.navigation.goBack(),
    });
  }

  onFail() {
    Toast.show({
      text: strings(Strings.EDIT_PROFILE_FAIL),
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
    })
      .then((image) => {
        const imageSource = extractImageSource(image);
        this.setState({
          imageFile: image,
          imageSource,
        });
      });
  }

  onOpenCameraPress() {
    ImagePicker.openCamera({
      width: Constants.UPLOAD_POST_PICTURE_SIZE,
      height: Constants.UPLOAD_POST_PICTURE_SIZE,
      cropping: true,
    })
      .then((image) => {
        const imageSource = extractImageSource(image);
        this.setState({
          imageFile: image,
          imageSource,
        });
      });
  }

  changeImage() {
    const { imageSource, imageFile } = this.state;
    const formData = new FormData();
    formData.append('profile_picture', {
      uri: imageSource, // your file path string
      name: 'my_photo.jpg',
      type: imageFile.mime,
    });
    this.props.changeProfilePic(formData)
      .then((response) => {
        this.onSuccess();
      })
      .catch((error) => {
        this.onFail();
      });
  }
}

const styles = StyleSheet.create({
  item: {
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: Constants.TEXT_BOX_RADIUS,
    elevation: Constants.TEXT_BOX_ELEVATION,
  },
});

const mapStateToProps = state => ({
  usernameFromDB: selectUsername(state),
  emailFromDB: selectSelfEmail(state),
  fullNameFromDB: selectFullName(state),
  bioFromDB: selectBio(state),
  imageSourceFromDB: selectProfilePicture(state),
  mode: selectMode(state),
  image: selectImage(state),
  isPrivate: selectProfileIsPrivate(state),
});

const mapDispatchToProps = dispatch => ({
  normalize: () => dispatch(normalize()),
  updateUser: () => dispatch(updateUser()),
  editProfile: (fullName, bio) => dispatch(editProfile(fullName, bio)),
  changeProfilePic: formData => dispatch(changeProfilePic(formData)),
  sendChangeStatus: () => dispatch(changeStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
