import React, {Component,} from 'react';
import {Container, Item, Input} from 'native-base';
import {View, TouchableOpacity, StyleSheet, StatusBar} from 'react-native'
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomLongTextBox, BackHeader} from '../../components';
import {Strings, Colors, Constants, PageModes, Fonts} from '../../config';
import SaveChangesButton from '../../containers/SaveChangesButton';
import {modeChanged} from './actions';

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
                        <TouchableOpacity style={styles.avatar}>
                            <Avatar xlarge rounded style={{alignSelf: 'center'}}/>
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
    mode: state.signUpCompletePage.mode
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
    signUpUser: (email, password, username, bio, fullname, phone) => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComplete);