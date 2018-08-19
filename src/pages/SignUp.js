import React, {Component,} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import {Container, Item, Text} from 'native-base';
import {TouchableOpacity, View} from 'react-native'
import LoginButton from '../containers/LoginButton';
import {SocialIcon} from 'react-native-elements';
import {Strings} from '../config/Strings';
import RoundAvatar from "../components/RoundAvatar";

export default class SignUp extends Component {
    render() {
        const {APP_NAME, EMAIL_ADDRESS, PASSWORD, REPEAT_PASSWORD, SIGN_UP, ENTER_LOGIN_PAGE} = Strings;
        return (
            <Container style={{backgroundColor: '#5c5c5c', flex: 1}}>

                <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                    <RoundAvatar style={{alignSelf: 'center', marginBottom: 15}}/>
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

                    <Item style={{marginTop: 15, marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded>
                        <CustomTextBox placeholder={REPEAT_PASSWORD} secureTextEntry={true}
                                       style={{textAlign: 'center', fontSize: 10}}/>
                    </Item>

                    <LoginButton icon={'login'} text={SIGN_UP}/>
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'flex-end',
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
                        <Text style={{color: 'white', fontSize: 12}}
                              fontFamily={'IRANSansWeb'}>{ENTER_LOGIN_PAGE}</Text>
                    </TouchableOpacity>

                </View>

            </Container>
        );
    }
}