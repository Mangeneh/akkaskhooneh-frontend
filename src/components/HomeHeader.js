import React, {Component} from 'react';
import {Header, Left, Body, Right, Icon, Title} from 'native-base';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Colors} from '../config';
import {selectHomePostsIsLoading} from "../reducers/PostsReducer";

class HomeHeader extends Component {
    render() {
        return (
            <View>
                <Header androidStatusBarColor={Colors.BASE} style={{backgroundColor: Colors.BASE}}>
                    <Left style={{flex: 1, marginLeft: 16}}>
                        <TouchableOpacity onPress={this.props.onAddFriendsPress}>
                            <Icon type={'Feather'} name='user-plus' style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title style={{
                        alignSelf: 'center',
                        color: 'white'
                    }}>{this.props.title}</Title>
                    </Body>
                    <Right style={{flex: 1, marginRight: 16}}>
                        {(this.props.postsIsLoading) ? (<ActivityIndicator size="large"/>) :
                            <TouchableOpacity>
                                <Icon/>
                            </TouchableOpacity>
                        }
                    </Right>
                </Header>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    postsIsLoading: selectHomePostsIsLoading(state),
});

export default connect(mapStateToProps, null)(HomeHeader);