import React, {Component} from 'react';
import {View, FlatList, Text, Image, StyleSheet} from 'react-native';
import {strings} from "../i18n";
import {Strings, Constants, Colors} from "../config";

export default class Board extends Component {

    render() {
        const {boardName, posts, quantity} = this.props;
        return (
            <View style={{marginTop: 4}}>
                <View style={{flexDirection: 'row', marginBottom: 4}}>
                    <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 8}}>
                        <Text style={{fontSize: Constants.ITEM_FONT_SIZE, color: Colors.ICON}}>{strings(Strings.ALL)}</Text>
                    </View>
                    <View style={{flex: 4, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 8}}>
                        <Text style={{fontSize: Constants.COUNT_FONT_SIZE, color: Colors.ICON}}>{strings(Strings.PICTURE_QUANTITY, {quantity})}</Text>
                        <Text style={{marginLeft: 16, fontSize: Constants.ITEM_FONT_SIZE, color: Colors.ICON}}>{boardName}</Text>
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