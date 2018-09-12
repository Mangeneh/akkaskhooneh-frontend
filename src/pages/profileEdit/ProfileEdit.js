import FormData from 'form-data';
import {
  ActionSheet, Input, Item, Toast,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/UsersActions';
import { BackHeader, CustomLongTextBox, CustomStatusBar } from '../../components';
import { Colors, Constants, Strings } from '../../config';
import SaveChangesButton from '../../containers/SaveChangesButton';
import { extractImageSource } from '../../helpers';
import { strings } from '../../i18n';
import { changeProfilePic, editProfile, normalize } from './actions';

class ProfileEdit extends Component {
  state = {
    fullName: this.props.fullNameFromDB,
    bio: this.props.bioFromDB,
    imageFile: null,
    imageSource: this.props.imageSourceFromDB,
  };

  componentWillMount() {
    this.props.normalize();
  }

  render() {
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
                <Item style={styles.item} rounded>
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
    this.props.editProfile(this.state.fullName, this.state.bio)
      .then((response) => {
        if (this.state.imageFile !== null) {
          this.changeImage();
        } else {
          this.onSuccess();
        }
      })
      .catch((error) => {
        this.onFail();
      });
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
        text: 'Take Photo',
        icon: 'camera',
        iconColor: '#f42ced',
      },
      {
        text: 'Choose Photo',
        icon: 'flower',
        iconColor: '#ea943b',
      },
      {
        text: 'Cancel',
        icon: 'close',
        iconColor: '#25de5b',
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
      width: Constants.IMAGE_SIZE,
      height: Constants.IMAGE_SIZE,
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
      width: Constants.IMAGE_SIZE,
      height: Constants.IMAGE_SIZE,
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
  mode: state.profileEditPage.mode,
  usernameFromDB: state.users.user.username,
  emailFromDB: state.users.user.email,
  fullNameFromDB: state.users.user.fullname,
  bioFromDB: state.users.user.bio,
  imageSourceFromDB: state.users.user.profile_picture,
  image: state.profileEditPage.image,
});

const mapDispatchToProps = dispatch => ({
  normalize: () => dispatch(normalize()),
  updateUser: () => dispatch(updateUser()),
  editProfile: (fullName, bio) => dispatch(editProfile(fullName, bio)),
  changeProfilePic: formData => dispatch(changeProfilePic(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
