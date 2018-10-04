import {
  Header, Icon, Input, Item, Tab, Tabs,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { ContactItem, CustomStatusBar, TagItem } from '../../components';
import {
  Colors, Constants, hitSlop, Strings,
} from '../../config';
import { strings } from '../../i18n';
import {
  generatePaginatorActionCreators,
  generatePaginatorSelectors,
} from '../../reducers/paginator';
import { createSearchTagsURL, createSearchUsersURL } from '../../config/URLCreators';
import { showFailureToast } from '../../helpers/Toasts';

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
              }}
              >
                {this.renderTags()}
              </View>
            </Tab>
            <Tab
              heading={strings(Strings.USERS)}
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
            placeholder={strings(Strings.SEARCH_USER_OR_TAG)}
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

  renderUsers() {
    const { searchText } = this.state;
    const { refreshUsers, usersIsLoading, users } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshUsers(searchText)}
        refreshing={usersIsLoading}
        onEndReached={() => {
          this.loadMoreUsers(searchText);
        }}
        style={{
          width: '100%',
          flex: 1,
          marginTop: 8,
        }}
        keyExtractor={(item, index) => index.toString()}
        data={users}
        renderItem={({ item }) => this.renderUser(item)}
      />
    );
  }

  renderUser(item) {
    return <ContactItem user={item} />;
  }

  renderTags() {
    const { searchText } = this.state;
    const { refreshTags, tagsIsLoading, tags } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshTags(searchText)}
        refreshing={tagsIsLoading}
        onEndReached={() => {
          this.loadMoreTags(searchText);
        }}
        style={{
          width: '100%',
          marginTop: 8,
        }}
        keyExtractor={(item, index) => index.toString()}
        data={tags}
        renderItem={({ item }) => this.renderTag(item)}
      />
    );
  }

  renderTag(item) {
    return <TagItem tag={item} />;
  }

  loadMoreUsers(text) {
    const {
      usersNextPage, usersTotalPages, usersIsLoading, loadMoreUsers,
    } = this.props;
    if (usersNextPage <= usersTotalPages && !usersIsLoading) {
      loadMoreUsers(text, usersNextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  loadMoreTags(text) {
    const {
      tagsNextPage, tagsTotalPages, tagsIsLoading, loadMoreTags,
    } = this.props;
    if (tagsNextPage <= tagsTotalPages && !tagsIsLoading) {
      loadMoreTags(text, tagsNextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  search(searchText) {
    const { refreshUsers, refreshTags } = this.props;
    this.setState({ searchText });
    refreshUsers(searchText);
    refreshTags(searchText)
      .then((response) => {
      })
      .catch((error) => {
        showFailureToast(strings(Strings.SEARCH_FAIL));
      });
  }
}

const mapStateToProps = (state) => {
  const userSelectors = generatePaginatorSelectors(state, 'search_users', '');
  const tagSelectors = generatePaginatorSelectors(state, 'search_tags', '');
  return {
    users: userSelectors.selectData(),
    usersNextPage: userSelectors.selectNextPage(),
    usersTotalPages: userSelectors.selectTotalPages(),
    usersIsFirstFetch: userSelectors.selectIsFirstFetch(),
    usersIsRefreshing: userSelectors.selectIsRefreshing(),
    usersIsLoading: userSelectors.selectIsLoading(),
    tags: tagSelectors.selectData(),
    tagsNextPage: tagSelectors.selectNextPage(),
    tagsTotalPages: tagSelectors.selectTotalPages(),
    tagsIsFirstFetch: tagSelectors.selectIsFirstFetch(),
    tagsIsRefreshing: tagSelectors.selectIsRefreshing(),
    tagsIsLoading: tagSelectors.selectIsLoading(),
  };
};

const mapDispatchToProps = (dispatch) => {
  const usersActionCreators = generatePaginatorActionCreators('search_users', '');
  const tagsActionCreators = generatePaginatorActionCreators('search_tags', '');
  return {
    refreshUsers: searchText => dispatch(usersActionCreators.refresh(createSearchUsersURL(searchText))),
    loadMoreUsers: (searchText, nextPage) => dispatch(usersActionCreators.loadMore(createSearchUsersURL(searchText, nextPage))),
    refreshTags: searchText => dispatch(tagsActionCreators.refresh(createSearchTagsURL(searchText))),
    loadMoreTags: (searchText, nextPage) => dispatch(tagsActionCreators.loadMore(createSearchTagsURL(searchText, nextPage))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserOrTag);
