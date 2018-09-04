import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import {Icon, Item, Input, Left, Right, Body} from 'native-base';
import {Strings, Colors, Constants, Fonts} from '../config';
import {connect} from 'react-redux';
import {
    selectSelfBoards,
    selectSelfBoardsIsLoading,
    selectSelfBoardsNextPage,
    selectSelfBoardsTotalPages
} from "../reducers/BoardsReducer";
import {getSelfBoardsNextPage} from "../actions";

class AddBoardModal extends Component {

    render() {
        return (
        <View style={styles.modalContent}>
            <Text style={{fontFamily: Fonts.NORMAL_FONT, fontSize: Constants.TEXT_NORMAL_SIZE}}>{Strings.ADD_TO_INTERESTS}</Text>
 
            <Item style={{flexDirection: 'row', backgroundColor: Colors.LIGHT_GRAY}}>
                <Input style={{color: Colors.BASE, textAlign: 'right', justifyContent: 'center', fontSize: Constants.ITEM_FONT_SIZE}} onChangeText={this.props.onNameChange} placeholder={Strings.CREATE_NEW_BOARD} value={this.props.value}/>
                <TouchableOpacity>
                    <Icon name='plus' type='Entypo' style={{color: Colors.BASE, justifyContent: 'flex-end', alignSelf: 'center'}} onPress={this.props.onAddPress}/>
                </TouchableOpacity>
            </Item>
            <FlatList
                onEndReached={() => this.updateBoards()}
                style={{width: '100%'}}
                keyExtractor={(item, index) => item.id.toString()}
                data={this.props.boards}
                renderItem={({item, index}) => this.renderBoard(item, index)}
            />
            {(this.props.boardsIsLoading) ? (<ActivityIndicator size="large"/>) : <View/>}
            
        </View>
    )}

    updateBoards() {
        if (this.props.boardsNextPage <= this.props.boardsTotalPages && !this.props.boardsIsLoading) {
            this.props.getBoardsNextPage(this.props.boardsNextPage);
        }
    }

    renderBoard(item, index) {
        return (
            <Item>
                <Left />
                <Body />
                <Right>
                    <TouchableOpacity >
                        <Text />
                            <Text style={{fontSize: Constants.TEXT_NORMAL_SIZE, fontFamily: Fonts.NORMAL_FONT, marginRight: 8}}>{item.name}</Text>
                        <Text />
                    </TouchableOpacity>
                </Right>
            </Item>
        )
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


const mapStateToProps = (state) => ({
    boards: selectSelfBoards(state),
    boardsNextPage: selectSelfBoardsNextPage(state),
    boardsTotalPages: selectSelfBoardsTotalPages(state),
    boardsIsLoading: selectSelfBoardsIsLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
    getBoardsNextPage: (boardsNext) => dispatch(getSelfBoardsNextPage(boardsNext))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBoardModal);