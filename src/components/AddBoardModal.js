import {
  Icon, Input, Item, Text,
} from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';
import { getUserBoardsNextPage } from '../actions';
import { Colors, Constants, Strings } from '../config';
import { strings } from '../i18n';
import {
  selectUserBoards, selectUserBoardsIsLoading,
  selectUserBoardsNextPage,
  selectUserBoardsTotalPages
} from '../reducers/BoardsReducer';

class AddBoardModal extends Component {
  render() {
    return (
      <View style={styles.modalContent}>
        {this.renderHeader()}
        {this.renderInput()}
        {this.renderBoardList()}
        {this.renderSpinner()}
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.headerContent}>
        <Text style={styles.headerText}>
          {strings(Strings.ADD_TO_INTERESTS)}
        </Text>
        <Text
          note
          style={styles.headerInstruction}
        >
          {strings(Strings.CHOOSE_A_BOARD)}
        </Text>
      </View>
    );
  }

  renderInput() {
    const {
      onNameChange, newBoardName, onAddPress,
    } = this.props;
    return (
      <Item style={styles.inputItem}>
        <Input
          style={styles.input}
          onChangeText={onNameChange}
          placeholder={strings(Strings.CREATE_NEW_BOARD)}
          value={newBoardName}
        />
        <TouchableOpacity>
          <Icon
            name="plus"
            type="Entypo"
            style={styles.icon}
            onPress={onAddPress}
          />
        </TouchableOpacity>
      </Item>
    );
  }

  renderBoardList() {
    const { boards } = this.props;
    return (
      <FlatList
        onEndReached={() => this.updateBoards()}
        style={styles.boardList}
        keyExtractor={item => item.id.toString()}
        data={boards}
        renderItem={({ item }) => this.renderBoard(item)}
      />
    );
  }

  renderBoard(item) {
    const { onBoardNamePressed } = this.props;
    return (
      <Item>
        <TouchableOpacity onPress={() => {
          onBoardNamePressed(item.id);
        }}
        >
          <Text style={styles.boardName}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </Item>
    );
  }

  renderSpinner() {
    const { boardsIsLoading } = this.props;
    return (
      (boardsIsLoading) ? (<ActivityIndicator size="large" />) : <View />
    );
  }

  updateBoards() {
    const {
      boardsNextPage, boardsTotalPages, boardsIsLoading, getBoardsNextPage,
    } = this.props;
    if (boardsNextPage <= boardsTotalPages && !boardsIsLoading) {
      getBoardsNextPage(boardsNextPage);
    }
  }
}

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  headerContent: { alignItems: 'center' },
  headerText: { fontSize: Constants.TEXT_NORMAL_SIZE },
  headerInstruction: { fontSize: Constants.ITEM_FONT_SIZE },
  inputItem: {
    flexDirection: 'row',
    backgroundColor: Colors.LIGHT_GRAY,
  },
  input: {
    justifyContent: 'center',
    fontSize: Constants.ITEM_FONT_SIZE,
  },
  icon: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  boardList: {
    width: '100%',
  },
  boardName: {
    fontSize: Constants.TEXT_NORMAL_SIZE,
    marginLeft: 4,
    marginTop: 4,
    marginBottom: 4,
  },
});

const mapStateToProps = state => ({
  boards: selectUserBoards(state),
  boardsNextPage: selectUserBoardsNextPage(state),
  boardsTotalPages: selectUserBoardsTotalPages(state),
  boardsIsLoading: selectUserBoardsIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  getBoardsNextPage: boardsNext => dispatch(getUserBoardsNextPage(boardsNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBoardModal);
