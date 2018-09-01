import React, {Component} from 'react';
import {Item, Toast, Icon, Input, Left, Right} from 'native-base';
import {View, Dimensions, Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {Strings, Colors} from '../../config';
import {BackHeader, CustomStatusBar, CustomLongTextBox} from '../../components';
import TagInput from 'react-native-tag-input';
import SendPostButton from '../../containers/SendPostButton';
import {Actions,sendPost} from './actions';
import FormData from "form-data";


const WIDTH = Dimensions.get('window').width;

class AddPostInfo extends Component {
    render() {
        const {SAVE_POST_INFO, LOCATION, ADD_TAGS, SEND_POST} = Strings;
        return (
            <View style={{flex: 1, backgroundColor: Colors.BASE}}>
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={SAVE_POST_INFO}/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                    <View style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'center', marginTop: 0}}>
                        <CustomStatusBar/>
                        <View style={{flex: 1, backgroundColor: 'white'}}>
                            {this.renderImageWithCaption()}
                            <Item style={{backgroundColor: 'white', marginBottom: 10}}>
                                <Left>
                                    <TouchableOpacity>
                                        <Icon type={'EvilIcons'} name='location'
                                                style={{color: Colors.TEXT}}/>
                                    </TouchableOpacity>
                                </Left>
                                <Right>
                                    <TouchableOpacity>
                                        <Text style={styles.text}>
                                            {LOCATION}
                                        </Text>
                                    </TouchableOpacity>
                                </Right>
                            </Item>

                            <Item style={{backgroundColor: 'white'}}>
                                <Right>
                                    <TouchableOpacity>
                                        <Text style={styles.text}>
                                            {ADD_TAGS}
                                        </Text>
                                    </TouchableOpacity>
                                </Right>
                            </Item>

                            {/* <TagInput
                                placeholder={ADD_TAGS}
                                value={this.state.currentTag}
                                labelExtractor={(tag) => tag}
                                onChangeTag={(tag) => changeTag(tag)}
                            /> */}

                        </View>

                        <View style={{position: 'absolute', bottom: 40, alignContent: 'center', alignSelf: 'center'}}>
                            <SendPostButton style={{position: 'absolute', alignSelf: 'center'}} text={SEND_POST} onPress={()=>this.SendPost()}/>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    renderImageWithCaption() {
        const {POST_INFO} = Strings;
        return (
            <View style={styles.photo}>
                <View style = {{flex: 3}}>
                    <CustomLongTextBox placeholder={POST_INFO}
                        style={{borderRadius: 10, textAlign: 'right', fontSize: 10,  backgroundColor: Colors.LIGHT_GRAY, height: 100, marginRight: 10, marginLeft: 10}} />
                </View>

                <Image source={{uri: this.props.navigation.getParam('imageSource')}} resizeMode={'stretch'}
                   style={{borderRadius: 10, width: 100, height: 100, flex: 1, marginRight: 8 }}/>
            </View>
        )
    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    SendPost() {
        const formData = new FormData();
        formData.append('picture', {
            uri: this.props.navigation.getParam('imageSource'), // your file path string
            name: 'my_photo.jpg',
            type: 'image/jpeg'
        });
        this.props.sendPost(formData);
    }
}

const styles = StyleSheet.create({
    photo: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 10,
        overflow: 'hidden',
    }
});

const mapStateToProps = (state) => ({
    mode: state.addPostInfoPage.mode,
    tags: state.addPostInfoPage.tags,
    currentTag: state.addPostInfoPage.currentTag,
});

const mapDispatchToProps = (dispatch) => ({
    sendPost: (post) => dispatch(sendPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostInfo)
