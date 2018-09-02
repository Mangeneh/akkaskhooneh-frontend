import React, {Component} from 'react';
import {Item, Icon, Left, Right} from 'native-base';
import {View, Image, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {Strings, Colors, Fonts, Constants} from '../../config';
import {BackHeader, CustomStatusBar, CustomLongTextBox} from '../../components';
import SendPostButton from '../../containers/SendPostButton';
import {sendPost} from './actions';
import FormData from "form-data";
import RNGooglePlaces from 'react-native-google-places';
import Tags from "react-native-tags";
import {strings} from "../../i18n";

class AddPostInfo extends Component {

    state = {
        tags: [],
        text: "",
    };

    onChangeTags = (tags) => {
        this.setState({tags});
    };

    onChangeText = (text) => {
        this.setState({text});

        const lastTyped = text.charAt(text.length - 1);
        const parseWhen = [' '];

        if (parseWhen.indexOf(lastTyped) > -1) {
            this.setState({
                tags: [...this.state.tags, this.state.text],
                text: "",
            });
        }
    };

    labelExtractor = (tag) => tag;

    render() {
        const {SAVE_POST_INFO, LOCATION, ADD_TAGS, SEND_POST} = Strings;
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={SAVE_POST_INFO}/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}}>
                    <View style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'center', marginTop: 0}}>
                        <CustomStatusBar/>
                        <View style={{flex: 1, backgroundColor: 'white'}}>
                            {this.renderImageWithCaption()}
                            <Item style={{backgroundColor: 'white', marginBottom: 10}}
                                  onPress={this.onLocationPress.bind(this)}>
                                <Left>
                                    <TouchableOpacity onPress={this.onLocationPress.bind(this)}>
                                        <Icon type={'EvilIcons'} name='location'
                                              style={{color: Colors.TEXT}}/>
                                    </TouchableOpacity>
                                </Left>
                                <Right>
                                    <TouchableOpacity onPress={this.onLocationPress.bind(this)}>
                                        <Text style={styles.text}>
                                            {LOCATION}
                                        </Text>
                                    </TouchableOpacity>
                                </Right>
                            </Item>
                            <Tags
                                initialText={strings('add_tag')}
                                onChangeTags={tags => console.log(tags)}
                                style={{justifyContent: "center"}}
                                tagContainerStyle={{backgroundColor: Colors.ACCENT}}
                                tagTextStyle={{
                                    color: 'white',
                                    fontFamily: Fonts.NORMAL_FONT,
                                    fontSize: Constants.TEXT_NORMAL_SIZE
                                }}
                                inputStyle={{
                                    fontSize: Constants.TEXT_NORMAL_SIZE,
                                    fontFamily: Fonts.NORMAL_FONT,
                                    backgroundColor: Colors.LIGHT_GRAY,
                                    borderRadius: 16,
                                }}
                            />

                            <View style={{alignContent: 'center', alignSelf: 'center'}}>
                                <SendPostButton style={{position: 'absolute', alignSelf: 'center'}} text={SEND_POST}
                                                onPress={() => this.SendPost()}/>
                            </View>
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
                <View style={{flex: 3}}>
                    <CustomLongTextBox placeholder={strings('post_info')}
                                       style={{
                                           borderRadius: 10,
                                           textAlign: 'right',
                                           fontSize: 10,
                                           backgroundColor: Colors.LIGHT_GRAY,
                                           height: 100,
                                           marginRight: 10,
                                           marginLeft: 10
                                       }}/>
                </View>

                <Image source={{uri: this.props.navigation.getParam('imageSource')}} resizeMode={'stretch'}
                       style={{borderRadius: 10, width: 100, height: 100, flex: 1, marginRight: 8}}/>
            </View>
        )
    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    onLocationPress() {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                console.log(place);
                // place represents user's selection from the
                // suggestions and it is a simplified Google Place object.
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
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
});

const mapDispatchToProps = (dispatch) => ({
    sendPost: (post) => dispatch(sendPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostInfo)
