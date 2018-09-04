import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from 'native-base';
import NavigationService from '../../NavigationService';
import Post from '../../components/Post';
import {HomeHeader} from '../../components';
import Modal from "react-native-modal";
import AddBoardModal from '../../components/AddBoardModal';
import {boardNameChanged, createBoard} from './actions';
import {Pages, Strings} from '../../config';
import {strings} from '../../i18n';

class Home extends Component {
    state = {
        visibleModal: false,
    };

    render() {
        const {boardName, changeBoardName} = this.props;
        return (
            <View style={{flex: 1}}>
                <HomeHeader onAddFriendsPress={() => NavigationService.navigate(Pages.ADD_FRIENDS)}
                            title={strings(Strings.APP_NAME)}/>
                <ScrollView>
                    <Post
                        imageSource='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC2VCb3j_W6M6uXfn6JW6H1YzZoF2fP1-w2jRcTuARfz451HUM'
                        saveButtonPressed={this.showModal.bind(this)}/>
                </ScrollView>

                <Modal
                    isVisible={this.state.visibleModal === true}
                    onBackdropPress={() => this.setState({visibleModal: null})}
                >
                    <AddBoardModal value={boardName} onNameChange={(boardName) => changeBoardName(boardName)}
                                   onAddPress={this.onAddPress.bind(this)}/>
                </Modal>
            </View>
        );
    }

    showModal() {
        this.setState({visibleModal: true})
    }

    onFail(error) {
        Toast.show({
            text: Strings.CREATE_NEW_BOARD_FAIL,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'danger'
        });
        this.setState({visibleModal: false})
    }

    onSuccess(response) {
        Toast.show({
            text: Strings.CREATE_NEW_BOARD_SUCCESS,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'success'
        });
        this.setState({visibleModal: false})
    }

    onAddPress() {
        const {boardName} = this.props;
        if (boardName !== '') {
            this.props.createBoard(boardName)
                .then((response) => {
                    this.onSuccess(response);
                })
                .catch((error) => {
                    this.onFail(error);
                });
        }
    }
}


const mapStateToProps = (state) => ({
    boardName: state.homePage.boardName,
});

const mapDispatchToProps = (dispatch) => ({
    changeBoardName: (boardName) => dispatch(boardNameChanged(boardName)),
    createBoard: (boardName) => dispatch(createBoard(boardName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);