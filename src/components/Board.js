import React, {Component} from 'react';
import {View, FlatList, Text, Image} from 'react-native';
import {strings} from "../i18n";

export default class Board extends Component {

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 8}}>
                        <Text>{strings('all')}</Text>
                    </View>
                    <View style={{flex: 4, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 8}}>
                        <Text>{strings('picture_quantity', {quantity: this.props.quantity})}</Text>
                        <Text style={{marginLeft: 16}}>{this.props.boardName}</Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        horizontal
                        inverted
                        style={{width: '100%'}}
                        keyExtractor={(item, index) => item.id}
                        data={this.props.posts}
                        renderItem={({item, index}) => this.renderBoardItem(item, index)}
                    />
                </View>
            </View>
        );
    }

    renderBoardItem(item, index) {
        return (
            <Image
                source={{uri: item.uri}}
                style={{width: 120, height: 120, borderRadius: 5, marginRight: 4, marginLeft: 4}}
            />
        );
    }
}