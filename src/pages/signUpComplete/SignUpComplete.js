import React, {Component,} from 'react';
import {Container, Item, Input, Icon} from 'native-base';
import {View, TouchableOpacity, StyleSheet, StatusBar} from 'react-native'
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomLongTextBox, BackHeader} from '../../components';
import {Strings, Colors, Constants, PageModes, Fonts} from '../../config';
import SaveChangesButton from '../../containers/SaveChangesButton';
import {modeChanged, signUpUser, bioChanged, Actions, fullNameChanged, usernameChanged, reset} from './actions';

class SignUpComplete extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {username, bio, fullName} = this.props;
        const {USER_NAME, FIRST_LAST_NAME, ABOUT_YOU, COMPLETE_INFO} = Strings;
        return (
            <View>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={Colors.BASE}
                />
                <BackHeader onBackPress={() => this.props.navigation.goBack()}/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
                    <Container style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'flex-start'}}>
                        <TouchableOpacity style={styles.avatar}>
                            <Avatar xlarge rounded style={{alignSelf: 'center'}}/>
                        </TouchableOpacity>
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
                        <SaveChangesButton text={COMPLETE_INFO} icon='check'
                                           onPress={this.onSaveChangesPress.bind(this)}/>
                    </Container>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    onSaveChangesPress() {
        this.props.changeMode(PageModes.LOADING);
        const email = this.props.navigation.getParam('email');
        const password = this.props.navigation.getParam('password');
        const {username, fullName, bio} = this.props;
        this.props.signUpUser(email, password, username, fullName, bio);
    }

    onUsernameChange(username) {
        this.props.changeUsername(username);
    }

    onFullNameChange(fullName) {
        this.props.changeFullName(fullName);
    }

    onBioChange(bio) {
        this.props.changeBio(bio);
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
    username: state.signUpCompletePage.username,
    bio: state.signUpCompletePage.bio,
    fullName: state.signUpCompletePage.fullName,
    mode: state.signUpCompletePage.mode,
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
    changeUsername: (username) => dispatch(usernameChanged(username)),
    changeBio: (bio) => dispatch(bioChanged(bio)),
    changeFullName: (fullname) => dispatch(fullNameChanged(fullname)),
    signUpUser: (email, password, username, fullname, bio) => dispatch(signUpUser(email, password, username, fullname, bio)),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComplete);