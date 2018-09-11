import {
  Header, Icon, Input, Item, Tab, Tabs, Toast,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { ContactItem, CustomStatusBar } from '../../components';
import { Colors, Constants, Strings } from '../../config';
import { strings } from '../../i18n';
import {
  getSearchFollowers,
  getSearchFollowings,
  refreshSearchFollowers,
  refreshSearchFollowings,
  startNewSearch,
} from './actions';
import {
  selectSearchFollowers,
  selectSearchFollowersIsLoading,
  selectSearchFollowersNextPage,
  selectSearchFollowersTotalPages,
  selectSearchFollowings,
  selectSearchFollowingsIsLoading,
  selectSearchFollowingsNextPage,
  selectSearchFollowingsTotalPages,
} from './reducer';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.updateFollowings('');
    this.updateFollowers('');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <CustomStatusBar />
          {this.renderHeader()}
        </View>
        <View style={{ flex: 1 }}>
          <Tabs
            ref={(component) => {
              this.tabs = component;
            }}
            tabBarUnderlineStyle={{ backgroundColor: Colors.ACCENT }}
            initialPage={1}
            locked
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
        <Item
          rounded
          style={{
            alignSelf: 'center',
            borderRadius: Constants.TEXT_BOX_RADIUS,
          }}
        >
          <Input
            placeholder={strings(Strings.SEARCH_USER)}
            style={{
              textAlign: 'right',
              fontSize: Constants.ITEM_FONT_SIZE,
            }}
            value={searchText}
            onChangeText={(searchText) => {
              this.setState({ searchText });
              this.props.refreshSearchFollowings(searchText);
              this.props.refreshSearchFollowers(searchText)
                .then((response) => {
                  console.warn(response);
                })
                .catch((error) => {
                  Toast.show({
                    text: strings(Strings.SEARCH_FAIL),
                    textStyle: { textAlign: 'center' },
                    position: 'bottom',
                    type: 'danger',
                  });
                });
            }}
          />
          <Icon name="ios-search" style={{ color: Colors.BASE }} />
        </Item>
      </Header>
    );
  }

  renderFollowings() {
    const { searchText } = this.state;
    const { refreshSearchFollowings, searchFollowingsIsLoading, searchFollowings } = this.props;
    console.warn(searchFollowingsIsLoading);
    return (
      <FlatList
        // onRefresh={() => refreshSearchFollowings(searchText)}
        // refreshing={searchFollowingsIsLoading}
        onEndReached={() => {
          this.updateFollowings(searchText);
        }}
        style={{
          width: '100%',
          flex: 1,
          marginTop: 8,
        }}
        keyExtractor={(item, index) => index.toString()}
        data={searchFollowings}
        renderItem={({ item, index }) => this.renderFollowing(item, index)}
      />
    );
  }

  renderFollowing(item, index) {
    console.warn('hey there');
    return <ContactItem user={item} />;
  }

  updateFollowings(text) {
    const {
      searchFollowingsNextPage, searchFollowingsTotalPages, searchFollowingsIsLoading, getSearchFollowingsNextPage,
    } = this.props;
    if (searchFollowingsNextPage <= searchFollowingsTotalPages && !searchFollowingsIsLoading) {
      getSearchFollowingsNextPage(text, searchFollowingsNextPage)
        .then((response) => {
          // console.warn(response);
        })
        .catch((error) => {
          // console.warn(error);
        });
    }
  }

  renderFollowers() {
    const { searchText } = this.state;
    const { refreshSearchFollowers, searchFollowersIsLoading, searchFollowers } = this.props;
    console.warn(searchFollowersIsLoading);
    return (
      <FlatList
        // onRefresh={() => refreshSearchFollowers(searchText)}
        // refreshing={searchFollowersIsLoading}
        onEndReached={() => {
          this.updateFollowers(searchText);
        }}
        style={{
          width: '100%',
          marginTop: 8,
        }}
        keyExtractor={(item, index) => index.toString()}
        data={searchFollowers}
        renderItem={({ item, index }) => this.renderFollower(item, index)}
      />
    );
  }

  renderFollower(item, index) {
    return <ContactItem user={item} />;
  }

  updateFollowers(text) {
    const {
      searchFollowersNextPage, searchFollowersTotalPages, searchFollowersIsLoading, getSearchFollowersNextPage,
    } = this.props;
    if (searchFollowersNextPage <= searchFollowersTotalPages && !searchFollowersIsLoading) {
      getSearchFollowersNextPage(text, searchFollowersNextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }
}

const mapStateToProps = state => ({
  searchFollowings: selectSearchFollowings(state),
  searchFollowingsNextPage: selectSearchFollowingsNextPage(state),
  searchFollowingsTotalPages: selectSearchFollowingsTotalPages(state),
  searchFollowingsIsLoading: selectSearchFollowingsIsLoading(state),
  searchFollowers: selectSearchFollowers(state),
  searchFollowersNextPage: selectSearchFollowersNextPage(state),
  searchFollowersTotalPages: selectSearchFollowersTotalPages(state),
  searchFollowersIsLoading: selectSearchFollowersIsLoading(state),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const username = ownProps.navigation.getParam('username');
  return {
    refreshSearchFollowings: text => dispatch(refreshSearchFollowings(text, username)),
    getSearchFollowingsNextPage: (text, followingsNext) => dispatch(getSearchFollowings(text, followingsNext, username)),
    refreshSearchFollowers: text => dispatch(refreshSearchFollowers(text, username)),
    getSearchFollowersNextPage: (text, followersNext) => dispatch(getSearchFollowers(text, followersNext, username)),
    startNewSearch: () => dispatch(startNewSearch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
