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
  import {
    selectSelfUsername
  } from '../../reducers/UserInfoReducer'
  
  class ContactList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchText: '',
      };
      this.updateFollowings(this.state.searchText);
      this.updateFollowers(this.state.searchText);
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
      const { username } = this.props;
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
                this.props.refreshSearchFollowings(searchText, username);
                this.props.refreshSearchFollowers(searchText, username)
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
              }}
            />
            <Icon name="ios-search" style={{ color: Colors.BASE }} />
          </Item>
        </Header>
      );
    }
  
    renderFollowings() {
      const { searchText } = this.state;
      const { refreshSearchFollowings, searchFollowingsIsLoading, searchFollowings, username } = this.props;
      return (
        <FlatList
          onRefresh={() => refreshSearchFollowings(searchText, username)}
          refreshing={searchFollowingsIsLoading}
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
  
    renderUFollowing(item, index) {
      return <ContactItem user={item} />;
    }
  
    updateFollowings(text) {
      const {
        searchFollowingsNextPage, searchFollowingsTotalPages, searchFollowingsIsLoading, getSearchFollowingsNextPage, username
      } = this.props;
      if (searchFollowingsNextPage <= searchFollowingsTotalPages && !searchFollowingsIsLoading) {
        getSearchFollowingsNextPage(text, searchFollowingsNextPage, username)
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
      const { refreshSearchFollowers, searchFollowersIsLoading, searchFollowers, username } = this.props;
      return (
        <FlatList
          onRefresh={() => refreshSearchFollowers(searchText, username)}
          refreshing={searchFollowersIsLoading}
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
        searchFollowersNextPage, searchFollowersTotalPages, searchFollowersIsLoading, getSearchFollowersNextPage, username
      } = this.props;
      if (searchFollowersNextPage <= searchFollowersTotalPages && !searchFollowersIsLoading) {
        getSearchFollowersNextPage(text, searchFollowersNextPage, username)
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
    selfUsername: selectSelfUsername(state),
  });
  
  const mapDispatchToProps = dispatch => ({
    refreshSearchFollowings: (text, username) => dispatch(refreshSearchFollowings(text, username)),
    getSearchFollowingsNextPage: (text, followingsNext, username) => dispatch(getSearchFollowings(text, followingsNext, username)),
    refreshSearchFollowers: (text, username) => dispatch(refreshSearchFollowers(text, username)),
    getSearchFollowersNextPage: (text, followersNext, username) => dispatch(getSearchFollowers(text, followersNext, username)),
    startNewSearch: () => dispatch(startNewSearch()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
  