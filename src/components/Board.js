import React, {Component} from 'react';
import {View, FlatList, Text, Image, StyleSheet} from 'react-native';
import {strings} from "../i18n";
import {Strings} from "../config";

export default class Board extends Component {

    render() {
        const {boardName, posts, quantity} = this.props;
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 8}}>
                        <Text>{strings(Strings.ALL)}</Text>
                    </View>
                    <View style={{flex: 4, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 8}}>
                        <Text>{strings(Strings.PICTURE_QUANTITY, {quantity})}</Text>
                        <Text style={{marginLeft: 16}}>{boardName}</Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        horizontal
                        inverted
                        style={{width: '100%'}}
                        keyExtractor={(item, index) => `${item}${index}`}
                        data={posts}
                        renderItem={({item, index}) => this.renderBoardItem(item, index)}
                    />
                </View>
            </View>
        );
    }

    renderBoardItem(item, index) {
        return (
            <Image
                source={{uri: item}}
                style={styles.boardItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    boardItem: {
        width: 120, height: 120, borderRadius: 5, marginRight: 4, marginLeft: 4
    }
});