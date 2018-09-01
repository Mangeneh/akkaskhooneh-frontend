import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import {CameraKitCamera} from 'react-native-camera-kit';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {connect} from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import ImagePicker from "react-native-image-crop-picker";
import {Strings, Colors} from '../../config';
import {BackHeader, CustomStatusBar} from '../../components';
import {picSelected} from './actions';
import ChoosePhotoButton from '../../containers/ChoosePhotoButton';

const HEIGHT = Dimensions.get('window').height;

class NewPost extends Component {
    render() {
        const {PHOTO_GALLERY} = Strings;
        return (
            <View style={{flex: 1}}>
                <CustomStatusBar/>
                <BackHeader onBackPress={()=>this.navigation.goBack()} title={PHOTO_GALLERY}/>
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
                        <CameraRollPicker selectSingleItem={true}
                                          callback={this.getSelectedImages}
                                          backgroundColor={Colors.LIGHT_GRAY}/>
                    </View>
                </SlidingUpPanel>
                <View style={{position: 'absolute', bottom: 40, alignContent: 'center', alignSelf: 'center'}}>
                    <ChoosePhotoButton style={{position: 'absolute', alignSelf: 'center'}} text={Strings.NEXT_LEVEL}
                                       onPress={this.onNextPress.bind(this)}/>
                </View>
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
            console.log(image);
            this.setState({imageFile: image, imageSource});
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

    onNextPress() {
        const {selectedPics} = this.props;
        this.props.selectPic(selectedPics);
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)