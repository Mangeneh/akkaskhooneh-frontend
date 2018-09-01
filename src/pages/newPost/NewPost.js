import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {CameraKitCamera} from 'react-native-camera-kit';
import {Strings, Colors} from '../../config';
import {BackHeader, CustomStatusBar} from '../../components';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {connect} from 'react-redux';
import {
    picSelected,
    Actions,
} from './actions';
import ChoosePhotoButton from '../../containers/ChoosePhotoButton';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {AndroidBackHandler} from "react-navigation-backhandler";

const HEIGHT = Dimensions.get('window').height;

class NewPost extends Component {
    static navigationOptions = {
        header: null
    };

    onBackButtonPressAndroid = () => {
        this.props.navigation.navigate('Main');
        return true;
    };

    render() {
        const {PHOTO_GALLERY} = Strings;
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
                <CustomStatusBar/>
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={PHOTO_GALLERY}/>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={{flex: 1, backgroundColor: Colors.BASE}} onPress={() => this.onCameraScreenPress()}>
                        <View style={{flex: 1, backgroundColor: Colors.ACCENT}}>
                            {this.renderCameraSection()}
                        </View>
                    </TouchableOpacity>
                    <SlidingUpPanel visible={true} style={{height: 100}}
                                    draggableRange={{bottom: HEIGHT * 0.4, top: HEIGHT * 0.9}} startCollapsed>
                        <View style={{flex: 1, backgroundColor: Colors.LIGHT_GRAY}}>
                            <Icon type='MaterialIcons' name='drag-handle' style={{backgroundColor: Colors.LIGHT_GRAY}}/>
                            <CameraRollPicker selectSingleItem={true}
                                              callback={this.getSelectedImages}
                                              backgroundColor={Colors.LIGHT_GRAY}
                            >
                                const image = await this.camera.capture(true);
                            </CameraRollPicker >

                        </View>
                    </SlidingUpPanel>
                    <View style={{position: 'absolute', bottom: 40, alignContent: 'center', alignSelf: 'center'}}>
                        <ChoosePhotoButton style={{position: 'absolute', alignSelf: 'center'}} text={Strings.NEXT_LEVEL}
                                           onPress={this.onNextPress.bind(this)}/>
                    </View>
                </View>
            </AndroidBackHandler>
        );
    }

    onBackPress() {
        this.props.navigation.navigate('Main');
    }

    async onCameraScreenPress() {
        const image = await this.camera.capture(true);
        console.warn('HELLO');
        if (image !== null) {
          console.warn('Success!')
        }
        else {
          console.warn('Fail!')
        }
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
        const {selectedPics} = this.props;
        this.props.selectPic(selectedPics),
            this.props.navigation.navigate('AddPostInfo');
    }
}

const mapStateToProps = (state) => ({
    selectedPics: state.newPostPage.selectedPics,
    mode: state.newPostPage.mode,
});

const mapDispatchToProps = (dispatch) => ({
    selectPic: (selectedPics) => dispatch(picSelected(selectedPics)),
});

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)