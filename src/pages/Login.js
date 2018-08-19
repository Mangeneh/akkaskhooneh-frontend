import React, {Component,} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import {Container, Item, Text} from 'native-base';
import {TouchableOpacity, View} from 'react-native'
import LoginButton from '../containers/LoginButton';
import {SocialIcon} from 'react-native-elements';
import {Strings} from '../config/Strings';

export default class Login extends Component {
    render() {
        const {APP_NAME, EMAIL_ADDRESS, PASSWORD, ENTER, FORGOT_PASSWORD, SIGN_UP} = Strings;
        return (
            <Container style={{backgroundColor: '#5c5c5c', flex: 1}}>

                <View style={{alignSelf: 'center', justifyContent: 'center', flex: 4}}>
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'center'}}
                          fontFamily={'IRANSansWeb'}>{APP_NAME}</Text>

                    <Item style={{marginTop: 42, marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded>
                        <CustomTextBox type='email' placeholder={EMAIL_ADDRESS} secureTextEntry={false}
                                       style={{textAlign: 'center', fontSize: 10}}/>
                    </Item>

                    <Item style={{marginTop: 15, marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded>
                        <CustomTextBox placeholder={PASSWORD} secureTextEntry={true}
                                       style={{textAlign: 'center', fontSize: 10}}/>
                    </Item>

                    <LoginButton text={ENTER} icon={"login"}/>

                    <TouchableOpacity>
                        <Text style={{marginTop: 15, alignSelf: 'center', color: 'white', fontSize: 10}}
                              fontFamily={'IRANSansWeb'}>{FORGOT_PASSWORD}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1, marginBottom: 35}}>
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
                        style={{alignSelf: 'center', justifyContent: 'flex-end'}}>
                        <Text style={{color: 'white', fontSize: 12}} fontFamily={'IRANSansWeb'}>{SIGN_UP}</Text>
                    </TouchableOpacity>

                </View>

            </Container>
        );
    }
}