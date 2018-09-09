import React, { Component } from 'react';
import Masonry from 'react-native-masonry';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { View, Item, Icon, Input, Content, Header, Container, Image } from 'native-base';
import { CustomStatusBar, BackHeader } from '../../components';
import {
  Colors, Constants, Pages, Strings,
} from '../../config';
import { strings } from '../../i18n';
import {
  selectSearchPhotos,
  selectSearchPhotosNextPage,
  selectSearchPhotosTotalPages,
  selectSearchPhotosIsLoading,
} from './reducer';
import { refreshSearchPhotos, getSearchPhotosNextPage } from './actions';

class Search extends Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none',
  }

  state = {
    items: [],
  };

  componentWillMount() {
    this.props.refreshSearchPhotos()
      .then((response) => {
        console.warn(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    return (
      <Container>
        <CustomStatusBar />
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
        <Content>
          {this.renderPostsList()}
          <Masonry
            sorted// optional - Default: false
            columns={2} // optional - Default: 2
            bricks={this.state.items}
          />
        </Content>
      </Container>
    );
  }

  renderPostsList() {
    const {
      refreshSearchPhotos, postsIsLoading, posts,
    } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshSearchPhotos()}
        refreshing={postsIsLoading}
        onEndReached={() => this.updatePosts()}
        style={{
          width: '100%',
          marginTop: 8,
        }}
        keyExtractor={(item, index) => item.id}
        data={posts}
        renderItem={({ item, index }) => this.renderPost(item, index)}
      />
    );
  }

  renderPost(item, index) {
    const items = [...this.state.items, `uri: ${item.picture}`];
    this.setState({ items });
    console.warn(this.state.items);
  }

  updatePosts() {
    const {
      postsNextPage, postsTotalPages, postsIsLoading, getSearchPhotosNextPage,
    } = this.props;
    if (postsNextPage <= postsTotalPages && !postsIsLoading) {
      getSearchPhotosNextPage(postsNextPage)
        .then((response) => {
          console.warn('SUCCESS');
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }
}

const mapStateToProps = state => ({
  posts: selectSearchPhotos(state),
  postsNextPage: selectSearchPhotosNextPage(state),
  postsTotalPages: selectSearchPhotosTotalPages(state),
  postsIsLoading: selectSearchPhotosIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  refreshSearchPhotos: () => dispatch(refreshSearchPhotos()),
  getSearchPhotosNextPage: postsNext => dispatch(getSearchPhotosNextPage(postsNext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
