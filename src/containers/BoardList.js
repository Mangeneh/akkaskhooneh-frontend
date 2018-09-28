import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { generatePaginatorActionCreators, generatePaginatorSelectors } from '../reducers/paginator.ts';
import { Pages, Parameters } from '../config';
import Loading from '../components/Loading';
import { createUserBoardsURL } from '../config/URLCreators';
import Board from '../components/Board';

// TODO: Add Empty Mode

class BoardList extends Component {
  componentWillMount() {
    this.refresh();
  }

  render() {
    const { boards, isRefreshing, isFirstFetch } = this.props;
    return (
      <View>
        {(isFirstFetch) ? (<Loading />) : (
          <FlatList
            onRefresh={() => this.refresh()}
            refreshing={isRefreshing}
            onEndReached={() => this.loadMore()}
            style={{
              width: '100%',
              marginTop: 8,
            }}
            keyExtractor={item => item.id.toString()}
            data={boards}
            renderItem={({ item }) => this.renderBoard(item)}
          />
        )}
      </View>
    );
  }

  renderBoard(item) {
    return (
      <Board board={item} onAllPress={() => this.onAllPress(item)} />
    );
  }

  refresh() {
    const {
      isLoading, isRefreshing, refresh,
    } = this.props;
    if (!isLoading && !isRefreshing) {
      refresh();
    }
  }

  loadMore() {
    const {
      nextPage, totalPages, loadMore, isLoading, isRefreshing,
    } = this.props;
    if (nextPage <= totalPages && !isLoading && !isRefreshing) {
      loadMore(nextPage);
    }
  }

  onAllPress(item) {
    const { navigation, isSelfProfile } = this.props;
    navigation.push(Pages.BOARDS_PAGE, {
      [Parameters.BOARD]: item,
      [Parameters.IS_SELF]: isSelfProfile,
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps;
  const paginatorSelectors = generatePaginatorSelectors(state, 'user_boards_', username);
  const {
    selectData, selectNextPage, selectTotalPages,
    selectIsFirstFetch, selectIsRefreshing, selectIsLoading,
  } = paginatorSelectors;
  return {
    boards: selectData(),
    nextPage: selectNextPage(),
    totalPages: selectTotalPages(),
    isFirstFetch: selectIsFirstFetch(),
    isRefreshing: selectIsRefreshing(),
    isLoading: selectIsLoading(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { username } = ownProps;
  const paginatorActionCreators = generatePaginatorActionCreators('user_boards_', username);
  const { refresh, loadMore } = paginatorActionCreators;
  return {
    refresh: () => dispatch(refresh(createUserBoardsURL(username))),
    loadMore: nextPage => dispatch(loadMore(createUserBoardsURL(username, nextPage))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(BoardList));
