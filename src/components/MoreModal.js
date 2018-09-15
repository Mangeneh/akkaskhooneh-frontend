import {
    Item, Text, CardItem,
} from 'native-base';
import React, { Component } from 'react';
import {
    StyleSheet, View, TouchableOpacity,
} from 'react-native';
import { Colors, Constants, Strings } from '../config';
import { strings } from '../i18n';

export default class MoreModal extends Component {
  render() {
    return (
      <View style={styles.modalContent}>
        {this.renderItems()}
      </View>
    );
  }

  renderItems() {
    return (
      <View>
        <Item>
          <TouchableOpacity>
            <Text style={styles.listItem}>{strings(Strings.UNFOLLOW)}</Text>
          </TouchableOpacity>
        </Item>
        <Item>
          <TouchableOpacity>
            <Text style={styles.listItem}>{strings(Strings.MUTE)}</Text>
          </TouchableOpacity>
        </Item>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  listItem: {
    fontSize: Constants.TEXT_NORMAL_SIZE,
    marginLeft: 4,
    marginTop: 4,
    marginBottom: 4,

  },
});

// const mapStateToProps = state => ({
// });

// const mapDispatchToProps = dispatch => ({
// });

// export default connect(mapStateToProps, mapDispatchToProps)(MoreModal);
