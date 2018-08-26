import React, {Component,} from 'react';
import {Container, Item, Input, ActionSheet} from 'native-base';
import {View, TouchableOpacity, StyleSheet, StatusBar, Platform} from 'react-native'
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomLongTextBox, BackHeader} from '../../components';
import {Strings, Colors, Constants, PageModes, Fonts} from '../../config';
import SaveChangesButton from '../../containers/SaveChangesButton';
import {modeChanged, imageChanged} from './actions';
import ImagePicker from 'react-native-image-crop-picker';

class SignUpComplete extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {email, username, bio, fullname} = this.props;
        const {USER_NAME, FIRST_LAST_NAME, ABOUT_YOU, COMPLETE_INFO} = Strings;
        return (
            <View>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={Colors.BASE}
                />
                <BackHeader onBackPress={() => this.props.navigation.goBack()}/>
                <KeyboardAwareScrollView>
                    <Container style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'flex-start'}}>
                        <TouchableOpacity
                            style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 32, marginTop: 0}} onPress={this.onChooseImagePress.bind(this)} >
                            <Avatar rounded xlarge containerStyle={{alignSelf: 'center'}} icon = {{name: 'camera', type:'Feather'}} source={{uri: this.props.image === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9n0_3cEO-YFRPdAicSd0HlrwafnECzagpAXiRBFYgUZ6vaYkatQ' : this.props.image}}/>
                        </TouchableOpacity>
                        <Item style={styles.item} rounded>
                            <Input placeholder={USER_NAME}
                                   fontFamily={Fonts.NORMAL_FONT}
                                   style={styles.input}
                                   value={username}
                            />
                        </Item>
                        <Item style={styles.item} rounded>
                            <Input placeholder={FIRST_LAST_NAME}
                                   fontFamily={Fonts.NORMAL_FONT}
                                   style={styles.input}
                                   value={fullname}
                            />
                        </Item>
                        <Item style={styles.item} rounded>
                            <Input disabled placeholder={this.props.navigation.getParam('email')}
                                   fontFamily={Fonts.NORMAL_FONT}
                                   style={styles.input}/>
                        </Item>
                        <Item style={styles.item} rounded>
                            <CustomLongTextBox placeholder={ABOUT_YOU}
                                               style={styles.input}/>
                        </Item>
                        <SaveChangesButton text={COMPLETE_INFO} icon='check'
                                           onPress={this.onSaveChangesPressed.bind(this)}/>
                    </Container>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    onSaveChangesPressed() {
        this.props.changeMode(PageModes.LOADING);
        const email = this.props.navigation.getParam('email');
        const password = this.props.navigation.getParam('password');
        this.props.signUpUser(email, password,)
    }

    onChooseImagePress() {
        let BUTTONS= [
            { text: "Take Photo", icon: "analytics", iconColor: "#f42ced"},
            { text: "Choose Photo", icon: "analytics", iconColor: "#ea943b"},
            { text: "Cancel", icon: "close", iconColor: "#25de5b" }];
        let CANCEL_INDEX = 2;
        ActionSheet.show({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
        }, 
        buttonIndex => {
            if(buttonIndex == 0) {this.onOpenCameraPress()};
            if(buttonIndex == 1) {this.onChooseFromGalleryPress()}
        })
    }

    onChooseFromGalleryPress() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
                let imageSource = Platform.OS === 'ios'? image.sourceURL : image.path;
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
        justifyContent: 'flex-start',
        marginTop: 8,
        marginBottom: 32
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
    mode: state.signUpCompletePage.mode,
    image: state.signUpCompletePage.image,
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
    signUpUser: (email, password, username, bio, fullname, phone) => dispatch(),
    changeImage: (image) => dispatch(imageChanged(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComplete);