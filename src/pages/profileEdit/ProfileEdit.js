import React, {Component} from 'react';
import CustomTextBox from '../../components/CustomTextBox';
import CustomLongTextBox from '../../components/CustomLongTextBox';
import {Container, Item} from 'native-base';
import {View, TouchableOpacity, StyleSheet, StatusBar} from 'react-native'
import {Strings} from '../../config/Strings';
import RoundAvatar from "../../components/RoundAvatar";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from "../../config/Colors";
import Constants from "../../config/Constants";
import SaveChangesButton from '../../containers/SaveChangesButton';
import {SaveInfoMode} from "../../config/SaveInfoMode";
import {connect} from 'react-redux';
import {modeChanged} from './actions';
import BackHeader from "../../components/BackHeader";

class ProfileEdit extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {SAVE_CHANGES} = Strings;
        return (
            <View>
                <BackHeader onBackPress={this.onBackPress.bind(this)}/>
                <KeyboardAwareScrollView>
                    <Container style={{backgroundColor: 'white', flex: 1, justifyContent: 'center', marginTop: 0}}>
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor={Colors.BASE}
                        />
                        <View style={{justifyContent: 'center', flex: 1}}>
                            <TouchableOpacity
                                style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 40, marginTop: 0}}>
                                <RoundAvatar xlarge={true} style={{alignSelf: 'center'}}/>
                            </TouchableOpacity>

                            <Item style={styles.item} rounded>
                                <CustomTextBox disabled={true} placeholder={'username got from db!!'}
                                               secureTextEntry={false}
                                               style={{textAlign: 'center', fontSize: 10}}/>
                            </Item>

                            <Item style={styles.item} rounded>
                                <CustomTextBox placeholder={'name got from db!!'} secureTextEntry={false}
                                               style={{textAlign: 'center', fontSize: 10}}/>
                            </Item>

                            <Item style={styles.item} rounded>
                                <CustomTextBox disabled={true} placeholder={'email got from db!!'}
                                               secureTextEntry={false}
                                               style={{textAlign: 'center', fontSize: 10}}/>
                            </Item>

                            <Item style={styles.item} rounded>
                                <CustomLongTextBox placeholder={'info got from db!!'}
                                                   style={{textAlign: 'center', fontSize: 10}}/>
                            </Item>

                            <View style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 20}}>
                                <SaveChangesButton text={SAVE_CHANGES} icon="check"
                                                   onPress={this.onSaveChangesPressed.bind(this)}/>
                            </View>

                        </View>
                    </Container>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    onBackPress() {
        this.props.navigation.navigate('Profile');
    }

    onSaveChangesPressed() {
        this.props.changeMode(SaveInfoMode.LOADING);
    }
}

const styles = StyleSheet.create({
    item: {
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: Constants.TEXT_BOX_RADIUS,
        elevation: Constants.TEXT_BOX_ELEVATION
    }
});

const mapStateToProps = (state) => ({
    mode: state.profileEditPage.mode,
    lastTokenUpdateTime: state.userInfo.lastTokenUpdateTime
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)