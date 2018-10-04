import { Text } from 'native-base';
import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Fonts, Strings } from '../config';
import { strings } from '../i18n';
import { Board, WithNavigation } from '../types';

export interface Props extends WithNavigation {
  board: Board;
  onAllPress: () => void;
}

export default class BoardPreview extends Component<Props> {
  public render () {
    return (
      <View style={styles.board}>
        {this.renderDetails()}
        {this.renderBoardLastPhotosList()}
      </View>
    );
  }

  private renderDetails (): React.ReactNode {
    const { onAllPress, board } = this.props;
    const { name, count } = board;
    return (
      <View style={styles.details}>
        <TouchableOpacity
          style={styles.rightDetails}
          onPress={onAllPress}
        >
          <Text style={styles.allText}>
            {strings(Strings.ALL)}
          </Text>
        </TouchableOpacity>
        <View style={styles.leftDetails}>
          <Text style={styles.countText}>
            {strings(Strings.PICTURE_QUANTITY, { quantity: count })}
          </Text>
          <Text style={styles.nameText}>
            {name}
          </Text>
        </View>
      </View>
    );
  }

  private renderBoardLastPhotosList (): React.ReactNode {
    const { board } = this.props;
    const { last_pics } = board;
    return (
      <FlatList
        horizontal
        inverted
        style={styles.photoList}
        keyExtractor={(item, index) => `${item}${index}`}
        data={last_pics}
        renderItem={({ item }) => this.renderPhoto(item)}
      />
    );
  }

  private renderPhoto (item: string) {
    return (
      <FastImage
        source={{ uri: item }}
        style={styles.photo}
      />
    );
  }
}

const styles = StyleSheet.create({
  board: { marginTop: 4 },
  details: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  rightDetails: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  leftDetails: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 8,
  },
  allText: {
    fontSize: Fonts.SUB_NORMAL_FONT_SIZE,
    color: Colors.LIGHT_TEXT,
  },
  countText: {
    fontSize: Fonts.SUB_SUB_NORMAL_FONT_SIZE,
    color: Colors.LIGHT_TEXT,
  },
  nameText: {
    marginLeft: 16,
    fontSize: Fonts.SUB_NORMAL_FONT_SIZE,
    color: Colors.LIGHT_TEXT,
  },
  photoList: { width: '100%' },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginRight: 4,
    marginLeft: 4,
  },
});
