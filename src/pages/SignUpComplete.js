import React, {Component,} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import CustomLongTextBox from '../components/CustomLongTextBox';
import {Container, Item} from 'native-base';
import {View, TouchableOpacity} from 'react-native'
import {Strings} from '../config/Strings';
import RoundAvatar from "../components/RoundAvatar";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from "../config/Colors";
import Constants from "../config/Constants";
import SaveChangesButton from '../containers/SaveChangesButton';
import {connect} from 'react-redux';
import {SaveModes} from "../config/SaveModes";
import { modeChanged } from '../actions/SignUpCompletePageActions';

class SignUpComplete extends Component {
    render() {
        const {USER_NAME, FIRST_LAST_NAME, ABOUT_YOU, COMPLETE_INFO} = Strings;
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS, TEXT_BOX_ELEVATION} = Constants;
        return (
            <KeyboardAwareScrollView>
                <Container style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'center'}}>

                    <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', flex: 3}}>
                        <RoundAvatar xlarge={true} style={{alignSelf: 'center'}}/>
                    </TouchableOpacity>

                    <View style={{justifyContent: 'center', flex: 4}}>

                        <Item style={{marginLeft: 30, marginRight: 30, marginBottom: 15, backgroundColor: 'white', borderRadius: TEXT_BOX_RADIUS, elevation: TEXT_BOX_ELEVATION}}
                              rounded>
                            <CustomTextBox placeholder={USER_NAME} secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={{marginLeft: 30, marginRight: 30, marginBottom: 15, backgroundColor: 'white', borderRadius: TEXT_BOX_RADIUS, elevation: TEXT_BOX_ELEVATION}}
                              rounded>
                            <CustomTextBox placeholder={FIRST_LAST_NAME} secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={{marginLeft: 30, marginRight: 30, marginBottom: 15, backgroundColor: 'white', borderRadius: TEXT_BOX_RADIUS, elevation: TEXT_BOX_ELEVATION}}
                              rounded>
                            <CustomTextBox disabled={true} placeholder={'email got from last page!!!'}
                                           secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={{marginLeft: 30, marginRight: 30, marginBottom: 15, backgroundColor: 'white', borderRadius: TEXT_BOX_RADIUS, elevation: TEXT_BOX_ELEVATION}}
                              rounded>
                            <CustomLongTextBox placeholder={ABOUT_YOU}
                                               style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                    </View>

                    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 2}}>
                        <SaveChangesButton text={COMPLETE_INFO} icon="check" onPress={this.onSaveChangesPressed.bind(this)}/>
                    </View>

                </Container>
            </KeyboardAwareScrollView>
        );
    }
    onSaveChangesPressed() {
        this.props.changeMode(SaveModes.LOADING)
    }
}

const mapStateToProps = (state) => ({
    mode: state.signUpCompletePage.mode
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComplete)
