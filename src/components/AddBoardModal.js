import {
  Icon, Input, Item, Text,
} from 'native-base';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';
import { Colors, Constants, Strings } from '../config';
import { strings } from '../i18n';
import {
  generateSelfBoardsSelectors,
  loadMoreSelfBoardsThunk,
  refreshSelfBoardsThunk,
} from '../common';
import Loading from './Loading';

// TODO: Clear Field After Adding New Board

class AddBoardModal extends Component {
  componentWillMount() {
    this.refresh();
  }

  render() {
    return (
      <View style={styles.modalContent}>
        {this.renderHeader()}
        {this.renderInput()}
        {this.renderBoardList()}
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
    const { onNameChange, newBoardName, onAddPress } = this.props;
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
            name="bookmark-plus-outline"
            type="MaterialCommunityIcons"
            style={styles.icon}
            onPress={onAddPress}
          />
        </TouchableOpacity>
      </Item>
    );
  }

  renderBoardList() {
    const { boards, isFirstFetch } = this.props;
    return (isFirstFetch ? <Loading />
      : (
        <FlatList
          onEndReached={() => this.loadMore()}
          style={styles.boardList}
          keyExtractor={item => item.id.toString()}
          data={boards}
          renderItem={({ item }) => this.renderBoard(item)}
        />
      )
    );
  }

  renderBoard(item) {
    const { onBoardNamePressed } = this.props;
    return (
      <Item>
        <TouchableOpacity onPress={() => onBoardNamePressed(item.id)}>
          <Text style={styles.boardName}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </Item>
    );
  }

  refresh() {
    const { isLoading, isRefreshing, refresh } = this.props;
    if (!isRefreshing && !isLoading) {
      refresh();
    }
  }

  loadMore() {
    const {
      nextPage, totalPages, isLoading, loadMore,
    } = this.props;
    if (nextPage <= totalPages && !isLoading) {
      loadMore(nextPage);
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

const mapStateToProps = (state) => {
  const {
    selectData, selectNextPage, selectIsLoading,
    selectTotalPages, selectIsRefreshing, selectIsFirstFetch,
  } = generateSelfBoardsSelectors(state);
  return {
    boards: selectData(),
    nextPage: selectNextPage(),
    totalPages: selectTotalPages(),
    isFirstFetch: selectIsFirstFetch(),
    isRefreshing: selectIsRefreshing(),
    isLoading: selectIsLoading(),
  };
};

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(refreshSelfBoardsThunk),
  loadMore: nextPage => dispatch(loadMoreSelfBoardsThunk(nextPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBoardModal);
