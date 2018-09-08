import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { deleteBoard, refreshBoards } from '../../actions';
import { CustomStatusBar, SelfBoardsPageHeader } from '../../components';
import { Strings } from '../../config';
import { showFailiureToast, showSuccessToast } from '../../helpers';
import { strings } from '../../i18n';
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
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <SelfBoardsPageHeader
          boardName={this.props.navigation.getParam('board').name}
          onBackPress={() => this.props.navigation.goBack()}
          onDeletePress={() => this.confirmDeleteBoard()}
          onAddPress={() => {
          }}
        />
        {(this.props.boardsIsLoading) ? (<ActivityIndicator size="large" />)
          : (
            <FlatList
              onEndReached={() => this.updatePhotos()}
              style={{
                width: '100%',
                marginTop: 8,
              }}
              numColumns={2}
              keyExtractor={(item, index) => item.id.toString()}
              data={this.props.boardsPhotos}
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
    Alert.alert(
      '',
      strings(Strings.DELETE_BOARD_INQUIRY),
      [
        {
          text: strings(Strings.NO),
          style: 'cancel',
        },
        {
          text: strings(Strings.YES),
          onPress: () => this.deleteBoard(),
        },
      ],
      { cancelable: true },
    );
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
}

const styles = StyleSheet.create({
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
  refreshBoards: () => dispatch(refreshBoards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);
