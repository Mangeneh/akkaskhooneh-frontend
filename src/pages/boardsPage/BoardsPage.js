import { Body, Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { deleteBoard, refreshBoardsPhotos, refreshUserBoards } from '../../actions';
import { getBoardsPhotosNextPage } from '../../actions/PostsActions';
import { BoardsPageHeader, CustomStatusBar } from '../../components';
import PostsPhotoList from '../../components/PostsPhotoList';
import { Colors, Pages, Strings } from '../../config';
import { showFailiureToast, showSuccessToast } from '../../helpers';
import { strings } from '../../i18n';
import NavigationService from '../../NavigationService';
import {
  selectBoardsPhotos,
  selectBoardsPhotosIsFirstFetch,
  selectBoardsPhotosIsLoading,
  selectBoardsPhotosIsRefreshing,
  selectBoardsPhotosNextPage,
  selectBoardsPhotosTotalPages,
} from '../../reducers/PostsReducer';

class BoardsPage extends Component {
  componentWillMount() {
    this.refreshPhotos();
  }

  render() {
    const {
      navigation, boardsPhotos, boardsPhotosIsFirstFetch, boardsPhotosIsRefreshing,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <BoardsPageHeader
          boardName={navigation.getParam('board').name}
          onBackPress={() => navigation.goBack()}
          onDeletePress={() => this.confirmDeleteBoard()}
          onAddPress={() => this.addSelfPostsToBoard()}
        />
        <Modal
          style={{
            width: 300,
            height: 100,
            borderRadius: 5,
            justifyContent: 'center',
          }}
          position="center"
          ref="modal"
          backButtonClose
        >
          <Text style={styles.modalHeader}>
            {strings(Strings.DELETE_BOARD_INQUIRY)}
          </Text>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            borderColor: Colors.ICON,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderWidth: 0.5,
          }}
          >
            <Button
              transparent
              style={styles.modalButton}
              onPress={() => this.refs.modal.close()}
            >
              <Body>
                <Text style={styles.modalButtonText}>{strings(Strings.NO)}</Text>
              </Body>
            </Button>
            <View style={{
              width: 0.5,
              backgroundColor: Colors.ICON,
            }}
            />
            <Button transparent style={styles.modalButton} onPress={() => this.deleteBoard()}>
              <Body>
                <Text style={styles.modalButtonText}>{strings(Strings.YES)}</Text>
              </Body>
            </Button>
          </View>
        </Modal>
        <PostsPhotoList
          data={boardsPhotos}
          onRefresh={() => this.refreshPhotos()}
          refreshing={boardsPhotosIsRefreshing}
          isFirstFetch={boardsPhotosIsFirstFetch}
          onEndReached={() => this.updatePhotos()}
          onPhotoPress={postID => navigation.push(Pages.POST_INFO_PAGE, { postID })}
        />
      </View>
    );
  }

  refreshPhotos() {
    const {
      refreshBoardsPhotos, boardsPhotosIsLoading, boardsPhotosIsRefreshing,
    } = this.props;
    if (!boardsPhotosIsRefreshing && !boardsPhotosIsLoading) {
      refreshBoardsPhotos();
    }
  }

  updatePhotos() {
    const {
      boardsPhotosNextPage, boardsPhotosTotalPages, boardsPhotosIsLoading, getBoardsPhotosNextPage, boardsPhotosIsRefreshing,
    } = this.props;
    if (boardsPhotosNextPage <= boardsPhotosTotalPages
      && !boardsPhotosIsLoading && !boardsPhotosIsRefreshing) {
      getBoardsPhotosNextPage(boardsPhotosNextPage);
    }
  }

  confirmDeleteBoard() {
    this.refs.modal.open();
  }

  deleteBoard() {
    const { navigation, deleteBoard, refreshBoards } = this.props;
    deleteBoard()
      .then((response) => {
        refreshBoards();
        showSuccessToast(strings(Strings.DELETE_BOARD_SUCCESS));
        navigation.goBack();
      })
      .catch((error) => {
        showFailiureToast(strings(Strings.DELETE_BOARD_FAIL));
      });
  }

  addSelfPostsToBoard() {
    NavigationService.navigate(Pages.ADD_POST_TO_BOARD, { boardID: this.props.navigation.getParam('board').id });
  }
}

const styles = StyleSheet.create({
  modalHeader: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 15,
    color: Colors.ICON,
  },
  modalButton: {
    flex: 1,
  },
  modalButtonText: {
    color: Colors.ICON,
  },
});

const mapStateToProps = (state, ownProps) => {
  const boardID = ownProps.navigation.getParam('board').id;
  return {
    boardsPhotos: selectBoardsPhotos(state, boardID),
    boardsPhotosNextPage: selectBoardsPhotosNextPage(state, boardID),
    boardsPhotosTotalPages: selectBoardsPhotosTotalPages(state, boardID),
    boardsPhotosIsRefreshing: selectBoardsPhotosIsRefreshing(state, boardID),
    boardsPhotosIsFirstFetch: selectBoardsPhotosIsFirstFetch(state, boardID),
    boardsPhotosIsLoading: selectBoardsPhotosIsLoading(state, boardID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const boardID = ownProps.navigation.getParam('board').id;
  return {
    getBoardsPhotosNextPage: boardsPhotosNext => dispatch(getBoardsPhotosNextPage(boardID, boardsPhotosNext)),
    refreshBoardsPhotos: () => dispatch(refreshBoardsPhotos(boardID)),
    deleteBoard: () => dispatch(deleteBoard(boardID)),
    refreshBoards: () => dispatch(refreshUserBoards()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);
