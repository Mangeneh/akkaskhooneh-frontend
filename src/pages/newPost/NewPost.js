import React, {Component} from 'react';
import {Button, Text, Right, Left, Body, Toast} from 'native-base';
import {View, Dimensions, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import {CameraKitCamera} from 'react-native-camera-kit';
import CameraRollPicker from 'react-native-camera-roll-picker';
import SlidingUpPanel from 'rn-sliding-up-panel';
import ImagePicker from "react-native-image-crop-picker";
import {Strings, Colors, Fonts, Constants, Pages} from '../../config';
import {BackHeader, CustomStatusBar} from '../../components';
import {strings} from "../../i18n";
import ImageResizer from 'react-native-image-resizer';

const HEIGHT = Dimensions.get('window').height;

export default class NewPost extends Component {
    state = {imageSource: '', hasChosen: false};

    render() {
        return (
            <View style={{flex: 1}}>
                <View>
                    <BackHeader onBackPress={() => this.props.navigation.navigate('Main')}
                                title={strings(Strings.PHOTO_GALLERY)}/>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={{flex: 1, backgroundColor: Colors.BASE}}
                                      onPress={() => this.onCameraScreenPress()}>
                        {this.renderCameraSection()}
                    </TouchableOpacity>
                    <View style={{height: '100%', width: '100%', position: 'absolute'}}>
                        <CustomStatusBar/>
                        <SlidingUpPanel showBackdrop
                                        draggableRange={{bottom: HEIGHT * 0.4, top: HEIGHT * 0.9}}
                                        visible>
                            <View style={{flex: 1, backgroundColor: Colors.LIGHT_GRAY}}>
                                <Icon type='MaterialIcons' name='drag-handle'
                                      style={{backgroundColor: Colors.LIGHT_GRAY}}/>
                                <CameraRollPicker selectSingleItem
                                                  callback={(image) => this.onSelectImage(image)}
                                                  backgroundColor={Colors.LIGHT_GRAY}/>
                            </View>
                        </SlidingUpPanel>
                    </View>
                    {this.renderButton()}
                </View>
            </View>
        );
    }

    onCameraScreenPress() {
        ImagePicker.openCamera({
            width: Constants.IMAGE_SIZE,
            height: Constants.IMAGE_SIZE,
            cropping: true
        }).then(image => {
            const imageSource = Platform.OS === 'ios' ? image.sourceURL : image.path;
            this.setState({imageSource, hasChosen: true});
            this.continue();
        });
    }

    renderCameraSection() {
        return (
            <CameraKitCamera
                ref={cam => this.camera = cam}
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
                shouldSaveToCameraRoll
                cameraOptions={{
                    ratioOverlay: '1:1',
                }}/>
        )
    }

    continue() {
        const {imageSource} = this.state;
        ImageResizer.createResizedImage(imageSource, 1080, 1080, "JPEG", 90).then((response) => {
            this.props.navigation.navigate(Pages.ADD_POST_INFO, {imageSource: response.uri});
          }).catch((err) => {
            Toast.show({
                text: strings(Strings.RESIZE_FAILED),
                textStyle: {textAlign: 'center'},
                position: 'bottom',
                type: 'danger'
            });
          });

    }

    renderButton() {
        if (this.state.hasChosen) {
            return (
                <View style={{
                    position: 'absolute',
                    bottom: 40,
                    alignContent: 'center',
                    alignSelf: 'center',
                    width: '100%'
                }}>
                    <Button onPress={() => this.continue()} style={{
                        alignSelf: 'center',
                        marginRight: 32,
                        marginLeft: 32,
                        marginTop: 16,
                        width: 300,
                        height: 50,
                        backgroundColor: Colors.ACCENT,
                        borderRadius: 10
                    }}>
                        <Body>
                        <Text style={{color: 'white'}}>{strings(Strings.NEXT)}</Text>
                        </Body>
                    </Button>
                </View>
            )
        }
    }

    onSelectImage(image) {
        if (image.length === 0) {
            this.setState({hasChosen: false});
        } else {
            this.setState({imageSource: image[0].uri, hasChosen: true});
        }
    }
}