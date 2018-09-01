import React, {Component,} from 'react';
import {Item, Input, ActionSheet, Icon, Toast} from 'native-base';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomLongTextBox, BackHeader,FullStatusBar} from '../../components';
import {Strings, Colors, Constants, PageModes, Fonts} from '../../config';
import SignUpCompleteButton from '../../containers/SignUpCompleteButton';
import {
    modeChanged,
    signUpUser,
    bioChanged,
    Actions,
    fullNameChanged,
    usernameChanged,
    reset,
    imageChanged
} from './actions';
import {accessTokenSet, refreshTokenSet, userUpdated} from '../../actions/UserInfoActions';
import ImagePicker from 'react-native-image-crop-picker';
import {checkUsername} from "../../helpers/Validators";

class SignUpComplete extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {username, bio, fullName} = this.props;
        const {USER_NAME, FIRST_LAST_NAME, ABOUT_YOU, COMPLETE_INFO} = Strings;
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
                                    source={{uri: this.props.image === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9n0_3cEO-YFRPdAicSd0HlrwafnECzagpAXiRBFYgUZ6vaYkatQ' : this.props.image}}/>
                        </TouchableOpacity>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Item style={styles.item} rounded>
                                <Input placeholder={USER_NAME}
                                       fontFamily={Fonts.NORMAL_FONT}
                                       style={styles.input}
                                       value={username}
                                       onChangeText={(username) => this.onUsernameChange(username)}
                                />
                            </Item>
                            <Item style={styles.item} rounded>
                                <Input placeholder={FIRST_LAST_NAME}
                                       fontFamily={Fonts.NORMAL_FONT}
                                       style={styles.input}
                                       value={fullName}
                                       onChangeText={(fullName) => this.onFullNameChange(fullName)}
                                />
                            </Item>
                            <Item style={styles.item} rounded disabled>
                                <Icon style={{color: Colors.SUCCESS}} name='mail'/>
                                <Input disabled placeholder={this.props.navigation.getParam('email')}
                                       fontFamily={Fonts.NORMAL_FONT}
                                       style={styles.input}/>
                            </Item>
                            <Item style={styles.item} rounded>

                                <CustomLongTextBox placeholder={ABOUT_YOU}
                                                   style={styles.input}
                                                   value={bio}
                                                   onChangeText={(bio) => this.onBioChange(bio)}/>
                            </Item>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <SignUpCompleteButton text={COMPLETE_INFO} icon='check'
                                                  onPress={this.onSaveChangesPress.bind(this)}/>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    onSaveChangesPress() {
        this.props.changeMode(PageModes.LOADING);
        const email = this.props.navigation.getParam('email');
        const password = this.props.navigation.getParam('password');
        const {username, fullName, bio} = this.props;
        this.props.signUpUser(email, password, username, fullName, bio)
            .then((response) => {
                if (response.type === Actions.SIGN_UP_SUCCESS) {
                    this.onSuccess(response);
                } else {
                    this.onFail();
                }
            });
    }

    onSuccess(response) {
        const {access, refresh} = response.payload.data;
        this.props.setAccessToken(access);
        this.props.setRefreshToken(refresh);
        this.props.updateUser();
        this.props.navigation.navigate('Main');
    }

    onFail(response) {
        Toast.show({
            text: Strings.SIGN_UP_FAIL,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'danger'
        });
    }

    onUsernameChange(username) {
        this.props.changeUsername(username);
        if (checkUsername(username)) {
            this.props.changeMode(PageModes.NORMAL);
        } else {
            this.props.changeMode(PageModes.DISABLED);
        }
    }

    onFullNameChange(fullName) {
        this.props.changeFullName(fullName);
    }

    onBioChange(bio) {
        this.props.changeBio(bio);
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
            height: 400,
            cropping: true
        }).then(image => {
            let imageSource = Platform.OS === 'ios' ? image.sourceURL : image.path;
            this.props.changeImage(imageSource);
        });
    }

    onOpenCameraPress() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.props.changeImage(image.sourceURL);
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
        fontFamily: Fonts.NORMAL_FONT,
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
    changeMode: (mode) => dispatch(modeChanged(mode)),
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