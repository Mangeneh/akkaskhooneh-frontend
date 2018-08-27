import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';
import {Item, Input, ActionSheet} from 'native-base';
import {View, TouchableOpacity, StyleSheet, StatusBar, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {Strings, Colors, Constants, Fonts, PageModes} from '../../config';
import {CustomLongTextBox, BackHeader} from '../../components';
import SaveChangesButton from '../../containers/SaveChangesButton';
import {modeChanged, imageChanged} from './actions';

class ProfileEdit extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {SAVE_CHANGES, EDIT_PROFILE} = Strings;
        const {email, username} = this.props;
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
                                        source={{uri: this.props.image === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9n0_3cEO-YFRPdAicSd0HlrwafnECzagpAXiRBFYgUZ6vaYkatQ' : this.props.image}}/>
                            </TouchableOpacity>

                            <View style={{flex: 1}}>
                                <Item style={styles.item} rounded>
                                    <Input disabled placeholder={'username got from db!!'}
                                           fontFamily={Fonts.NORMAL_FONT}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                                </Item>

                                <Item style={styles.item} rounded>
                                    <Input placeholder={'name got from db!!'}
                                           fontFamily={Fonts.NORMAL_FONT}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                                </Item>

                                <Item style={styles.item} rounded>
                                    <Input disabled placeholder={'email got from db!!'}
                                           secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                                </Item>

                                <Item style={styles.item} rounded>
                                    <CustomLongTextBox placeholder={'info got from db!!'}
                                                       style={{textAlign: 'center', fontSize: 10}}/>
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
        this.props.changeMode(PageModes.LOADING);
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
    username: state.userInfo.username,
    email: state.userInfo.email,
    image: state.profileEditPage.image,
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
    changeImage: (image) => dispatch(imageChanged(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)