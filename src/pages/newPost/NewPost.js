import React, {Component} from 'react';
import {View} from 'react-native';
import {CameraKitCamera} from 'react-native-camera-kit';
import {Strings, Colors} from '../../config';
import {BackHeader} from '../../components';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {connect} from 'react-redux';
import {
    picSelected,
    Actions,
} from './actions';
import ChoosePhotoButton from '../../containers/ChoosePhotoButton';

class NewPost extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {PHOTO_GALLERY} = Strings;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: Colors.BASE}}>
                    <BackHeader onBackPress={this.onBackPress.bind(this)} title={PHOTO_GALLERY}/>
                    <View style={{flex: 1, backgroundColor: Colors.ACCENT}}>
                        {this.renderCameraSection()}
                    </View>

                    <View style={{flex: 1, backgroundColor: 'white'}}>
                        <CameraRollPicker selectSingleItem = {true}
                            callback={this.getSelectedImages} 
                            backgroundColor={Colors.LIGHT_GRAY}
                            />

                    </View>
                </View>
                <View style={{position: 'absolute', bottom: 40}}>
                    <ChoosePhotoButton style={{position: 'absolute', alignSelf: 'center'}} text={Strings.NEXT_LEVEL} onPress={this.onNextPress.bind(this)}/>
                </View>
            </View>
        );
    }

    

    onBackPress() {
        this.props.navigation.navigate('Main');
    }

    renderCameraSection() {
        return (
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
                    ratioOverlay: '1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
                    ratioOverlayColor: '#00000077' // optional
                }}
                onReadQRCode={(event) => console.log(event.nativeEvent.qrcodeStringValue)} // optionalx
            />
        )
    }

    onNextPress() {
        this.props.navigation.navigate('Login');
    }
}

const mapStateToProps = (state) => ({
    selectedPics: state.newPostPage.selectedPics,
    mode: state.newPostPage.mode,
});

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(mapStateToProps, null)(NewPost)