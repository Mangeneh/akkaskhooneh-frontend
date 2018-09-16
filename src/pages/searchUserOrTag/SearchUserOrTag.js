import {
  Header, Icon, Input, Item, Tab, Tabs, Toast,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { ContactItem, CustomStatusBar, TagItem } from '../../components';
import {
  Colors, Constants, Graphics, Strings,
} from '../../config';
import { strings } from '../../i18n';
import {
  getSearchTags,
  getSearchUsers,
  refreshSearchTags,
  refreshSearchUsers,
  startNewSearch,
} from './actions';
import {
  selectSearchTags,
  selectSearchTagsIsLoading,
  selectSearchTagsNextPage,
  selectSearchTagsTotalPages,
  selectSearchUsers,
  selectSearchUsersIsLoading,
  selectSearchUsersNextPage,
  selectSearchUsersTotalPages,
} from './reducer';

class SearchUserOrTag extends Component {
  state = {
    searchText: '',
  };

  componentWillMount() {
    this.search('');
  }

  componentDidMount() {
    setTimeout(this.tabs.goToPage.bind(this.tabs, 1));
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
            initialPage={1}
          >
            <Tab
              heading={strings(Strings.TAGS)}
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
              }}
              >
                {this.renderTags()}
              </View>
            </Tab>
            <Tab
              heading={strings(Strings.USERS)}
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
              }}
              >
                {this.renderUsers()}
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
        <View style={{
          flexDirection: 'row',
          flex: 1,
        }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            hitSlop={Graphics.HIT_SLOP}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              marginLeft: 10,
            }}
          >
            <Icon name="arrow-left" type="MaterialCommunityIcons" style={{ color: 'white' }} />
          </TouchableOpacity>
          <View style={{ flex: 8 }}>
            <Item
              rounded
              style={{
                alignSelf: 'center',
                borderRadius: Constants.TEXT_BOX_RADIUS,
              }}
            >
              <Input
                autoFocus
                placeholder={strings(Strings.SEARCH_USER_OR_PIC)}
                style={{
                  textAlign: 'right',
                  fontSize: Constants.ITEM_FONT_SIZE,
                }}
                value={searchText}
                onChangeText={searchText => this.search(searchText)}
              />
              <Icon name="ios-search" style={{ color: Colors.BASE }} />
            </Item>
          </View>
        </View>
      </Header>
    );
  }

  renderUsers() {
    const { searchText } = this.state;
    const { refreshSearchUsers, searchUsersIsLoading, searchUsers } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshSearchUsers(searchText)}
        refreshing={searchUsersIsLoading}
        onEndReached={() => {
          this.updateUsers(searchText);
        }}
        style={{
          width: '100%',
          flex: 1,
          marginTop: 8,
        }}
        keyExtractor={(item, index) => index.toString()}
        data={searchUsers}
        renderItem={({ item, index }) => this.renderUser(item, index)}
      />
    );
  }

  renderUser(item, index) {
    return <ContactItem user={item} />;
  }

  renderTags() {
    const { searchText } = this.state;
    const { refreshSearchTags, searchTagsIsLoading, searchTags } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshSearchTags(searchText)}
        refreshing={searchTagsIsLoading}
        onEndReached={() => {
          this.updateTags(searchText);
        }}
        style={{
          width: '100%',
          marginTop: 8,
        }}
        keyExtractor={(item, index) => index.toString()}
        data={searchTags}
        renderItem={({ item, index }) => this.renderTag(item, index)}
      />
    );
  }

  renderTag(item, index) {
    return <TagItem tag={item} />;
  }

  updateUsers(text) {
    const {
      searchUsersNextPage, searchUsersTotalPages, searchUsersIsLoading, getSearchUsersNextPage,
    } = this.props;
    if (searchUsersNextPage <= searchUsersTotalPages && !searchUsersIsLoading) {
      getSearchUsersNextPage(text, searchUsersNextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  updateTags(text) {
    const {
      searchTagsNextPage, searchTagsTotalPages, searchTagsIsLoading, getSearchTagsNextPage,
    } = this.props;
    if (searchTagsNextPage <= searchTagsTotalPages && !searchTagsIsLoading) {
      getSearchTagsNextPage(text, searchTagsNextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  search(searchText) {
    const { refreshSearchUsers, refreshSearchTags } = this.props;
    this.setState({ searchText });
    refreshSearchUsers(searchText);
    refreshSearchTags(searchText)
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

const mapStateToProps = state => ({
  searchUsers: selectSearchUsers(state),
  searchUsersNextPage: selectSearchUsersNextPage(state),
  searchUsersTotalPages: selectSearchUsersTotalPages(state),
  searchUsersIsLoading: selectSearchUsersIsLoading(state),
  searchTags: selectSearchTags(state),
  searchTagsNextPage: selectSearchTagsNextPage(state),
  searchTagsTotalPages: selectSearchTagsTotalPages(state),
  searchTagsIsLoading: selectSearchTagsIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  refreshSearchUsers: text => dispatch(refreshSearchUsers(text)),
  getSearchUsersNextPage: (text, usersNext) => dispatch(getSearchUsers(text, usersNext)),
  refreshSearchTags: text => dispatch(refreshSearchTags(text)),
  getSearchTagsNextPage: (text, tagsNext) => dispatch(getSearchTags(text, tagsNext)),
  startNewSearch: () => dispatch(startNewSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserOrTag);
