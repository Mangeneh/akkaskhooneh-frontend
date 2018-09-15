import {
  Body, Header, Text, Title,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { CustomStatusBar, NotificationComponent } from '../../components';
import { Colors, Constants, Strings } from '../../config';
import { strings } from '../../i18n';
import { getNotifications, refreshNotifications } from './actions';
import {
  selectNotifications,
  selectNotificationsIsFirstFetch,
  selectNotificationsIsLoading,
  selectNotificationsNextPage,
  selectNotificationsTotalPages,
} from './reducer';

class Notification extends Component {
  componentWillMount() {
    this.updateNotifications();
  }

  render() {
    const { notifications, notificationsIsFirstFetch } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View>
          <CustomStatusBar />
          {this.renderHeader()}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{
            backgroundColor: Colors.WHITE_BACK,
            flex: 1,
            width: '100%',
            paddingLeft: 8,
          }}
          >
            {notifications.length === 0 && !notificationsIsFirstFetch ? this.showEmpty() : this.renderNotifications()}
          </View>
        </View>
      </View>
    );
  }

  showEmpty() {
    return (
      <View style={{
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
      >
        <Text style={{
          color: Colors.ICON,
          fontSize: Constants.TEXT_NORMAL_SIZE,
        }}
        >
          {strings(Strings.NO_NOTIFICATIONS_YET)}
        </Text>
      </View>
    );
  }

  renderHeader() {
    return (
      <Header
        androidStatusBarColor={Colors.BASE}
        style={{ backgroundColor: Colors.BASE }}
      >
        <CustomStatusBar />
        <Body style={{ flex: 3 }}>
          <Title style={{
            alignSelf: 'center',
            color: 'white',
          }}
          >
            {strings(Strings.NOTIFICATIONS)}
          </Title>
        </Body>
      </Header>
    );
  }

  renderNotifications() {
    const { refreshNotifications, notificationsIsLoading, notifications } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshNotifications()}
        refreshing={notificationsIsLoading}
        onEndReached={() => {
          this.updateNotifications();
        }}
        style={{
          width: '100%',
          flex: 1,
          marginTop: 8,
        }}
        keyExtractor={(item, index) => index.toString()}
        data={notifications}
        renderItem={({ item, index }) => this.renderNotification(item, index)}
      />
    );
  }

  renderNotification(item, index) {
    return <NotificationComponent notification={item} />;
  }

  updateNotifications() {
    const {
      notificationsNextPage, notificationsTotalPages, notificationsIsLoading, getNotificationsNextPage,
    } = this.props;
    if (notificationsNextPage <= notificationsTotalPages && !notificationsIsLoading) {
      getNotificationsNextPage(notificationsNextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }
}

const mapStateToProps = state => ({
  notifications: selectNotifications(state),
  notificationsNextPage: selectNotificationsNextPage(state),
  notificationsTotalPages: selectNotificationsTotalPages(state),
  notificationsIsLoading: selectNotificationsIsLoading(state),
  notificationsIsFirstFetch: selectNotificationsIsFirstFetch(state),
});

const mapDispatchToProps = dispatch => ({
  refreshNotifications: () => dispatch(refreshNotifications()),
  getNotificationsNextPage: notificationsNext => dispatch(getNotifications(notificationsNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
