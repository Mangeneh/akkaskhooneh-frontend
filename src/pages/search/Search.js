import {
  Header, Icon, Input, Item,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { CustomStatusBar } from '../../components';
import TagMasonry from '../../components/TagMasonry';
import { Colors, Constants, Strings } from '../../config';
import { strings } from '../../i18n';
import { getSearchTopTagsNextPage, refreshSearchTopTags } from './actions';
import {
  selectSearchTopTags,
  selectSearchTopTagsIsLoading,
  selectSearchTopTagsNextPage,
  selectSearchTopTagsTotalPages,
} from './reducer';

class Search extends Component {
  state = {
    items: [],
  };

  componentWillMount() {
    this.props.refreshSearchTopTags()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {

      });
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
      <Header style={{ backgroundColor: Colors.BASE }}>
        <Item
          rounded
          style={{
            alignSelf: 'center',
            borderRadius: Constants.TEXT_BOX_RADIUS,
            backgroundColor: 'white',
          }}
        >
          <Input
            placeholder={strings(Strings.SEARCH_USER_OR_PIC)}
            style={{
              textAlign: 'right',
              fontSize: Constants.ITEM_FONT_SIZE,
              height: 20,
            }}
          />
          <Icon name="ios-search" style={{ color: Colors.BASE }} />
        </Item>
      </Header>
    );
  }

  rendertopTagsList() {
    const {
      refreshSearchTopTags, topTagsIsLoading, topTags,
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
        keyExtractor={(item, index) => item.id}
        data={topTags}
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
    return <TagMasonry tag={item} />;
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
