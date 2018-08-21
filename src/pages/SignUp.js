import React, {Component,} from 'react';
import CustomTextBox from '../components/CustomTextBox';
import {Container, Item, Text, Icon} from 'native-base';
import {TouchableOpacity, View, StyleSheet, StatusBar} from 'react-native'
import LoginButton from '../containers/LoginButton';
import {SocialIcon} from 'react-native-elements';
import {Strings} from '../config/Strings';
import RoundAvatar from "../components/RoundAvatar";
import {Colors} from "../config/Colors";

export default class SignUp extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {APP_NAME, EMAIL_ADDRESS, PASSWORD, REPEAT_PASSWORD, SIGN_UP, ENTER_LOGIN_PAGE} = Strings;
        return (
            <Container style={{backgroundColor: Colors.BASE, flex: 1}}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.BASE}
                />
                <View style={styles.partition}>
                    <RoundAvatar large={true} style={{alignSelf: 'center', marginBottom: 15}} uri={'https://image.freepik.com/vector-gratis/logo-con-diseno-de-camara_1465-19.jpg'}/>
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'center'}}
                          fontFamily={'IRANSansWeb'}>{APP_NAME}</Text>
                </View>

                <View style={styles.partition}>

                    <Item style={{marginLeft: 30, marginRight: 30, backgroundColor: 'white', borderRadius: 10}} rounded>
                        <Icon style={{color: Colors.ICON}} name='mail'/>
                        <CustomTextBox type='email' placeholder={EMAIL_ADDRESS} secureTextEntry={false}
                                       style={{textAlign: 'center', fontSize: 12}}/>
                    </Item>

                    <Item style={{
                        marginTop: 15,
                        marginLeft: 30,
                        marginRight: 30,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }} rounded>
                        <Icon style={{color: Colors.ICON}} name='key'/>
                        <CustomTextBox placeholder={PASSWORD} secureTextEntry={true}
                                       style={{textAlign: 'center', fontSize: 12}}/>
                    </Item>

                    <Item style={{
                        marginTop: 15,
                        marginLeft: 30,
                        marginRight: 30,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }} rounded>
                        <Icon style={{color: Colors.ICON}} name='key'/>
                        <CustomTextBox placeholder={REPEAT_PASSWORD} secureTextEntry={true}
                                       style={{textAlign: 'center', fontSize: 12}}/>
                    </Item>

                    <LoginButton icon={'login'} text={SIGN_UP}/>
                </View>

                <View style={styles.partition}>
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
                        style={{alignSelf: 'center'}}
                        onPress={() => this.onReturnToLoginPress()}>
                        <Text style={{color: 'white', fontSize: 12}}
                              fontFamily={'IRANSansWeb'}>{ENTER_LOGIN_PAGE}</Text>
                    </TouchableOpacity>

                </View>

            </Container>
        );
    }

    onReturnToLoginPress() {
        this.props.navigation.navigate('Login');
    }
}

const styles = StyleSheet.create({
    partition: {alignSelf: 'center', flex: 1, justifyContent: 'center'}
});