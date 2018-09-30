import {
  Icon, Item, Left, Right, Text,
} from 'native-base';
import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../../actions/UsersActions.ts';
import { BackHeader, CustomStatusBar } from '../../components';
import {
  Colors, Constants, Pages, Strings,
} from '../../config';
import { strings } from '../../i18n';

class ProfileSettings extends Component {
  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      >
        <BackHeader
          onBackPress={() => this.onBackPress()}
          title={strings(Strings.PROFILE_SETTINGS)}
        />
        <View style={{
          backgroundColor: 'white',
          flex: 1,
        }}
        >
          <CustomStatusBar />
          <View style={{ flex: 1 }} />
          <View style={{
            backgroundColor: 'white',
            flex: 10,
          }}
          >
            <View>
              <Item onPress={() => this.onChangePassPressed()}>
                <Left>
                  <TouchableOpacity onPress={() => this.onChangePassPressed()}>
                    <Icon
                      type="Ionicons"
                      name="ios-arrow-back"
                      style={{
                        color: Colors.ACCENT,
                        marginLeft: 16,
                      }}
                    />
                  </TouchableOpacity>
                </Left>
                <Right>
                  <TouchableOpacity onPress={() => this.onChangePassPressed()}>
                    <Text style={styles.text}>
                      {strings(Strings.CHANGE_PASS)}
                    </Text>
                  </TouchableOpacity>
                </Right>
              </Item>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginBottom: 0,
            backgroundColor: 'white',
          }}
          onPress={() => this.onSignOutPress()}
        >
          <Text style={styles.exit}>{strings(Strings.SIGN_OUT)}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  onChangePassPressed() {
    this.props.navigation.navigate(Pages.CHANGE_PASS);
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  onSignOutPress() {
    this.props.navigation.navigate(Pages.AUTH_STACK);
    this.props.reset();
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginRight: 16,
    color: Colors.TEXT,
  },
  exit: {
    fontSize: Constants.TEXT_NORMAL_SIZE,
    color: Colors.TEXT,
    textAlign: 'center',
    marginBottom: 20,
  },
});

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(signOut()),
});

export default connect(null, mapDispatchToProps)(ProfileSettings);
