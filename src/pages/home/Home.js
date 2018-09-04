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
import {getHomePostsNextPage} from "../../actions";

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
                                   onAddPress={this.onAddPress.bind(this)}/>
                </Modal>
            </View>
        );
    }

    renderPost(item, index) {
        return (
            <Post saveButtonPressed={this.showModal.bind(this)} item={item}/>
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

    onCreateBoardSuccess(error) {
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
            text: Strings.CREATE_NEW_BOARD_SUCCESS,
            textStyle: {textAlign: 'center'},
            position: 'bottom',
            type: 'success'
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
                    this.onCreateBoardSuccess(error);
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
});

const mapDispatchToProps = (dispatch) => ({
    changeBoardName: (boardName) => dispatch(boardNameChanged(boardName)),
    createBoard: (boardName) => dispatch(createBoard(boardName)),
    getPostsNextPage: (postsNext) => dispatch(getHomePostsNextPage(postsNext)),
    getBoardsNextPage: (boardsNext) => dispatch(getSelfBoardsNextPage(boardsNext))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);