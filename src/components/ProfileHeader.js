import {
  Body, Header, Icon, Left, Right, Text, Title,
} from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Colors, Strings } from '../config';
import { strings } from '../i18n';
import { selectUsername } from '../reducers/UsersReducer';
import BackHeader from './BackHeader';
import CustomStatusBar from './CustomStatusBar';

class ProfileHeader extends Component {
  render() {
    const { username, selfUsername } = this.props;
    if (!username || username === selfUsername) {
      return this.renderSelfHeader();
    }
    return this.renderOthersHeader();
  }

  renderSelfHeader() {
    const { onEditPress, selfUsername, onSettingsPress } = this.props;
    return (
      <View>
        <Header
          androidStatusBarColor={Colors.BASE}
          style={{ backgroundColor: Colors.BASE }}
          hasTabs
        >
          <CustomStatusBar />
          <Left style={{
            flex: 1,
            marginLeft: 16,
          }}
          >
            <TouchableOpacity onPress={() => onEditPress()}>
              <Text style={{ color: 'white' }}>{strings(Strings.EDIT)}</Text>
            </TouchableOpacity>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={{
              alignSelf: 'center',
              color: 'white',
            }}
            >
              {selfUsername}
            </Title>
          </Body>
          <Right style={{
            flex: 1,
            marginRight: 16,
          }}
          >
            <TouchableOpacity onPress={() => onSettingsPress()}>
              <Icon type="MaterialCommunityIcons" name="ship-wheel" style={{ color: 'white' }} />
            </TouchableOpacity>
          </Right>
        </Header>
      </View>
    );
  }

  renderOthersHeader() {
    const { username, navigation } = this.props;
    return (<BackHeader title={username} onBackPress={() => navigation.goBack()} />);
  }
}

const mapStateToProps = state => ({
  selfUsername: selectUsername(state),
});

export default withNavigation(connect(mapStateToProps, null)(ProfileHeader));
