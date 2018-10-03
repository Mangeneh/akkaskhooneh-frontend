import LottieView from 'lottie-react-native';
import { Body, Header, Icon, Left, Right, Title, } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { CustomStatusBar, NotificationComponent } from '../../components';
import Loading from '../../components/Loading';
import { Colors, Strings } from '../../config';
import { strings } from '../../i18n';
import { respondToFollowRequest } from './actions';
import {
  generatePaginatorActionCreators,
  generatePaginatorSelectors,
} from '../../reducers/paginator';
import { createNotificationsURL } from '../../config/URLCreators';

class Notification extends Component {
  componentWillMount() {
    this.refresh();
  }

  render() {
    const { notifications, isFirstFetch } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar/>
        {this.renderHeader()}
        {!isFirstFetch ? (
          <View style={{
            flex: 1,
          }}
          >
            {notifications.length === 0 ? this.showEmpty() : this.renderNotifications()}
          </View>
        ) : <Loading/>}
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
        <CustomStatusBar/>
        <Left style={{
          flex: 1,
          marginLeft: 16,
        }}
        >
          <TouchableOpacity onPress={() => {
            this.props.refresh();
          }}
          >
            <Icon name="refresh" type="MaterialCommunityIcons" style={{ color: 'white' }}/>
          </TouchableOpacity>
        </Left>
        <Body style={{ flex: 1 }}>
        <Title style={{
          alignSelf: 'center',
          color: 'white',
        }}
        >
          {strings(Strings.NOTIFICATIONS)}
        </Title>
        </Body>
        <Right style={{
          flex: 1,
        }}
        >
          <View/>
        </Right>
      </Header>
    );
  }

  renderNotifications() {
    const { isLoading, notifications } = this.props;
    return (
      <FlatList
        onRefresh={() => this.refresh()}
        refreshing={isLoading}
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
    return (
      <NotificationComponent
        notification={item}
        sendRespondForFollowRequest={(isAccept, username) => this.sendRespondForFollowRequest(isAccept, username)}
      />
    );
  }

  sendRespondForFollowRequest(isAccept, username) {
    const { respondToFollowRequest, refresh } = this.props;
    respondToFollowRequest(isAccept, username)
      .then((response) => {
        refresh();
      })
      .catch((error) => {
      });
  }

  refresh() {
    const { isLoading, isRefreshing, refresh } = this.props;
    if (!isLoading && !isRefreshing) {
      refresh()
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  updateNotifications() {
    const {
      nextPage, totalPages, isLoading, loadMore, isRefreshing,
    } = this.props;
    if (nextPage <= totalPages && !isLoading
      && !isRefreshing) {
      loadMore(nextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }
}

const mapStateToProps = (state) => {
  const paginatorSelectors = generatePaginatorSelectors(state, 'notifications', '');
  const {
    selectData, selectNextPage, selectTotalPages,
    selectIsFirstFetch, selectIsRefreshing, selectIsLoading,
  } = paginatorSelectors;
  return {
    notifications: selectData(),
    nextPage: selectNextPage(),
    totalPages: selectTotalPages(),
    isFirstFetch: selectIsFirstFetch(),
    isRefreshing: selectIsRefreshing(),
    isLoading: selectIsLoading(),
  };
};

const mapDispatchToProps = (dispatch) => {
  const paginatorActionCreators = generatePaginatorActionCreators('notifications', '');
  const { refresh, loadMore } = paginatorActionCreators;
  return {
    refresh: () => dispatch(refresh(createNotificationsURL())),
    loadMore: nextPage => dispatch(loadMore(createNotificationsURL(nextPage))),
    respondToFollowRequest: (isAccept, username) => dispatch(respondToFollowRequest(isAccept, username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
