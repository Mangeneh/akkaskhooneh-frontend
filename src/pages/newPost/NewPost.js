import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import {CameraKitCamera} from 'react-native-camera-kit';
import CameraRollPicker from 'react-native-camera-roll-picker';
import SlidingUpPanel from 'rn-sliding-up-panel';
import ImagePicker from "react-native-image-crop-picker";
import {Strings, Colors} from '../../config';
import {BackHeader, CustomStatusBar} from '../../components';
import ChoosePhotoButton from '../../containers/ChoosePhotoButton';

const HEIGHT = Dimensions.get('window').height;

export default class NewPost extends Component {
    state = {imageSource: '', hasChosen: false};

    render() {
        const {PHOTO_GALLERY} = Strings;
        return (
            <View style={{flex: 1}}>
                <CustomStatusBar/>
                <BackHeader onBackPress={() => this.navigation.goBack()} title={PHOTO_GALLERY}/>
                <TouchableOpacity style={{flex: 1, backgroundColor: Colors.BASE}}
                                  onPress={() => this.onCameraScreenPress()}>
                    {this.renderCameraSection()}
                </TouchableOpacity>
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
                {this.renderButton()}
            </View>
        );
    }

    onCameraScreenPress() {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            const imageSource = Platform.OS === 'ios' ? image.sourceURL : image.path;
            this.setState({imageSource, hasChosen: true});
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
                }}
            />
        )
    }

    continue() {
        const {imageSource} = this.state;
        this.props.navigation.navigate('AddPostInfo', {imageSource});
    }

    renderButton() {
        if (this.state.hasChosen) {
            return (
                <View style={{position: 'absolute', bottom: 40, alignContent: 'center', alignSelf: 'center'}}>
                    <ChoosePhotoButton style={{position: 'absolute', alignSelf: 'center'}} text={Strings.NEXT_LEVEL}
                                       onPress={() => this.continue()}/>
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