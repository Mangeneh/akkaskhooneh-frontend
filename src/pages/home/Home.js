import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Post from '../../components/Post';
import { BackHeader } from '../../components';

export default class Home extends Component {

    render() {
        return (
            <View style={{flex: 1}}>  
                <BackHeader onBackPress={() => this.props.navigation.navigate('Main')}/>
                <Post></Post>          
            </View>
        );
    }

}