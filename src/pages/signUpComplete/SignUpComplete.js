import React, {Component,} from 'react';
import {Container, Item} from 'native-base';
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomTextBox from '../../components/CustomTextBox';
import CustomLongTextBox from '../../components/CustomLongTextBox';
import {Strings} from '../../config/Strings';
import {Colors} from '../../config/Colors';
import Constants from '../../config/Constants';
import {PageModes} from '../../config/PageModes';
import SaveChangesButton from '../../containers/SaveChangesButton';
import {modeChanged} from './actions';

class SignUpComplete extends Component {
    render() {
        const {USER_NAME, FIRST_LAST_NAME, ABOUT_YOU, COMPLETE_INFO} = Strings;
        return (
            <KeyboardAwareScrollView>
                <Container style={{backgroundColor: Colors.BASE, flex: 1, justifyContent: 'center'}}>

                    <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', flex: 3}}>
                        <Avatar xlarge rounded style={{alignSelf: 'center'}}/>
                    </TouchableOpacity>

                    <View style={{justifyContent: 'center', flex: 4}}>

                        <Item style={styles.item} rounded>
                            <CustomTextBox placeholder={USER_NAME} secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={styles.item} rounded>
                            <CustomTextBox placeholder={FIRST_LAST_NAME} secureTextEntry={false}
                                           style={{textAlign: 'center', fontSize: 10}}/>
                        </Item>

                        <Item style={styles.item} rounded>
                            <CustomTextBox disabled={true} placeholder={'email got from last page!!!'}
                                           secureTextEntry={false}
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