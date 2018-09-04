import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Item, Input} from 'native-base';
import {Strings, Colors, Constants, Fonts} from '../config';

export default class AddBoardModal extends Component {

    render() {
        return (
        <View style={styles.modalContent}>
            <Text style={{fontFamily: Fonts.NORMAL_FONT, fontSize: Constants.TEXT_NORMAL_SIZE}}>{Strings.ADD_TO_INTERESTS}</Text>
 
            <Item style={{flexDirection: 'row'}}>
                <Input style={{color: Colors.BASE, textAlign: 'right', justifyContent: 'center', fontSize: Constants.ITEM_FONT_SIZE}} onChangeText={this.props.onNameChange} placeholder={Strings.CREATE_NEW_BOARD} value={this.props.value}/>
                <TouchableOpacity>
                    <Icon name='plus' type='Entypo' style={{color: Colors.BASE, justifyContent: 'flex-end', alignSelf: 'center'}} onPress={this.props.onAddPress}/>
                </TouchableOpacity>
            </Item>

                                    <FlatList
                                        onEndReached={this.props.onEnd}
                                        style={{width: '100%', marginTop: 8}}
                                        numColumns={2}
                                        keyExtractor={(item, index) => item.id}
                                        data={this.props.photos}
                                        renderItem={({item, index}) => this.renderPhoto(item, index)}
                                    />
        </View>
    )}
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
