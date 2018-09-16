import {
  Header, Icon, Input, Item, Tab, Tabs, Toast,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {
  getFollowers,
  getFollowings,
  refreshFollowers,
  refreshFollowings,
  startNewSearch,
} from '../../actions/UsersActions';
import { ContactItem, CustomStatusBar } from '../../components';
import Loading from '../../components/Loading';
import {
  Colors, Constants, Graphics, Parameters, Strings,
} from '../../config';
import { strings } from '../../i18n';
import {
  selectFollowers,
  selectFollowersIsFirstFetch,
  selectFollowersIsLoading,
  selectFollowersIsRefreshing,
  selectFollowersNextPage,
  selectFollowersTotalPages,
  selectFollowings,
  selectFollowingsIsFirstFetch,
  selectFollowingsIsLoading,
  selectFollowingsIsRefreshing,
  selectFollowingsNextPage,
  selectFollowingsTotalPages,
} from '../../reducers/UsersReducer';

class ContactList extends Component {
  state = {
    searchText: '',
  };

  componentWillMount() {
    this.search('');
  }

  componentDidMount() {
    setTimeout(this.tabs.goToPage.bind(this.tabs, this.props.navigation.getParam('tab')));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        {this.renderHeader()}
        <View style={{ flex: 1 }}>
          <Tabs
            ref={(component) => {
              this.tabs = component;
            }}
            tabBarUnderlineStyle={{ backgroundColor: Colors.ACCENT }}
            initialPage={this.props.navigation.getParam('tab')}
          >
            <Tab
              heading={strings(Strings.FOLLOWERS)}
              activeTextStyle={{
                color: Colors.TEXT,
                fontSize: 12,
              }}
              textStyle={{
                color: Colors.TEXT,
                fontSize: 12,
              }}
              tabStyle={{ backgroundColor: 'white' }}
              activeTabStyle={{ backgroundColor: 'white' }}
            >
              <View style={{
                backgroundColor: Colors.WHITE_BACK,
                flex: 1,
                width: '100%',
                paddingLeft: 8,
              }}
              >
                {this.renderFollowers()}
              </View>
            </Tab>
            <Tab
              heading={strings(Strings.FOLLOWINGS)}
              activeTextStyle={{
                color: Colors.TEXT,
                fontSize: 12,
              }}
              textStyle={{
                color: Colors.TEXT,
                fontSize: 12,
              }}
              activeTabStyle={{ backgroundColor: 'white' }}
              tabStyle={{ backgroundColor: 'white' }}
            >
              <View style={{
                backgroundColor: Colors.WHITE_BACK,
                flex: 1,
                width: '100%',
                paddingLeft: 8,
              }}
              >
                {this.renderFollowings()}
              </View>
            </Tab>
          </Tabs>
        </View>
      </View>
    );
  }

  renderHeader() {
    const { searchText } = this.state;
    return (
      <Header
        androidStatusBarColor={Colors.BASE}
        searchBar
        style={{ backgroundColor: Colors.BASE }}
      >
        <CustomStatusBar />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          hitSlop={Graphics.HIT_SLOP}
          style={{
            justifyContent: 'center',
          }}
        >
          <Icon name="arrow-left" type="MaterialCommunityIcons" style={{ color: 'white' }} />
        </TouchableOpacity>
        <Item
          rounded
          style={{
            alignSelf: 'center',
            borderRadius: Constants.TEXT_BOX_RADIUS,
          }}
        >
          <Input
            autoFocus
            placeholder={strings(Strings.SEARCH_USER)}
            style={{
              textAlign: 'right',
              fontSize: Constants.ITEM_FONT_SIZE,
            }}
            value={searchText}
            onChangeText={searchText => this.search(searchText)}
          />
          <Icon name="ios-search" style={{ color: Colors.ICON }} />
        </Item>
      </Header>
    );
  }

  renderFollowings() {
    const { searchText } = this.state;
    const {
      refreshFollowings, followingsIsRefreshing, followings, followingsIsFirstFetch,
    } = this.props;
    return (!followingsIsFirstFetch
      ? (
        <FlatList
          onRefresh={() => refreshFollowings(searchText)}
          refreshing={followingsIsRefreshing}
          onEndReached={() => {
            this.updateFollowings(searchText);
          }}
          style={{
            width: '100%',
            flex: 1,
            marginTop: 8,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={followings}
          renderItem={({ item, index }) => this.renderFollowingItem(item, index)}
        />
      ) : <Loading />
    );
  }

  renderFollowingItem(item, index) {
    return <ContactItem user={item} />;
  }

  updateFollowings(text) {
    const {
      followingsNextPage, followingsTotalPages, followingsIsLoading, getFollowingsNextPage, followingsIsRefreshing,
    } = this.props;
    if (followingsNextPage <= followingsTotalPages && !followingsIsLoading
      && !followingsIsRefreshing) {
      getFollowingsNextPage(text, followingsNextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  refreshFollowings(text) {
    const {
      followingsIsLoading, followingsIsRefreshing,
    } = this.props;
    if (!followingsIsLoading && !followingsIsRefreshing) {
      this.props.refreshFollowings(text)
        .then((response) => {
        })
        .catch((error) => {
          Toast.show({
            text: strings(Strings.SEARCH_FAIL),
            textStyle: { textAlign: 'center' },
            position: 'bottom',
            type: 'danger',
          });
        });
    }
  }

  renderFollowers() {
    const { searchText } = this.state;
    const {
      refreshFollowers, followersIsRefreshing, followers, followersIsFirstFetch,
    } = this.props;
    return (!followersIsFirstFetch
      ? (
        <FlatList
          onRefresh={() => refreshFollowers(searchText)}
          refreshing={followersIsRefreshing}
          onEndReached={() => {
            this.updateFollowers(searchText);
          }}
          style={{
            width: '100%',
            marginTop: 8,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={followers}
          renderItem={({ item, index }) => this.renderFollowerItem(item, index)}
        />
      ) : <Loading />
    );
  }

  renderFollowerItem(item, index) {
    return <ContactItem user={item} />;
  }

  updateFollowers(text) {
    const {
      followersNextPage, followersTotalPages, followersIsLoading, getFollowersNextPage, followersIsRefreshing,
    } = this.props;
    if (followersNextPage <= followersTotalPages && !followersIsLoading
      && !followersIsRefreshing) {
      getFollowersNextPage(text, followersNextPage)
        .then((response) => {
        })
        .catch((error) => {
          Toast.show({
            text: strings(Strings.SEARCH_FAIL),
            textStyle: { textAlign: 'center' },
            position: 'bottom',
            type: 'danger',
          });
        });
    }
  }

  refreshFollowers(text) {
    const {
      followersIsLoading, followersIsRefreshing, refreshFollowers,
    } = this.props;
    if (!followersIsLoading && !followersIsRefreshing) {
      refreshFollowers(text)
        .then((response) => {
        })
        .catch((error) => {
          Toast.show({
            text: strings(Strings.SEARCH_FAIL),
            textStyle: { textAlign: 'center' },
            position: 'bottom',
            type: 'danger',
          });
        });
    }
  }

  search(searchText) {
    const { refreshFollowings, refreshFollowers } = this.props;
    this.setState({ searchText });
    refreshFollowings(searchText);
    refreshFollowers(searchText);
  }
}

const mapStateToProps = (state, ownProps) => {
  const username = ownProps.navigation.getParam(Parameters.USERNAME);
  return {
    followings: selectFollowings(state, username),
    followingsNextPage: selectFollowingsNextPage(state, username),
    followingsTotalPages: selectFollowingsTotalPages(state, username),
    followingsIsFirstFetch: selectFollowingsIsFirstFetch(state, username),
    followingsIsRefreshing: selectFollowingsIsRefreshing(state, username),
    followingsIsLoading: selectFollowingsIsLoading(state, username),
    followers: selectFollowers(state, username),
    followersNextPage: selectFollowersNextPage(state, username),
    followersTotalPages: selectFollowersTotalPages(state, username),
    followersIsFirstFetch: selectFollowersIsFirstFetch(state, username),
    followersIsRefreshing: selectFollowersIsRefreshing(state, username),
    followersIsLoading: selectFollowersIsLoading(state, username),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const username = ownProps.navigation.getParam(Parameters.USERNAME);
  return {
    refreshFollowings: text => dispatch(refreshFollowings(text, username)),
    getFollowingsNextPage: (text, followingsNext) => dispatch(getFollowings(text, followingsNext, username)),
    refreshFollowers: text => dispatch(refreshFollowers(text, username)),
    getFollowersNextPage: (text, followersNext) => dispatch(getFollowers(text, followersNext, username)),
    startNewSearch: () => dispatch(startNewSearch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
