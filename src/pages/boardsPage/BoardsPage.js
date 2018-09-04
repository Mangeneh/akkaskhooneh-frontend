import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {selectSelfUsername} from "../../reducers/UserInfoReducer";
import {getBoardsPhotosNextPage} from "./actions";
import {
    selectBoardsPhotos,
    selectBoardsPhotosIsLoading,
    selectBoardsPhotosNextPage,
    selectBoardsPhotosTotalPages
} from "./reducer";

class BoardsPage extends Component {
    render() {
        return (
            <View>
                {(this.props.boardsIsLoading) ? (<ActivityIndicator size="large"/>) :
                    <FlatList
                        onEndReached={() => this.updateBoards()}
                        style={{width: '100%', marginTop: 8}}
                        keyExtractor={(item, index) => item.id.toString()}
                        data={this.props.boards}
                        renderItem={({item, index}) => this.renderBoard(item, index)}
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    username: selectSelfUsername(state),
    boardsPhotos: selectBoardsPhotos(state),
    boardsPhotosNextPage: selectBoardsPhotosNextPage(state),
    boardsPhotosTotalPages: selectBoardsPhotosTotalPages(state),
    boardsPhotosIsLoading: selectBoardsPhotosIsLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
    getBoardsPhotosNextPage: (boardID, boardsPhotosNext) => dispatch(getBoardsPhotosNextPage(boardID, boardsPhotosNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);