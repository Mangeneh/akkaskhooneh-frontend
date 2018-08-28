import React, {Component} from 'react';
import {Toast, Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {Strings, Colors, PageModes} from '../../config';
import {BackHeader} from '../../components';
import {PasswordTextBox} from '../../components';
import {checkPassword} from "../../helpers/Validators";
import ChangePassButton from '../../containers/ChangePassButton';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import {CameraKitGalleryView, CameraKitCamera} from 'react-native-camera-kit';


export default class NewPost extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {PHOTO_GALLERY} = Strings;
        return (
            <View style={{flex: 1, backgroundColor: Colors.BASE}}>
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={PHOTO_GALLERY}/>
                <View style = {{flex: 1, backgroundColor: Colors.ACCENT}}>
                    <CameraKitCamera
                        ref={cam => this.camera = cam}
                        style={{
                            flex: 1,
                            backgroundColor: 'white'
                        }}
                        cameraOptions={{
                            flashMode: 'auto',             // on/off/auto(default)
                            focusMode: 'on',               // off/on(default)
                            zoomMode: 'on',                // off/on(default)
                            ratioOverlay:'1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
                            ratioOverlayColor: '#00000077' // optional
                        }}
                        onReadQRCode={(event) => console.log(event.nativeEvent.qrcodeStringValue)} // optional
                        
                        />
                </View>

                <View style = {{flex: 1, backgroundColor: 'white'}}>
                    <CameraKitGalleryView
                        ref={gallery => this.gallery = gallery}
                        style={{flex: 1, marginTop: 20}}
                        minimumInteritemSpacing={10}
                        minimumLineSpacing={10}
                        // albumName={<ALBUM_NAME>}
                        columnCount={3}
                        onTapImage={event => {
                            // event.nativeEvent.selected - ALL selected images ids
                        }}
                        // selectedImages={<MAINTAIN_SELECETED_IMAGES>}
                        // selectedImageIcon={require('<IMAGE_FILE_PATH>')}
                        // unSelectedImageIcon={require('<IMAGE_FILE_PATH>')}
                    />
                </View>

            </View>
        );
    }

    onBackPress() {
        this.props.navigation.navigate('Profile');
    }

}



