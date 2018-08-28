import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';
import {Item, Input, ActionSheet, Toast} from 'native-base';
import {View, TouchableOpacity, StyleSheet, StatusBar, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import FormData from 'form-data';
import {Strings, Colors, Constants, Fonts} from '../../config';
import {CustomLongTextBox, BackHeader} from '../../components';
import SaveChangesButton from '../../containers/SaveChangesButton';
import {modeChanged, editProfile, Actions, changeProfilePic} from './actions';
import {userUpdated} from '../../actions/UserInfoActions';
import {PageModes} from '../../config';

class ProfileEdit extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        fullName: this.props.fullNameFromDB,
        bio: this.props.bioFromDB,
        imageFile: null,
        imageSource: this.props.imageSourceFromDB,
        showToast: false
    };

    componentWillMount() {
        this.props.changeMode(PageModes.NORMAL);
    }

    render() {
        const {SAVE_CHANGES, EDIT_PROFILE, ABOUT_YOU, FIRST_LAST_NAME} = Strings;
        const {emailFromDB, usernameFromDB} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: Colors.BASE,}}>
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={EDIT_PROFILE}/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                    <View style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'center'}}>
                        <StatusBar
                            barStyle='light-content'
                            backgroundColor={Colors.BASE}
                        />
                        <View style={{justifyContent: 'flex-start', marginTop: 32, flex: 1}}>
                            <TouchableOpacity
                                style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 32, flex: 1}}
                                onPress={this.onChooseImagePress.bind(this)}>
                                <Avatar rounded large containerStyle={{alignSelf: 'center'}}
                                        icon={{name: 'camera', type: 'Feather'}}
                                        source={{uri: this.state.imageSource}}/>
                            </TouchableOpacity>

                            <View style={{flex: 1}}>
                                <Item style={styles.item} rounded>
                                    <Input disabled placeholder={usernameFromDB}
                                           fontFamily={Fonts.NORMAL_FONT}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                                </Item>

                                <Item style={styles.item} rounded>
                                    <Input value={this.state.fullName}
                                           placeholder={FIRST_LAST_NAME}
                                           fontFamily={Fonts.NORMAL_FONT}
                                           style={{textAlign: 'center', fontSize: 10}}
                                           onChangeText={(fullName) => {
                                               this.setState({fullName})
                                           }}/>
                                </Item>

                                <Item style={styles.item} rounded>
                                    <Input disabled placeholder={emailFromDB}
                                           secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                                </Item>

                                <Item style={styles.item} rounded>
                                    <CustomLongTextBox placeholder={ABOUT_YOU}
                                                       style={{textAlign: 'center', fontSize: 10}}
                                                       value={this.state.bio}
                                                       onChangeText={(bio) => {
                                                           this.setState({bio})
                                                       }}/>
                                </Item>
                            </View>

                            <View style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 20, flex: 1}}>
                                <SaveChangesButton text={SAVE_CHANGES} icon='check'
                                                   onPress={this.onSaveChangesPressed.bind(this)}/>
                            </View>

                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    onBackPress() {
        this.props.navigation.navigate('Profile');
    }

    onSaveChangesPressed() {
        this.props.editProfile(this.state.fullName, this.state.bio)
            .then((response) => {
                console.log(response);
                if (response.type === Actions.EDIT_PROFILE_SUCCESS) {
                    if (this.state.imageFile !== null) {
                        this.changeImage();
                    } else {
                        this.onSuccess();
                    }
                } else {
                    this.onFail();
                }
            })
    }

    onSuccess() {
        this.props.updateUser();
        Toast.show({
            text: Strings.EDIT_PROFILE_SUCCESS,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'success',
            duration: 500,
            onClose: () => this.props.navigation.goBack()
        });
    }

    onFail() {
        Toast.show({
            text: Strings.EDIT_PROFILE_FAIL,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'danger'
        });
    }

    onChooseImagePress() {
        let BUTTONS = [
            {text: 'Take Photo', icon: 'camera', iconColor: '#f42ced'},
            {text: 'Choose Photo', icon: 'flower', iconColor: '#ea943b'},
            {text: 'Cancel', icon: 'close', iconColor: '#25de5b'}];
        let CANCEL_INDEX = 2;
        ActionSheet.show({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
            },
            buttonIndex => {
                if (buttonIndex == 0) {
                    this.onOpenCameraPress()
                }
                if (buttonIndex == 1) {
                    this.onChooseFromGalleryPress()
                }
            })
    }

    onChooseFromGalleryPress() {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            const imageSource = Platform.OS === 'ios' ? image.sourceURL : image.path;
            this.setState({imageFile: image, imageSource});
        });
    }

    onOpenCameraPress() {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            const imageSource = Platform.OS === 'ios' ? image.sourceURL : image.path;
            this.setState({imageFile: image, imageSource});
        });
    }

    changeImage() {
        const {imageSource, imageFile} = this.state;
        const formData = new FormData();
        console.log(this.state);
        formData.append('profile_picture', {
            uri: imageSource, // your file path string
            name: 'my_photo.jpg',
            type: imageFile.mime
        });
        this.props.changeProfilePic(formData)
            .then((response) => {
                console.log(response);
                if (response.type === Actions.CHANGE_PROFILE_PIC_SUCCESS) {
                    this.onSuccess();
                } else {
                    this.onFail();
                }
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
    }
});

const mapStateToProps = (state) => ({
    mode: state.profileEditPage.mode,
    usernameFromDB: state.userInfo.user.username,
    emailFromDB: state.userInfo.user.email,
    fullNameFromDB: state.userInfo.user.fullname,
    bioFromDB: state.userInfo.user.bio,
    imageSourceFromDB: state.userInfo.user.profilePicture,
    image: state.profileEditPage.image,
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
    updateUser: () => dispatch(userUpdated()),
    editProfile: (fullName, bio) => dispatch(editProfile(fullName, bio)),
    changeProfilePic: (formData) => dispatch(changeProfilePic(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)