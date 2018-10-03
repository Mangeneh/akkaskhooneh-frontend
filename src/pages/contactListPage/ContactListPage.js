import {
  Header, Icon, Input, Item, Tab, Tabs, Toast,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { ContactItem, CustomStatusBar } from '../../components';
import Loading from '../../components/Loading';
import {
  Colors, Constants, Graphics, hitSlop, Parameters, Strings,
} from '../../config';
import { strings } from '../../i18n';
import {
  generatePaginatorActionCreators,
  generatePaginatorSelectors,
} from '../../reducers/paginator.ts';
import { createFollowersURL, createFollowingsURL } from '../../config/URLCreators';

class ContactList extends Component {
  state = {
    searchText: '',
  };

  componentWillMount() {
    this.search('');
  }

  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(this.tabs.goToPage.bind(this.tabs, navigation.getParam(Parameters.TAB)));
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
                color: Colors.DARK_TEXT,
                fontSize: 12,
              }}
              textStyle={{
                color: Colors.DARK_TEXT,
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
                color: Colors.DARK_TEXT,
                fontSize: 12,
              }}
              textStyle={{
                color: Colors.DARK_TEXT,
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
          hitSlop={hitSlop}
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
            this.loadMoreFollowings(searchText);
          }}
          style={{
            width: '100%',
            flex: 1,
            marginTop: 8,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={followings}
          renderItem={({ item }) => this.renderFollowingItem(item)}
        />
      ) : <Loading />
    );
  }

  renderFollowingItem(item) {
    return <ContactItem user={item} />;
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
            this.loadMoreFollowers(searchText);
          }}
          style={{
            width: '100%',
            marginTop: 8,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={followers}
          renderItem={({ item }) => this.renderFollowerItem(item)}
        />
      ) : <Loading />
    );
  }

  renderFollowerItem(item) {
    return <ContactItem user={item} />;
  }

  loadMoreFollowers(text) {
    const {
      followersNextPage, followersTotalPages, followersIsLoading, loadMoreFollowers, followersIsRefreshing,
    } = this.props;
    if (followersNextPage <= followersTotalPages && !followersIsLoading
      && !followersIsRefreshing) {
      loadMoreFollowers(text, followersNextPage)
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

  loadMoreFollowings(text) {
    const {
      followingsNextPage, followingsTotalPages, followingsIsLoading, loadMoreFollowings, followingsIsRefreshing,
    } = this.props;
    if (followingsNextPage <= followingsTotalPages && !followingsIsLoading
      && !followingsIsRefreshing) {
      loadMoreFollowings(text, followingsNextPage)
        .then((response) => {
        })
        .catch((error) => {
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
  const followingsSelectors = generatePaginatorSelectors(state, 'user_followings_', username);
  const followersSelectors = generatePaginatorSelectors(state, 'user_followers_', username);
  return {
    followings: followingsSelectors.selectData(),
    followingsNextPage: followingsSelectors.selectNextPage(),
    followingsTotalPages: followingsSelectors.selectTotalPages(),
    followingsIsFirstFetch: followingsSelectors.selectIsFirstFetch(),
    followingsIsRefreshing: followingsSelectors.selectIsRefreshing(),
    followingsIsLoading: followingsSelectors.selectIsLoading(),
    followers: followersSelectors.selectData(),
    followersNextPage: followersSelectors.selectTotalPages(),
    followersTotalPages: followersSelectors.selectTotalPages(),
    followersIsFirstFetch: followersSelectors.selectIsFirstFetch(),
    followersIsRefreshing: followersSelectors.selectIsRefreshing(),
    followersIsLoading: followersSelectors.selectIsLoading(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const username = ownProps.navigation.getParam(Parameters.USERNAME);
  const followingsActionCreators = generatePaginatorActionCreators('user_followings_', username);
  const followersActionCreators = generatePaginatorActionCreators('user_followers_', username);
  return {
    refreshFollowings: searchText => dispatch(followingsActionCreators.refresh(createFollowingsURL(username, searchText))),
    loadMoreFollowings: (searchText, nextPage) => dispatch(followingsActionCreators.refresh(createFollowingsURL(username, searchText, nextPage))),
    refreshFollowers: searchText => dispatch(followersActionCreators.refresh(createFollowersURL(username, searchText))),
    loadMoreFollowers: (searchText, nextPage) => dispatch(followersActionCreators.refresh(createFollowersURL(username, searchText, nextPage))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
