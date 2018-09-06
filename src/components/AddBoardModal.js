import {
  Icon, Input, Item, Text,
} from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';
import { getSelfBoardsNextPage } from '../actions';
import {
  Colors, Constants, Fonts, Strings,
} from '../config';
import { strings } from '../i18n';
import {
  selectSelfBoards,
  selectSelfBoardsIsLoading,
  selectSelfBoardsNextPage,
  selectSelfBoardsTotalPages,
} from '../reducers/BoardsReducer';

class AddBoardModal extends Component {
  render() {
    return (
      <View style={styles.modalContent}>
        <Text style={{
          fontSize: Constants.TEXT_NORMAL_SIZE,
        }}
        >
          {strings(Strings.ADD_TO_INTERESTS)}
        </Text>
        <Text
          note
          style={{ fontSize: Constants.ITEM_FONT_SIZE }}
        >
          {strings(Strings.CHOOSE_A_BOARD)}
        </Text>

        <Item style={{
          flexDirection: 'row',
          backgroundColor: Colors.LIGHT_GRAY,
        }}
        >
          <Input
            style={{
              color: Colors.BASE,
              textAlign: 'right',
              justifyContent: 'center',
              fontSize: Constants.ITEM_FONT_SIZE,
            }}
            onChangeText={this.props.onNameChange}
            placeholder={strings(Strings.CREATE_NEW_BOARD)}
            value={this.props.value}
          />
          <TouchableOpacity>
            <Icon
              name="plus"
              type="Entypo"
              style={{
                color: Colors.BASE,
                justifyContent: 'flex-end',
                alignSelf: 'center',
              }}
              onPress={this.props.onAddPress}
            />
          </TouchableOpacity>
        </Item>
        <FlatList
          onEndReached={() => this.updateBoards()}
          style={{ width: '100%' }}
          keyExtractor={(item, index) => item.id.toString()}
          data={this.props.boards}
          renderItem={({ item, index }) => this.renderBoard(item, index)}
        />
        {(this.props.boardsIsLoading) ? (<ActivityIndicator size="large" />) : <View />}
      </View>
    );
  }

  updateBoards() {
    if (this.props.boardsNextPage <= this.props.boardsTotalPages && !this.props.boardsIsLoading) {
      this.props.getBoardsNextPage(this.props.boardsNextPage);
    }
  }

  renderBoard(item, index) {
    return (
      <Item>
        <TouchableOpacity onPress={() => {
          this.props.onBoardNamePressed(item.id);
        }}
        >
          <Text style={{
            fontSize: Constants.TEXT_NORMAL_SIZE,
            fontFamily: Fonts.NORMAL_FONT,
            marginRight: 8,
            marginTop: 4,
            marginBottom: 4,
          }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </Item>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});


const mapStateToProps = state => ({
  boards: selectSelfBoards(state),
  boardsNextPage: selectSelfBoardsNextPage(state),
  boardsTotalPages: selectSelfBoardsTotalPages(state),
  boardsIsLoading: selectSelfBoardsIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  getBoardsNextPage: boardsNext => dispatch(getSelfBoardsNextPage(boardsNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBoardModal);
