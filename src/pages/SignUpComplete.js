import React, {Component,} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import CustomLongTextBox from '../components/CustomLongTextBox';
import {Container, Item} from 'native-base';
import {View, TouchableOpacity} from 'react-native'
import LoginButton from '../containers/LoginButton';
import {Strings} from '../config/Strings';
import RoundAvatar from "../components/RoundAvatar";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class SignUpComplete extends Component {
    render() {
        const {USER_NAME, FIRST_LAST_NAME, ABOUT_YOU, COMPLETE_INFO} = Strings;
        return (
            <KeyboardAwareScrollView>
                <Container style={{backgroundColor: Colors.BASE, flex: 1}}>

                    <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', flex: 3}}>
                        <RoundAvatar style={{alignSelf: 'center', marginBottom: 15}}/>
                    </TouchableOpacity>

                    <View style={{justifyContent: 'center', flex: 4}}>

                        <Item style={{marginLeft: 30, marginRight: 30, marginBottom: 15, backgroundColor: 'white'}}
                              rounded>
                            <CustomTextBox placeholder={USER_NAME} secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={{marginLeft: 30, marginRight: 30, marginBottom: 15, backgroundColor: 'white'}}
                              rounded>
                            <CustomTextBox placeholder={FIRST_LAST_NAME} secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={{marginLeft: 30, marginRight: 30, marginBottom: 15, backgroundColor: 'white'}}
                              rounded>
                            <CustomTextBox disabled={true} placeholder={'email got from last page!!!'}
                                           secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={{marginLeft: 30, marginRight: 30, marginBottom: 15, backgroundColor: 'white'}}
                              rounded>
                            <CustomLongTextBox placeholder={ABOUT_YOU}
                                               style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                    </View>

                    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 3}}>
                        <LoginButton text={COMPLETE_INFO} icon="check"/>
                    </View>

                </Container>
            </KeyboardAwareScrollView>
        );
    }
}