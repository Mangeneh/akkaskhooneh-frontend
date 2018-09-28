import { Body, Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { deleteBoard } from '../../actions';
import { BoardsPageHeader, CustomStatusBar } from '../../components';
import {
  Colors, Pages, Parameters, Strings,
} from '../../config';
import { showFailureToast, showSuccessToast } from '../../helpers';
import { strings } from '../../i18n';
import { PhotoList } from '../../containers';
import { createBoardPhotosURL } from '../../config/URLCreators';
import { selectUsername } from '../../reducers/users.ts';

// TODO: Refresh After Actions

class BoardsPage extends Component {
  render() {
    const { navigation } = this.props;
    const boardID = navigation.getParam(Parameters.BOARD).id;
    const boardName = navigation.getParam(Parameters.BOARD).name;
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <BoardsPageHeader
          boardName={boardName}
          onBackPress={() => navigation.goBack()}
          onDeletePress={() => this.confirmDeleteBoard()}
          onAddPress={() => this.addSelfPostsToBoard()}
          isSelf={navigation.getParam(Parameters.IS_SELF)}
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
        <PhotoList
          name="board_photos_"
          id={boardID}
          createURL={createBoardPhotosURL}
        />
      </View>
    );
  }

  confirmDeleteBoard() {
    this.refs.modal.open();
  }

  deleteBoard() {
    const { navigation, deleteBoard } = this.props;
    deleteBoard()
      .then((response) => {
        showSuccessToast(strings(Strings.DELETE_BOARD_SUCCESS));
        navigation.goBack();
      })
      .catch((error) => {
        showFailureToast(strings(Strings.DELETE_BOARD_FAIL));
      });
  }

  addSelfPostsToBoard() {
    const { navigation, selfUsername } = this.props;
    navigation.navigate(Pages.ADD_POST_TO_BOARD,
      {
        [Parameters.BOARD_ID]: navigation.getParam(Parameters.BOARD).id,
        [Parameters.USERNAME]: selfUsername,
      });
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

const mapStateToProps = state => ({
  selfUsername: selectUsername(state),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const boardID = ownProps.navigation.getParam(Parameters.BOARD).id;
  return {
    deleteBoard: () => dispatch(deleteBoard(boardID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);
