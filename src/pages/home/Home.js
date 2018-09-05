import React, {Component} from 'react';
import {View, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from 'native-base';
import NavigationService from '../../NavigationService';
import Post from '../../components/Post';
import {HomeHeader} from '../../components';
import Modal from "react-native-modal";
import AddBoardModal from '../../components/AddBoardModal';
import {boardNameChanged, createBoard} from './actions';
import {Pages, Strings, Colors} from '../../config';
import {strings} from '../../i18n';
import {
    selectHomePosts,
    selectHomePostsIsLoading,
    selectHomePostsNextPage,
    selectHomePostsTotalPages,
} from "../../reducers/PostsReducer";
import {
    selectSelectedBoardID,
    selectSelectedPostID,
} from "../../reducers/BoardsReducer";
import {getHomePostsNextPage, selectedPostChanged, addPostToBoard} from "../../actions";


class Home extends Component {
    constructor(props) {
        super(props);
        this.updatePosts();
    }

    state = {
        visibleModal: false,
    };

    render() {
        const {boardName, changeBoardName} = this.props;
        return (
            <View style={{flex: 1}}>
                <HomeHeader onAddFriendsPress={() => NavigationService.navigate(Pages.ADD_FRIENDS)}
                            title={strings(Strings.APP_NAME)}/>
                <FlatList
                    onEndReached={() => this.updatePosts()}
                    style={{width: '100%', marginTop: 8}}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.props.posts}
                    renderItem={({item, index}) => this.renderPost(item, index)}
                />
                <Modal
                    isVisible={this.state.visibleModal === true}
                    onBackdropPress={() => this.setState({visibleModal: null})}
                >
                    <AddBoardModal value={boardName} onNameChange={(boardName) => changeBoardName(boardName)}
                                   onAddPress={this.onAddPress.bind(this)} onBoardNamePressed={(selectedBoardID) => this.AddNewPostToBoard(selectedBoardID)}/>
                </Modal>
            </View>
        );
    }

    renderPost(item, index) {

        return (
            <Post saveButtonPressed={() => {this.showModal(); this.props.changeSelectedPostID(item.id);}} item={item}/>
        );
    }

    updatePosts() {
        if (this.props.postsNextPage <= this.props.postsTotalPages &&
            !this.props.postsIsLoading) {
            this.props.getPostsNextPage(this.props.postsNextPage);
        }
    }

    showModal() {
        this.setState({visibleModal: true});
    }

    onCreateBoardFail(error) {
        console.warn('HERE?!?')
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
        this.AddNewPostToBoard(response.payload.data.id);
    }

    AddNewPostToBoard(selectedBoardID)
    {
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
                    console.warn(response)
                    this.onCreateBoardSuccess(response);
                })
                .catch((error) => {
                    console.warn("mnooooooooo");
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
    selectedBoardID: selectSelectedBoardID(state),
    selectedPostID: selectSelectedPostID(state),
});

const mapDispatchToProps = (dispatch) => ({
    changeSelectedPostID: (id) => dispatch(selectedPostChanged(id)),
    changeBoardName: (boardName) => dispatch(boardNameChanged(boardName)),
    createBoard: (boardName) => dispatch(createBoard(boardName)),
    getPostsNextPage: (postsNext) => dispatch(getHomePostsNextPage(postsNext)),
    getBoardsNextPage: (boardsNext) => dispatch(getSelfBoardsNextPage(boardsNext)),
    addPostToBoard: (postID, boardID) => dispatch(addPostToBoard(postID, boardID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);