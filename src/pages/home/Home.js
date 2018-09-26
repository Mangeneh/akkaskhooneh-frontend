import LottieView from 'lottie-react-native';
import { Icon, Text } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { getPostInfo, injectNewPosts, sendLikeOrDislike } from '../../actions';
import { HomeHeader } from '../../components';
import Post from '../../components/Post';
import {
  Colors, Constants, Pages, Strings,
} from '../../config';
import { extractPostID } from '../../helpers';
import { strings } from '../../i18n';
import NavigationService from '../../NavigationService';
import {
  generatePaginatorActionCreators,
  generatePaginatorSelectors,
  PagintorActions,
} from '../../reducers/paginator';
import { createHomeURL } from '../../config/URLCreators';

class Home extends Component {
  componentWillMount() {
    this.refreshPosts();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HomeHeader
          onAddFriendsPress={() => NavigationService.navigate(Pages.ADD_FRIENDS)}
          title={strings(Strings.APP_NAME)}
        />
        {this.renderContent()}
      </View>
    );
  }

  renderNewUserFirstImpression() {
    return (
      <View style={{
        flex: 1,
        alignSelf: 'center',
      }}
      >
        <Text style={{
          fontSize: Constants.TEXT_NORMAL_SIZE,
          color: Colors.ICON,
          marginTop: 16,
          marginBottom: 8,
        }}
        >
          {strings(Strings.NEW_USER_FIRST_IMPRESSION)}
        </Text>
        <TouchableOpacity
          onPress={() => this.refreshPosts()}
          style={{
            alignSelf: 'center',
            zIndex: 10,
          }}
        >
          <Icon name="refresh" type="MaterialCommunityIcons" style={{ color: Colors.ICON }} />
        </TouchableOpacity>
        <LottieView
          source={require('../../assets/animations/moon')}
          autoPlay
          loop
          style={{ zIndex: 0 }}
        />
      </View>
    );
  }

  renderContent() {
    const { posts, isFirstFetch } = this.props;
    return (posts.length === 0 && !isFirstFetch ? this.renderNewUserFirstImpression() : this.renderFeed());
  }

  renderFeed() {
    const { refresh, isRefreshing, posts } = this.props;
    return (
      <FlatList
        onRefresh={() => refresh()}
        refreshing={isRefreshing}
        onEndReached={() => this.updatePosts()}
        style={{
          width: '100%',
          marginTop: 8,
        }}
        keyExtractor={(item, index) => item.id.toString()}
        data={posts}
        renderItem={({ item, index }) => this.renderPost(item, index)}
      />
    );
  }

  renderPost(item, index) {
    return (
      <Post
        postID={extractPostID(item)}
        margin={8}
        home
      />
    );
  }

  updatePosts() {
    const {
      nextPage, totalPages, isLoading, isRefreshing, loadMore,
    } = this.props;
    if (nextPage <= totalPages && !isLoading && !isRefreshing) {
      loadMore(nextPage);
    }
  }

  refreshPosts() {
    const { refresh, isLoading, isRefreshing } = this.props;
    if (!isLoading && !isRefreshing) {
      refresh();
    }
  }
}

const mapStateToProps = (state) => {
  const paginatorSelectors = generatePaginatorSelectors(state, 'home', '');
  const {
    selectData, selectNextPage, selectTotalPages,
    selectIsFirstFetch, selectIsRefreshing, selectIsLoading,
  } = paginatorSelectors;
  return {
    posts: selectData(state),
    nextPage: selectNextPage(state),
    totalPages: selectTotalPages(state),
    isFirstFetch: selectIsFirstFetch(state),
    isRefreshing: selectIsRefreshing(state),
    isLoading: selectIsLoading(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const onRefreshSuccess = (dispatch, data) => dispatch(injectNewPosts(data));
  const pagintorActionCreators = generatePaginatorActionCreators('home', '', onRefreshSuccess, onRefreshSuccess);
  const { refresh, loadMore } = pagintorActionCreators;
  const { nextPage } = ownProps;
  return {
    refresh: () => dispatch(refresh(createHomeURL(PagintorActions.REFRESH))),
    loadMore: () => dispatch(loadMore(createHomeURL(PagintorActions.LOAD_MORE, nextPage))),
    getPostInfo: postID => dispatch(getPostInfo(postID)),
    sendLikeOrDislike: postID => dispatch(sendLikeOrDislike(postID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
