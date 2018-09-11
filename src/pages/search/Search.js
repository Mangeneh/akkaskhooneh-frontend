import {
  Header, Icon, Input, Item,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { CustomStatusBar } from '../../components';
import TagMasonry from '../../components/TagMasonry';
import {
  Colors, Constants, Graphics, Pages, Strings,
} from '../../config';
import { strings } from '../../i18n';
import NavigationService from '../../NavigationService';
import { getSearchTopTagsNextPage, refreshSearchTopTags } from './actions';
import {
  selectSearchTopTags,
  selectSearchTopTagsIsLoading,
  selectSearchTopTagsNextPage,
  selectSearchTopTagsTotalPages,
} from './reducer';

class Search extends Component {
  state = {
    topTags: [],
  };

  componentWillMount() {
    this.props.refreshSearchTopTags()
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  componentWillReceiveProps(nextProps) {
    const topTags = nextProps.topTags.slice();
    const newTags = [];
    while (topTags.length > 0) {
      newTags.push(topTags.splice(0, 5));
    }
    this.setState({ topTags: newTags });
  }

  render() {
    return (
      <View>
        <CustomStatusBar />
        {this.renderHeader()}
        {this.rendertopTagsList()}
      </View>
    );
  }

  renderHeader() {
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
            borderRadius: Graphics.SEARCH_BOX_RADIUS,
          }}
        >
          <Input
            placeholder={strings(Strings.SEARCH_USER_OR_PIC)}
            onTouchStart={() => NavigationService.navigate(Pages.SEARCH_USER_OR_TAG)}
            onPress={() => NavigationService.navigate(Pages.SEARCH_USER_OR_TAG)}
            style={{
              textAlign: 'right',
              fontSize: Constants.ITEM_FONT_SIZE,
            }}
          />
          <Icon name="ios-search" style={{ color: Colors.BASE }} />
        </Item>
      </Header>
    );
  }

  rendertopTagsList() {
    const {
      refreshSearchTopTags, topTagsIsLoading,
    } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshSearchTopTags()}
        refreshing={topTagsIsLoading}
        onEndReached={() => this.updateTopTags()}
        style={{
          width: '100%',
          marginTop: 8,
        }}
        keyExtractor={(item, index) => index.toString()}
        data={this.state.topTags}
        renderItem={({ item, index }) => this.renderBrick(item, index)}
      />
    );
  }

  updateTopTags() {
    const {
      topTagsNextPage, topTagsTotalPages, topTagsIsLoading, getSearchTopTagsNextPage,
    } = this.props;
    if (topTagsNextPage <= topTagsTotalPages && !topTagsIsLoading) {
      getSearchTopTagsNextPage(topTagsNextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  renderBrick(item, index) {
    return <TagMasonry tags={item} />;
  }
}

const mapStateToProps = state => ({
  topTags: selectSearchTopTags(state),
  topTagsNextPage: selectSearchTopTagsNextPage(state),
  topTagsTotalPages: selectSearchTopTagsTotalPages(state),
  topTagsIsLoading: selectSearchTopTagsIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  refreshSearchTopTags: () => dispatch(refreshSearchTopTags()),
  getSearchTopTagsNextPage: topTagsNext => dispatch(getSearchTopTagsNextPage(topTagsNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
