import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import Post from '../../components/Post';
import {BackHeader} from '../../components';
import Modal from "react-native-modal";
import AddBoardModal from '../../components/AddBoardModal';
import {boardNameChanged} from './actions';
import {connect} from 'react-redux';
import {Toast} from 'native-base';

class Home extends Component {

    state = {
        visibleModal: false,
    };

    render() {
        return (
            <View style={{flex: 1}}> 
                <BackHeader onBackPress={() => this.props.navigation.navigate('Main')}/>
                <ScrollView>
                    <Post imageSource='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC2VCb3j_W6M6uXfn6JW6H1YzZoF2fP1-w2jRcTuARfz451HUM' saveButtonPressed={this.showModal.bind(this)}></Post>
                </ScrollView>

                <Modal
                    isVisible={this.state.visibleModal === true}
                    onBackdropPress={() => this.setState({ visibleModal: null })}
                    >
                    <AddBoardModal onNameChange={(name) => this.props.changeBoardName(name)} onAddPress={this.onAddPress.bind(this)}/>
                </Modal>  
            </View>
        );
    }

    showModal() {
        this.setState({ visibleModal: true })
    }

    onAddPress() {
        console.warn(this.props.boardName);
        // if(this.props.boardName === '') {
        //     Toast.show({
        //         text: 'ERROR',
        //         textStyle: {textAlign: 'center'},
        //         position: 'bottom',
        //         type: 'danger'
        //     });
        // }
    }
}


const mapStateToProps = (state) => ({
    boardName: state.homePage.boardName,
});

const mapDispatchToProps = (dispatch) => ({
    changeBoardName: (boardName) => dispatch(boardNameChanged(boardName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
