import {
  Body, Button, Text, Toast,
} from 'native-base';
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { CameraKitCamera } from 'react-native-camera-kit';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { BackHeader, CameraRollPicker, CustomStatusBar } from '../../components';
import {
  Colors, Constants, Pages, Parameters, Strings,
} from '../../config';
import { extractImageSource } from '../../helpers';
import { strings } from '../../i18n';

const HEIGHT = Dimensions.get('window').height;
const INITIAL_STATE = {
  imageSource: '',
  hasChosen: false,
};

export default class NewPost extends Component {
  state = INITIAL_STATE;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <BackHeader
            onBackPress={() => this.props.navigation.navigate(Pages.MAIN)}
            title={strings(Strings.PHOTO_GALLERY)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.BASE,
            }}
            onPress={() => this.onCameraScreenPress()}
          >
            {this.renderCameraSection()}
          </TouchableOpacity>
          <View style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}
          >
            <CustomStatusBar />
            <SlidingUpPanel
              showBackdrop
              draggableRange={{
                bottom: HEIGHT * 0.4,
                top: HEIGHT * 0.9,
              }}
              visible
            >
              <View style={{
                flex: 1,
                backgroundColor: Colors.LIGHT_GRAY,
              }}
              >
                <Icon
                  type="MaterialIcons"
                  name="drag-handle"
                  style={{ backgroundColor: Colors.LIGHT_GRAY }}
                />
                <CameraRollPicker
                  onSelectImage={uri => this.onSelectImage(uri)}
                />
              </View>
            </SlidingUpPanel>
          </View>
          {this.renderButton()}
        </View>
      </View>
    );
  }

  renderCameraSection() {
    return (
      <CameraKitCamera
        ref={cam => this.camera = cam}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        shouldSaveToCameraRoll
        cameraOptions={{
          ratioOverlay: '1:1',
        }}
      />
    );
  }

  renderButton() {
    if (this.state.hasChosen) {
      return (
        <View style={{
          position: 'absolute',
          bottom: 40,
          alignContent: 'center',
          alignSelf: 'center',
          width: '100%',
        }}
        >
          <Button
            onPress={() => this.openPicker()}
            style={{
              alignSelf: 'center',
              marginRight: 32,
              marginLeft: 32,
              marginTop: 16,
              width: 300,
              height: 50,
              backgroundColor: Colors.ACCENT,
              borderRadius: 10,
            }}
          >
            <Body>
              <Text style={{ color: 'white' }}>{strings(Strings.NEXT)}</Text>
            </Body>
          </Button>
        </View>
      );
    }
  }

  onCameraScreenPress() {
    ImagePicker.openCamera({
      mediaType: 'photo',
      width: Constants.UPLOAD_POST_PICTURE_SIZE,
      height: Constants.UPLOAD_POST_PICTURE_SIZE,
      cropping: true,
      avoidEmptySpaceAroundImage: false,
      cropperStatusBarColor: Colors.BASE,
      cropperToolbarColor: Colors.BASE,
    })
      .then((image) => {
        const imageSource = extractImageSource(image);
        this.setState({
          imageSource,
          hasChosen: true,
        });
        this.continue();
      });
  }

  onSelectImage(uri) {
    if (uri === '') {
      this.setState({ hasChosen: false });
    } else {
      this.setState({
        imageSource: uri,
        hasChosen: true,
      });
    }
  }

  openPicker() {
    ImagePicker.openCropper({
      path: this.state.imageSource,
      width: Constants.UPLOAD_POST_PICTURE_SIZE,
      height: Constants.UPLOAD_POST_PICTURE_SIZE,
      cropperStatusBarColor: Colors.BASE,
      cropperToolbarColor: Colors.BASE,
    }).then((image) => {
      const imageSource = extractImageSource(image);
      this.setState({
        imageSource,
        hasChosen: true,
      });
      this.continue();
    });
  }

  continue() {
    const { imageSource } = this.state;
    ImageResizer.createResizedImage(imageSource, Constants.UPLOAD_POST_PICTURE_SIZE, Constants.UPLOAD_POST_PICTURE_SIZE, 'JPEG', 90)
      .then((response) => {
        this.props.navigation.navigate(Pages.ADD_POST_INFO, { [Parameters.IMAGE_SOURCE]: response.uri });
      })
      .catch((err) => {
        Toast.show({
          text: strings(Strings.RESIZE_FAILED),
          textStyle: { textAlign: 'center' },
          position: 'bottom',
          type: 'danger',
        });
      });
  }
}
