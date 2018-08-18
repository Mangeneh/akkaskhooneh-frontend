import React, {Component,} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import {Container, Item, Text} from 'native-base';
import {TouchableHighlight, View} from 'react-native'
import LoginButton from '../containers/LoginButton';
import { SocialIcon } from 'react-native-elements'

export default class Login extends Component {
    render() {
        return (
            <Container style={{backgroundColor: '#5c5c5c'}}>
                <Text style={{fontSize: 12, color: 'white', textAlign: 'center', marginTop: 163}}
                      fontFamily={'IRANSansWeb'}>عکاسخونه</Text>

                <Item style={{marginTop: 38, marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded>
                    <CustomTextBox type='email' placeholder={'آدرس ایمیل'} secureTextEntry={false}
                                   style={{textAlign: 'center', fontSize: 10}}/>
                </Item>

                <Item style={{marginTop: 15, marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded>
                    <CustomTextBox placeholder={'رمز عبور'} secureTextEntry={true}
                                   style={{textAlign: 'center', fontSize: 10}}/>
                </Item>

                <LoginButton text={"ورود"} icon={"login"}/>

                <TouchableHighlight>
                    <Text style={{marginTop: 10, alignSelf: 'center', color: 'white', fontSize: 10}}
                          fontFamily={'IRANSansWeb'}>{'آیا رمز عبود خود را فراموش کرده‌اید؟'}</Text>
                </TouchableHighlight>

                <View style = {{flex:1, flexDirection: 'row', marginTop: 92, alignSelf: 'center'}}>
                    <SocialIcon 
                        light
                        type='facebook'
                    />
                    <SocialIcon 
                        light
                        type='google'
                    />
                    <SocialIcon
                        light
                        type='twitter'
                    />
                </View>

                <TouchableHighlight>
                    <Text style={{marginBottom: 45, alignSelf: 'center', color: 'white', fontSize: 12}}
                          fontFamily={'IRANSansWeb'}>{'ثبت‌نام'}</Text>
                </TouchableHighlight>

            </Container>

        );
    }
}