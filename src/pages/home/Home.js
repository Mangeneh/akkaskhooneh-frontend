import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Toast, Text, Button} from 'native-base';
import Modal from 'react-native-modal';
import NavigationService from '../../NavigationService';
import Post from '../../components/Post';
import {HomeHeader} from '../../components';
import AddBoardModal from '../../components/AddBoardModal';
import {boardNameChanged, createBoard} from './actions';
import {Pages, Strings, Colors, Constants} from '../../config';
import {strings} from '../../i18n';
import {
    selectHomePosts,
    selectHomePostsIsLoading,
    selectHomePostsNextPage,
    selectHomePostsTotalPages,
} from "../../reducers/PostsReducer";
import {
    selectSelectedPostID,
} from "../../reducers/BoardsReducer";
import {
    getHomePostsNextPage,
    selectedPostChanged,
    addPostToBoard,
    getSelfBoardsNextPage,
    resetSelfBoards
} from "../../actions";


class Home extends Component {
    constructor(props) {
        super(props);
        this.updatePosts();
    }

    state = {
        newBoardName: '',
        visibleModal: false,
    };

    render() {
        const {boardName, changeBoardName} = this.props;
        return (
            <View style={{flex: 1}}>
                <HomeHeader onAddFriendsPress={() => NavigationService.navigate(Pages.ADD_FRIENDS)}
                            title={strings(Strings.APP_NAME)}/>
                {this.renderContent()}
                <Modal
                    isVisible={this.state.visibleModal}
                    onBackdropPress={() => this.setState({visibleModal: false})}
                    onModalHide={() => changeBoardName('')}
                >
                    <AddBoardModal
                        value={boardName} onNameChange={(boardName) => changeBoardName(boardName)}
                        onAddPress={this.onAddPress.bind(this)}
                        onBoardNamePressed={(selectedBoardID) => this.addNewPostToBoard(selectedBoardID)}/>
                </Modal>
            </View>
        );
    }

    renderPost(item, index) {
        return (
            <Post saveButtonPressed={() => {
                this.showModal();
                this.props.changeSelectedPostID(item.id);
            }} item={item}/>
        );
    }

    renderContent() {
        return (this.props.posts.length === 0 && !this.props.postsIsLoading ? this.renderNewUserFirstImpression() : this.renderFeed())
    }

    updatePosts() {
        if (this.props.postsNextPage <= this.props.postsTotalPages &&
            !this.props.postsIsLoading) {
            this.props.getPostsNextPage(this.props.postsNextPage);
        }
    }

    renderNewUserFirstImpression() {
        return (
            <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: Constants.TEXT_NORMAL_SIZE, color: Colors.ICON, marginBottom: 8}}>{strings(Strings.NEW_USER_FIRST_IMPRESSION)}</Text>
                <Button style={{backgroundColor: 'white', alignSelf: 'center'}} onPress={() => NavigationService.navigate(Pages.ADD_FRIENDS)}>
                    <Text style={{fontSize: Constants.TEXT_NORMAL_SIZE, color: Colors.ICON}}>{strings(Strings.INVITE_FRIENDS)}</Text>
                </Button>
            </View>
        )
    }

    renderFeed() {
        return (
            <FlatList
                onEndReached={() => this.updatePosts()}
                style={{width: '100%', marginTop: 8}}
                keyExtractor={(item, index) => item.id.toString()}
                data={this.props.posts}
                renderItem={({item, index}) => this.renderPost(item, index)}
            />
        )
    }

    showModal() {
        this.setState({visibleModal: true});
    }

    onCreateBoardFail(error) {
        Toast.show({
            text: Strings.CREATE_NEW_BOARD_FAIL,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'danger'
        });
        this.setState({visibleModal: false});
    }

    onCreateBoardSuccess(response) {
        Toast.show({
            text: strings(Strings.CREATE_NEW_BOARD_SUCCESS),
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'success'
        });
        this.setState({visibleModal: false});
        this.addNewPostToBoard(response.payload.data.id);
    }

    addNewPostToBoard(selectedBoardID) {
        const {selectedPostID} = this.props;
        this.props.addPostToBoard(selectedPostID, selectedBoardID)
            .then((response) => {
            })
            .catch((error) => {
            });
        this.setState({visibleModal: false});
    }

    onAddPress() {
        const {boardName} = this.props;
        if (boardName !== '') {
            this.props.createBoard(boardName)
                .then((response) => {
                    this.onCreateBoardSuccess(response);
                })
                .catch((error) => {
                    this.onCreateBoardFail(error);
                });
        }
    }
}

const mapStateToProps = (state) => ({
    boardName: state.homePage.boardName,
    posts: selectHomePosts(state),
    postsNextPage: selectHomePostsNextPage(state),
    postsTotalPages: selectHomePostsTotalPages(state),
    postsIsLoading: selectHomePostsIsLoading(state),
    selectedPostID: selectSelectedPostID(state),
});

const mapDispatchToProps = (dispatch) => ({
    changeSelectedPostID: (id) => dispatch(selectedPostChanged(id)),
    changeBoardName: (boardName) => dispatch(boardNameChanged(boardName)),
    resetSelfBoards: () => dispatch(resetSelfBoards()),
    createBoard: (boardName) => dispatch(createBoard(boardName)),
    getPostsNextPage: (postsNext) => dispatch(getHomePostsNextPage(postsNext)),
    getBoardsNextPage: (boardsNext) => dispatch(getSelfBoardsNextPage(boardsNext)),
    addPostToBoard: (postID, boardID) => dispatch(addPostToBoard(postID, boardID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);