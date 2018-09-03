import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Item, Right, Left, Body, Input} from 'native-base';
import Post from '../../components/Post';
import {BackHeader} from '../../components';
import Modal from "react-native-modal";
import {Strings, Colors, Constants, Fonts} from '../../config';

export default class Home extends Component {

    state = {
        visibleModal: false,
    };

    renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={{fontFamily: Fonts.NORMAL_FONT, fontSize: Constants.TEXT_NORMAL_SIZE}}>{Strings.ADD_TO_INTERESTS}</Text>
 
            <Item style={{flexDirection: 'row'}}>
                <Input style={{color: Colors.BASE, textAlign: 'right', justifyContent: 'center', fontSize: Constants.ITEM_FONT_SIZE}} placeholder={Strings.CREATE_NEW_BOARD}/>
                <TouchableOpacity>
                    <Icon name='plus' type='Entypo' style={{color: Colors.BASE, justifyContent: 'flex-end', alignSelf: 'center'}}/>
                </TouchableOpacity>
            </Item>
        </View>
    );

    render() {
        return (
            <View style={{flex: 1}}> 
                <BackHeader onBackPress={() => this.props.navigation.navigate('Main')}/>
                <ScrollView>
                    <Post imageSource='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC2VCb3j_W6M6uXfn6JW6H1YzZoF2fP1-w2jRcTuARfz451HUM' saveButtonPressed={this.showModal.bind(this)}></Post>
                </ScrollView>

                <Modal
                    isVisible={this.state.visibleModal === true}
                    onBackdropPress={() => this.setState({ visibleModal: null })}
                    >
                    {this.renderModalContent()}
                </Modal>  
            </View>
        );
    }

    showModal() {
        this.setState({ visibleModal: true })
    }
}

const styles = StyleSheet.create({

  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },

});
