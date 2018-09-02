import React, {Component} from 'react';
import {Button, Text, Right, Left, Body} from 'native-base';
import {View, Dimensions, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import {CameraKitCamera} from 'react-native-camera-kit';
import CameraRollPicker from 'react-native-camera-roll-picker';
import SlidingUpPanel from 'rn-sliding-up-panel';
import ImagePicker from "react-native-image-crop-picker";
import {Strings, Colors, Fonts, Constants} from '../../config';
import {BackHeader, CustomStatusBar} from '../../components';

const HEIGHT = Dimensions.get('window').height;

export default class NewPost extends Component {
    state = {imageSource: '', hasChosen: false};

    render() {
        const {PHOTO_GALLERY} = Strings;
        return (
            <View style={{flex: 1}}>
                <CustomStatusBar/>
                <BackHeader onBackPress={() => this.props.navigation.navigate('Main')} title={PHOTO_GALLERY}/>
                <TouchableOpacity style={{flex: 1, backgroundColor: Colors.BASE}}
                                  onPress={() => this.onCameraScreenPress()}>
                    {this.renderCameraSection()}
                </TouchableOpacity>
                <SlidingUpPanel startCollapsed
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
        this.props.navigation.navigate('AddPostInfo', {imageSource});
    }

    renderButton() {
        if (this.state.hasChosen) {
            return (
                <View style={{position: 'absolute', bottom: 40, alignContent: 'center', alignSelf: 'center'}}>
                    <Button onPress={() => this.continue()} style={{alignSelf: 'center',
                        marginRight: 32, marginLeft: 32, marginTop: 16, width: 300, height: 50, backgroundColor: Colors.ACCENT, borderRadius: 10}}>
                        <Right />
                        <Body>
                            <Text style={{color: 'white', fontFamily: Fonts.NORMAL_FONT}}>{Strings.NEXT_LEVEL}</Text>
                        </Body>
                        <Left />
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
