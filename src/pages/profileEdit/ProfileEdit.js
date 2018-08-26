import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';
import {Container, Item, Input} from 'native-base';
import {View, TouchableOpacity, StyleSheet, StatusBar} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {Strings, Colors, Constants, Fonts, PageModes} from '../../config';
import {CustomLongTextBox, BackHeader} from '../../components';
import SaveChangesButton from '../../containers/SaveChangesButton';
import {modeChanged, imageChanged} from './actions';
import ImagePicker from 'react-native-image-crop-picker';

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
                        <View style={{justifyContent: 'flex-start', marginTop: 32, flex: 1}}>
                            <TouchableOpacity
                                style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 32, marginTop: 0}} onPress={this.onChooseImagePress.bind(this)}>
                                <Avatar rounded xlarge containerStyle={{alignSelf: 'center'}} icon = {{name: 'camera', type:'Feather'}} source={{uri: this.props.image === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9n0_3cEO-YFRPdAicSd0HlrwafnECzagpAXiRBFYgUZ6vaYkatQ' : this.props.image}}/>
                            </TouchableOpacity>

                            <Item style={styles.item} rounded>
                                <Input disabled placeholder={'username got from db!!'}
                                       fontFamily={Fonts.NORMAL_FONT}
                                       style={{textAlign: 'center', fontSize: 10}}/>
                            </Item>

                            <Item style={styles.item} rounded>
                                <Input placeholder={'name got from db!!'}
                                       fontFamily={Fonts.NORMAL_FONT}
                                       style={{textAlign: 'center', fontSize: 10}}/>
                            </Item>

                            <Item style={styles.item} rounded>
                                <Input disabled placeholder={'email got from db!!'}
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
        this.props.changeMode(PageModes.LOADING);
    }

    onChooseImagePress() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            this.props.changeImage(image.sourceURL);
        });
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
    lastTokenUpdateTime: state.userInfo.lastTokenUpdateTime,
    image: state.profileEditPage.image,
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
    changeImage: (image) => dispatch(imageChanged(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)