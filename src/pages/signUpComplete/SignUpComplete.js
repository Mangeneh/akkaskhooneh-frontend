import React, {Component,} from 'react';
import {Container, Item, Input} from 'native-base';
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomLongTextBox} from '../../components';
import {Strings, Colors, Constants, PageModes, Fonts} from '../../config';
import SaveChangesButton from '../../containers/SaveChangesButton';
import {modeChanged} from './actions';

class SignUpComplete extends Component {
    render() {
        const {USER_NAME, FIRST_LAST_NAME, ABOUT_YOU, COMPLETE_INFO} = Strings;
        return (
            <KeyboardAwareScrollView>
                <Container style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'center'}}>

                    <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', flex: 3}}>
                        <Avatar xlarge rounded style={{alignSelf: 'center'}} />
                    </TouchableOpacity>

                    <View style={{justifyContent: 'center', flex: 4}}>

                        <Item style={styles.item} rounded>
                            <Input placeholder={USER_NAME}
                                   fontFamily={Fonts.NORMAL_FONT}
                                   style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={styles.item} rounded>
                            <Input placeholder={FIRST_LAST_NAME}
                                   fontFamily={Fonts.NORMAL_FONT}
                                   style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={styles.item} rounded>
                            <Input disabled placeholder={'email got from last page!!!'}
                                   fontFamily={Fonts.NORMAL_FONT}
                                   style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={styles.item} rounded>
                            <CustomLongTextBox placeholder={ABOUT_YOU}
                                               style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                    </View>

                    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 2}}>
                        <SaveChangesButton text={COMPLETE_INFO} icon='check'
                                           onPress={this.onSaveChangesPressed.bind(this)}/>
                    </View>

                </Container>
            </KeyboardAwareScrollView>
        );
    }

    onSaveChangesPressed() {
        this.props.changeMode(PageModes.LOADING)
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
    },
});

const mapStateToProps = (state) => ({
    mode: state.signUpCompletePage.mode
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(modeChanged(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComplete);