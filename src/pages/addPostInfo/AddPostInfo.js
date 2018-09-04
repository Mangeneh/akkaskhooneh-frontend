import React, {Component} from 'react';
import {Item, Icon, Left, Right} from 'native-base';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import FormData from "form-data";
import RNGooglePlaces from 'react-native-google-places';
import {Strings, Colors, Fonts, Constants, Pages} from '../../config';
import {BackHeader, CustomStatusBar, CustomLongTextBox} from '../../components';
import SendPostButton from '../../containers/SendPostButton';
import {sendPost} from './actions';
import {strings} from "../../i18n";
import {Tags} from "../../components";

class AddPostInfo extends Component {

    state = {
        tags: [],
        description: '',
    };

    onChangeTags = (tags) => {
        this.setState({tags});
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <BackHeader onBackPress={this.onBackPress.bind(this)} title={strings(Strings.SEND_POST)}/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
                                         contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
                    <View style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'center', marginTop: 0}}>
                        <CustomStatusBar/>
                        <View style={{flex: 5, backgroundColor: 'white'}}>
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
                                            {strings(Strings.LOCATION)}
                                        </Text>
                                    </TouchableOpacity>
                                </Right>
                            </Item>
                            <Tags
                                initialText={strings(Strings.ADD_TAG)}
                                initialTags={this.state.tags}
                                onChangeTags={tags => this.onChangeTags(tags)}
                                style={{justifyContent: "center"}}
                                tagContainerStyle={{backgroundColor: Colors.ACCENT}}
                                tagTextStyle={{
                                    color: 'white',
                                    fontSize: Constants.TEXT_NORMAL_SIZE
                                }}
                                inputStyle={{
                                    fontSize: Constants.TEXT_NORMAL_SIZE,
                                    backgroundColor: Colors.LIGHT_GRAY,
                                    borderRadius: 16,
                                }}
                            />
                            <View style={{flex: 1, alignContent: 'center', alignSelf: 'center'}}>
                                <SendPostButton style={{position: 'absolute', alignSelf: 'center'}}
                                                text={strings(Strings.SEND_POST)}
                                                onPress={() => this.SendPost()}/>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    renderImageWithCaption() {
        return (
            <View style={styles.photo}>
                <View style={{flex: 3}}>
                    <CustomLongTextBox placeholder={strings(Strings.DESCRIPTION)}
                                       value={this.state.description}
                                       onChangeText={(description) => {
                                           this.setState({description});
                                       }}
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
        // formData.append('caption', this.state.description);
        // console.log(this.state.tags.join(','));
        // formData.append('tags', this.state.tags);
        this.props.sendPost(formData)
            .then((response) => {
                    this.props.navigation.navigate(Pages.MAIN);
                }
            );
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