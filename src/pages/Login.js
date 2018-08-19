import React, {Component,} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import {Container, Item, Text} from 'native-base';
import {TouchableOpacity, View} from 'react-native'
import LoginButton from '../containers/LoginButton';
import {SocialIcon} from 'react-native-elements';
import {Strings} from '../config/Strings';
import RoundAvatar from "../components/RoundAvatar";
import {Colors} from "../config/Colors";

export default class Login extends Component {
    render() {
        const {APP_NAME, EMAIL_ADDRESS, PASSWORD, ENTER, FORGOT_PASSWORD, SIGN_UP} = Strings;
        return (
            <Container style={{backgroundColor: Colors.GRAY_COLOR, flex: 1}}>

                <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                    <RoundAvatar style={{marginBottom: 10}}
                                 uri={'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Chrome-icon.png'}/>
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'center'}}
                          fontFamily={'IRANSansWeb'}>{APP_NAME}</Text>
                </View>

                <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                    <Item style={{marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded>
                        <CustomTextBox type='email' placeholder={EMAIL_ADDRESS} secureTextEntry={false}
                                       style={{textAlign: 'center', fontSize: 10}}/>
                    </Item>

                    <Item style={{marginTop: 15, marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded>
                        <CustomTextBox placeholder={PASSWORD} secureTextEntry={true}
                                       style={{textAlign: 'center', fontSize: 10}}/>
                    </Item>

                    <LoginButton text={ENTER} icon={"login"}/>

                    <TouchableOpacity>
                        <Text style={{marginTop: 20, alignSelf: 'center', color: 'white', fontSize: 10}}
                              fontFamily={'IRANSansWeb'}>{FORGOT_PASSWORD}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1, justifyContent: 'center',}}>
                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginBottom: 15
                    }}>
                        <TouchableOpacity>
                            <SocialIcon
                                light
                                type='facebook'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <SocialIcon
                                light
                                type='google'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <SocialIcon
                                light
                                type='twitter'
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{alignSelf: 'center'}}>
                        <Text style={{color: 'white', fontSize: 12}} fontFamily={'IRANSansWeb'}>{SIGN_UP}</Text>
                    </TouchableOpacity>
                </View>

            </Container>
        );
    }
}