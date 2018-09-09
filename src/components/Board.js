import { Text } from 'native-base';
import React, { Component } from 'react';
import {
  FlatList, Image, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { Colors, Constants, Strings } from '../config';
import { strings } from '../i18n';

export default class Board extends Component {
  render() {
    const { name, last_pics, count } = this.props.board;
    const { onAllPress } = this.props;
    return (
      <View style={{ marginTop: 4 }}>
        <View style={{
          flexDirection: 'row',
          marginBottom: 4,
        }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'flex-start',
              marginLeft: 8,
            }}
            onPress={onAllPress}
          >
            <Text style={{
              fontSize: Constants.ITEM_FONT_SIZE,
              color: Colors.ICON,
            }}
            >
              {strings(Strings.ALL)}
            </Text>
          </TouchableOpacity>
          <View style={{
            flex: 4,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 8,
          }}
          >
            <Text style={{
              fontSize: Constants.COUNT_FONT_SIZE,
              color: Colors.ICON,
            }}
            >
              {strings(Strings.PICTURE_QUANTITY, { quantity: count })}
            </Text>
            <Text style={{
              marginLeft: 16,
              fontSize: Constants.ITEM_FONT_SIZE,
              color: Colors.ICON,
            }}
            >
              {name}
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            horizontal
            inverted
            style={{ width: '100%' }}
            keyExtractor={(item, index) => `${item}${index}`}
            data={last_pics}
            renderItem={({ item, index }) => this.renderBoardItem(item, index)}
          />
        </View>
      </View>
    );
  }

  renderBoardItem(item, index) {
    return (
      <Image
        source={{ uri: item }}
        style={styles.boardItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  boardItem: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginRight: 4,
    marginLeft: 4,
  },
});
