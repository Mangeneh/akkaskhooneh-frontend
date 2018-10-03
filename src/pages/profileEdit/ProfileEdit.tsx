import FormData from 'form-data';
import { ActionSheet, Input, Item, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Switch } from 'react-native-paper';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { changeProfilePic, changeStatus, editProfile, updateUserInfo } from '../../actions';
import { BackHeader, BioInstruction, CustomLongTextBox, CustomStatusBar } from '../../components';
import SpinnerButton from '../../components/SpinnerButton';
import { Colors, Constants, PageModes, Strings } from '../../config';
import { extractImageSource } from '../../helpers';
import { showFailureToast } from '../../helpers/Toasts';
import { strings } from '../../i18n';
import {
  selectBio,
  selectFullName,
  selectProfileIsPrivate,
  selectProfilePicture,
  selectSelfEmail,
  selectUsername,
} from '../../reducers/users';

export interface IProps {
  navigation: NavigationScreenProp;
  usernameFromDB: string;
  emailFromDB: string;
  fullNameFromDB: string;
  bioFromDB: string;
  imageSourceFromDB: string;
  isPrivate: boolean;
  updateUser: any;
  editProfile: any;
  changeProfilePic: any;
  sendChangeStatus: any;
}

interface IState {
  fullName: string;
  bio: string;
  imageFile: any;
  imageSource: string;
  isSwitchOn: boolean;
  toggleStatus: boolean;
  mode: PageModes;
}

class ProfileEdit extends Component<IProps, IState> {

  constructor (props) {
    super(props);
    this.state = {
      fullName: props.fullNameFromDB,
      bio: props.bioFromDB,
      imageFile: null,
      imageSource: props.imageSourceFromDB,
      isSwitchOn: props.isPrivate,
      toggleStatus: false,
      mode: PageModes.NORMAL,
    };
    this.onSaveChangesPressed = this.onSaveChangesPressed.bind(this);
    this.onChooseImagePress = this.onChooseImagePress.bind(this);
    this.onSwitchPress = this.onSwitchPress.bind(this);
  }

  public render () {
    const { isSwitchOn, fullName, bio, mode } = this.state;
    const { emailFromDB, usernameFromDB } = this.props;
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.BASE,
      }}
      >
        <BackHeader title={strings(Strings.EDIT_PROFILE)}/>
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
            <CustomStatusBar/>
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
                      onValueChange={this.onSwitchPress}
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
                    value={fullName}
                    placeholder={strings(Strings.FIRST_LAST_NAME)}
                    style={{
                      textAlign: 'center',
                      fontSize: 10,
                    }}
                    onChangeText={(fullName) => this.onFullNameChange(fullName)}
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
                    value={bio}
                    onChangeText={(bio) => this.onChangeBio(bio)}
                  />
                </Item>
                <BioInstruction/>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  flex: 1,
                }}
              >
                <SpinnerButton
                  onPress={this.onSaveChangesPressed}
                  mode={mode}
                  text={strings(Strings.SAVE_CHANGES)}
                  icon="check"
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  private onChangeBio (bio: string) {
    this.setState({ bio });
  }

  private onFullNameChange (fullName: string) {
    this.setState({ fullName });
  }

  private onSwitchPress () {
    this.setState(prevState => ({
      isSwitchOn: !prevState.isSwitchOn,
      toggleStatus: !prevState.toggleStatus,
    }));
  }

  private onSaveChangesPressed () {
    this.setState({ mode: PageModes.LOADING });
    const { sendChangeStatus, editProfile } = this.props;
    const {
      fullName, bio, toggleStatus, imageFile,
    } = this.state;
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
      })
      .catch((error) => {
        this.onFail();
      });
  }

  private onSuccess () {
    this.setState({ mode: PageModes.SUCCESS });
    const { updateUser, navigation } = this.props;
    updateUser();
    Toast.show({
      text: strings(Strings.EDIT_PROFILE_SUCCESS),
      textStyle: { textAlign: 'center' },
      position: 'bottom',
      type: 'success',
      duration: 250,
      onClose: () => navigation.goBack(),
    });
  }

  private onFail () {
    this.setState({ mode: PageModes.NORMAL });
    showFailureToast(strings(Strings.EDIT_PROFILE_FAIL));
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
    })
      .then((image) => {
        const imageSource = extractImageSource(image);
        this.setState({
          imageFile: image,
          imageSource,
        });
      });
  }

  private onOpenCameraPress () {
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

  private changeImage () {
    const { imageSource, imageFile } = this.state;
    const formData = new FormData();
    formData.append('profile_picture', {
      uri: imageSource,
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
  isPrivate: selectProfileIsPrivate(state),
});

const mapDispatchToProps = dispatch => ({
  updateUser: () => dispatch(updateUserInfo()),
  editProfile: (fullName: string, bio: string) => dispatch(editProfile(fullName, bio)),
  changeProfilePic: formData => dispatch(changeProfilePic(formData)),
  sendChangeStatus: () => dispatch(changeStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
