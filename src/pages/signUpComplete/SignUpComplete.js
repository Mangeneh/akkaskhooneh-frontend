import React, {Component,} from 'react';
import {Item, Input, ActionSheet, Icon, Toast} from 'native-base';
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {CustomLongTextBox, BackHeader, FullStatusBar} from '../../components';
import {Strings, Colors, Constants, Addresses, Pages} from '../../config';
import SignUpCompleteButton from '../../containers/SignUpCompleteButton';
import {
    signUpUser,
    bioChanged,
    fullNameChanged,
    usernameChanged,
    reset,
    imageChanged
} from './actions';
import {accessTokenSet, refreshTokenSet, userUpdated} from '../../actions/UserInfoActions';
import {extractImageSource} from "../../helpers";
import {strings} from "../../i18n";

class SignUpComplete extends Component {
    render() {
        const {username, bio, fullName, changeUsername, changeFullName, changeBio} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: Colors.BASE}}>
                <BackHeader onBackPress={() => this.props.navigation.goBack()}/>

                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                    <FullStatusBar/>
                    <View style={{backgroundColor: Colors.BASE, flex: 1}}>
                        <TouchableOpacity
                            style={styles.avatar} onPress={this.onChooseImagePress.bind(this)}>
                            <Avatar rounded large containerStyle={{alignSelf: 'center'}}
                                    icon={{name: 'camera', type: 'Feather'}}
                                    source={{uri: this.props.image === null ? Addresses.CHOOSE_AVATAR : this.props.image}}/>
                        </TouchableOpacity>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Item style={styles.item} rounded>
                                <Input placeholder={strings(Strings.USERNAME)}
                                       style={styles.input}
                                       value={username}
                                       onChangeText={(username) => changeUsername(username)}
                                />
                            </Item>
                            <Item style={styles.item} rounded>
                                <Input placeholder={strings(Strings.COMPLETE_INFO)}
                                       style={styles.input}
                                       value={fullName}
                                       onChangeText={(fullName) => changeFullName(fullName)}
                                />
                            </Item>
                            <Item style={styles.item} rounded disabled>
                                <Icon style={{color: Colors.SUCCESS}} name='mail'/>
                                <Input disabled placeholder={this.props.navigation.getParam('email')}
                                       style={styles.input}/>
                            </Item>
                            <Item style={styles.item} rounded>

                                <CustomLongTextBox placeholder={strings(Strings.ABOUT_YOU)}
                                                   style={styles.input}
                                                   value={bio}
                                                   onChangeText={(bio) => changeBio(bio)}/>
                            </Item>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <SignUpCompleteButton text={strings(Strings.COMPLETE_INFO)} icon='check'
                                                  onPress={this.onSaveChangesPress.bind(this)}/>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    onSaveChangesPress() {
        const email = this.props.navigation.getParam('email');
        const password = this.props.navigation.getParam('password');
        const {username, fullName, bio} = this.props;
        this.props.signUpUser(email, password, username, fullName, bio)
            .then((response) => {
                this.onSuccess(response);
            })
            .catch((error) => {
                this.onFail();
            });
    }

    onSuccess(response) {
        const {access, refresh} = response.payload.data;
        this.props.setAccessToken(access);
        this.props.setRefreshToken(refresh);
        this.props.updateUser();
        this.props.navigation.navigate(Pages.MAIN);
    }

    onFail(error) {
        Toast.show({
            text: strings(Strings.SIGN_UP_FAIL),
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'danger'
        });
    }

    onChooseImagePress() {
        let BUTTONS = [
            {text: 'Take Photo', icon: 'analytics', iconColor: '#f42ced'},
            {text: 'Choose Photo', icon: 'analytics', iconColor: '#ea943b'},
            {text: 'Cancel', icon: 'close', iconColor: '#25de5b'}];
        let CANCEL_INDEX = 2;
        ActionSheet.show({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    this.onOpenCameraPress()
                }
                if (buttonIndex === 1) {
                    this.onChooseFromGalleryPress()
                }
            })
    }

    onChooseFromGalleryPress() {
        ImagePicker.openPicker({
            width: Constants.IMAGE_SIZE,
            height: Constants.IMAGE_SIZE,
            cropping: true
        }).then(image => {
            let imageSource = extractImageSource(image);
            this.props.changeImage(imageSource);
        });
    }

    onOpenCameraPress() {
        ImagePicker.openCamera({
            width: Constants.IMAGE_SIZE,
            height: Constants.IMAGE_SIZE,
            cropping: true
        }).then(image => {
            let imageSource = extractImageSource(image);
            this.props.changeImage(imageSource);
        });
    }
}

const styles = StyleSheet.create({
    avatar: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 32, flex: 1
    },
    item: {
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: Constants.TEXT_BOX_RADIUS,
        elevation: Constants.TEXT_BOX_ELEVATION
    },
    input: {
        textAlign: 'center',
        fontSize: 12
    },
});

const mapStateToProps = (state) => ({
    username: state.signUpCompletePage.username,
    bio: state.signUpCompletePage.bio,
    fullName: state.signUpCompletePage.fullName,
    mode: state.signUpCompletePage.mode,
    image: state.signUpCompletePage.image,
});

const mapDispatchToProps = (dispatch) => ({
    changeUsername: (username) => dispatch(usernameChanged(username)),
    changeBio: (bio) => dispatch(bioChanged(bio)),
    changeImage: (image) => dispatch(imageChanged(image)),
    changeFullName: (fullname) => dispatch(fullNameChanged(fullname)),
    signUpUser: (email, password, username, fullname, bio) => dispatch(signUpUser(email, password, username, fullname, bio)),
    setRefreshToken: (refreshToken) => dispatch(refreshTokenSet(refreshToken)),
    setAccessToken: (accessToken) => dispatch(accessTokenSet(accessToken)),
    updateUser: () => dispatch(userUpdated()),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComplete);