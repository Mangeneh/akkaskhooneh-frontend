import React, {Component} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import CustomLongTextBox from '../components/CustomLongTextBox';
import {Container, Item} from 'native-base';
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Strings} from '../config/Strings';
import RoundAvatar from "../components/RoundAvatar";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from "../config/Colors";
import Constants from "../config/Constants";
import SaveChangesButton from '../containers/SaveChangesButton';
import {ProfileEditPageModes} from "../config/ProfileEditPageModes";
import {connect} from 'react-redux';
import {modeChanged} from '../actions/LoginPageActions';

class ProfileEditPage extends Component {
    render() {
        const {SAVE_CHANGES} = Strings;
        return (
            <KeyboardAwareScrollView>
                <Container style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'center'}}>

                    <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', flex: 3}}>
                        <RoundAvatar xlarge={true} style={{alignSelf: 'center'}}/>
                    </TouchableOpacity>

                    <View style={{justifyContent: 'center', flex: 4}}>
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
                    </View>

                    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 2}}>
                        <SaveChangesButton text={SAVE_CHANGES} icon="check"
                                           onPress={this.onSaveChangesPressed.bind(this)}/>
                    </View>

                </Container>
            </KeyboardAwareScrollView>
        );
    }

    onSaveChangesPressed() {
        this.props.changeMode(ProfileEditPageModes.LOADING)
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
    mode: state.profileEditPage.mode
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage)