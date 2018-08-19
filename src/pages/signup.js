import React, {Component,} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import {Container, Item, Text} from 'native-base';
import {TouchableOpacity, View} from 'react-native'
import LoginButton from '../containers/LoginButton';
import {SocialIcon} from 'react-native-elements';
import {Strings} from '../config/Strings';

export default class Signup extends Component {
    render() {
        const {APP_NAME,EMAIL_ADDRESS,PASSWORD, REPEAT_PASSWORD, SIGNUP, ENTER_LOGIN_PAGE} = Strings;
        return (
            <Container style={{backgroundColor: '#5c5c5c', flex: 1}}>
                <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'center'}}
                          fontFamily={'IRANSansWeb'}>{APP_NAME}</Text>

                    <Item style={{marginTop: 38, marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded>
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

                    <LoginButton text={SIGNUP} />
                </View>

                <View style={{flex: 1 / 4}}>
                    <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
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
                    <TouchableOpacity>
                        <Text style={{alignSelf: 'center', color: 'white', fontSize: 12, marginTop: 15, justifyContent: 'flex-end'}}
                              fontFamily={'IRANSansWeb'}>{ENTER_LOGIN_PAGE}</Text>
                    </TouchableOpacity>
                </View>

            </Container>
        );
    }
}