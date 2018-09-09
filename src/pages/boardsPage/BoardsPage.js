import { Body, Button, Text } from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, View,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { deleteBoard, refreshSelfBoards } from '../../actions';
import { CustomStatusBar, SelfBoardsPageHeader } from '../../components';
import { Colors, Pages, Strings } from '../../config';
import { showFailiureToast, showSuccessToast } from '../../helpers';
import { strings } from '../../i18n';
import NavigationService from '../../NavigationService';
import { selectSelfUsername } from '../../reducers/UserInfoReducer';
import { getBoardsPhotosNextPage } from './actions';
import {
  selectBoardsPhotos,
  selectBoardsPhotosIsLoading,
  selectBoardsPhotosNextPage,
  selectBoardsPhotosTotalPages,
} from './reducer';

const WIDTH = Dimensions.get('window').width;

class BoardsPage extends Component {
  constructor(props) {
    super(props);
    this.updatePhotos();
  }

  render() {
    const { navigation, boardsPhotos, boardsIsLoading } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <SelfBoardsPageHeader
          boardName={navigation.getParam('board').name}
          onBackPress={() => navigation.navigate(Pages.MAIN)}
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
        {(boardsIsLoading) ? (<ActivityIndicator size="large" />)
          : (
            <FlatList
              onEndReached={() => this.updatePhotos()}
              style={{
                width: '100%',
                marginTop: 8,
              }}
              numColumns={2}
              keyExtractor={(item, index) => item.id.toString()}
              data={boardsPhotos}
              renderItem={({ item, index }) => this.renderPhoto(item, index)}
            />
          )
        }
      </View>
    );
  }

  renderPhoto(item, index) {
    return (
      <View style={index % 2 === 0 ? styles.evenPhoto : styles.oddPhoto}>
        <Image
          source={{ uri: item.picture }}
          resizeMode="stretch"
          style={{
            width: WIDTH / 2 - 12,
            height: WIDTH / 2 - 12,
          }}
        />
      </View>
    );
  }

  updatePhotos() {
    const {
      boardsPhotosNextPage, boardsPhotosTotalPages, boardsPhotosIsLoading, getBoardsPhotosNextPage, navigation,
    } = this.props;
    if (boardsPhotosNextPage <= boardsPhotosTotalPages
      && !boardsPhotosIsLoading) {
      getBoardsPhotosNextPage(navigation.getParam('board').id, boardsPhotosNextPage);
    }
  }

  confirmDeleteBoard() {
    this.refs.modal.open();
  }

  deleteBoard() {
    const { navigation, deleteBoard, refreshBoards } = this.props;
    const boardID = navigation.getParam('board').id;
    deleteBoard(boardID)
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
  evenPhoto: {
    justifyContent: 'flex-start',
    marginRight: 4,
    marginLeft: 8,
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  oddPhoto: {
    justifyContent: 'flex-start',
    marginBottom: 8,
    marginRight: 8,
    marginLeft: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

const mapStateToProps = state => ({
  username: selectSelfUsername(state),
  boardsPhotos: selectBoardsPhotos(state),
  boardsPhotosNextPage: selectBoardsPhotosNextPage(state),
  boardsPhotosTotalPages: selectBoardsPhotosTotalPages(state),
  boardsPhotosIsLoading: selectBoardsPhotosIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  getBoardsPhotosNextPage: (boardID, boardsPhotosNext) => dispatch(getBoardsPhotosNextPage(boardID, boardsPhotosNext)),
  deleteBoard: boardID => dispatch(deleteBoard(boardID)),
  refreshBoards: () => dispatch(refreshSelfBoards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);
