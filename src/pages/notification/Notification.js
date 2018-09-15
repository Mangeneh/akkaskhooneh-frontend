import LottieView from 'lottie-react-native';
import { Body, Header, Title } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { CustomStatusBar, NotificationComponent } from '../../components';
import Loading from '../../components/Loading';
import { Colors, Strings } from '../../config';
import { strings } from '../../i18n';
import { getNotifications, refreshNotifications } from './actions';
import {
  selectNotifications,
  selectNotificationsIsFirstFetch,
  selectNotificationsIsLoading,
  selectNotificationsIsRefreshing,
  selectNotificationsNextPage,
  selectNotificationsTotalPages,
} from './reducer';

class Notification extends Component {
  componentWillMount() {
    this.refreshNotifications();
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
          {!notificationsIsFirstFetch ? (
            <View style={{
              flex: 1,
            }}
            >
              {notifications.length === 0 ? this.showEmpty() : this.renderNotifications()}
            </View>
          ) : <Loading />}
        </View>
      </View>
    );
  }

  showEmpty() {
    return (
      <LottieView
        source={require('../../assets/animations/no_notifications')}
        autoPlay
        loop
        style={{
          alignSelf: 'center',
          flex: 1,
        }}
      />
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
    const { notificationsIsLoading, notifications } = this.props;
    return (
      <FlatList
        onRefresh={() => this.refreshNotifications()}
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

  refreshNotifications() {
    const {
      notificationsIsLoading, notificationsIsRefreshing, refreshNotifications,
    } = this.props;
    if (!notificationsIsLoading && !notificationsIsRefreshing) {
      refreshNotifications()
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  updateNotifications() {
    const {
      notificationsNextPage, notificationsTotalPages, notificationsIsLoading, getNotificationsNextPage, notificationsIsRefreshing,
    } = this.props;
    if (notificationsNextPage <= notificationsTotalPages && !notificationsIsLoading
      && !notificationsIsRefreshing) {
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
  notificationsIsFirstFetch: selectNotificationsIsFirstFetch(state),
  notificationsIsRefreshing: selectNotificationsIsRefreshing(state),
  notificationsIsLoading: selectNotificationsIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  refreshNotifications: () => dispatch(refreshNotifications()),
  getNotificationsNextPage: notificationsNext => dispatch(getNotifications(notificationsNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
