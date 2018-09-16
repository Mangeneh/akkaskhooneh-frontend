import LottieView from 'lottie-react-native';
import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import {
  getHomePostsNextPage,
  getPostInfo,
  refreshHomePosts,
  sendLikeOrDislike,
} from '../../actions';
import { HomeHeader } from '../../components';
import Post from '../../components/Post';
import { Colors, Constants, Graphics, Pages, Strings } from '../../config';
import { extractPostID } from '../../helpers';
import { strings } from '../../i18n';
import NavigationService from '../../NavigationService';
import {
  selectHomePosts,
  selectHomePostsIsFirstFetch,
  selectHomePostsIsLoading,
  selectHomePostsIsRefreshing,
  selectHomePostsNextPage,
  selectHomePostsTotalPages,
} from '../../reducers/PostsReducer';

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
        <Button
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
            zIndex: 10,
          }}
          onPress={() => this.props.navigation.navigate(Pages.ADD_FRIENDS)}
        >
          <Text style={{
            fontSize: Constants.TEXT_NORMAL_SIZE,
            color: Colors.ICON,
          }}
          >
            {strings(Strings.INVITE_FRIENDS)}
          </Text>
        </Button>
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
    const {
      posts, postsIsFirstFetch,
    } = this.props;
    return (posts.length === 0 && !postsIsFirstFetch ? this.renderNewUserFirstImpression() : this.renderFeed());
  }

  renderFeed() {
    const {
      refreshHomePosts, postsIsRefreshing, posts,
    } = this.props;
    return (
      <FlatList
        onRefresh={() => refreshHomePosts()}
        refreshing={postsIsRefreshing}
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
      postsNextPage, postsTotalPages, postsIsLoading, postsIsRefreshing, getPostsNextPage,
    } = this.props;
    if (postsNextPage <= postsTotalPages && !postsIsLoading && !postsIsRefreshing) {
      getPostsNextPage(postsNextPage);
    }
  }

  refreshPosts() {
    const {
      refreshHomePosts, postsIsLoading, postsIsRefreshing,
    } = this.props;
    if (!postsIsLoading && !postsIsRefreshing) {
      refreshHomePosts();
    }
  }
}

const mapStateToProps = state => ({
  posts: selectHomePosts(state),
  postsNextPage: selectHomePostsNextPage(state),
  postsTotalPages: selectHomePostsTotalPages(state),
  postsIsRefreshing: selectHomePostsIsRefreshing(state),
  postsIsFirstFetch: selectHomePostsIsFirstFetch(state),
  postsIsLoading: selectHomePostsIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  refreshHomePosts: () => dispatch(refreshHomePosts()),
  getPostsNextPage: postsNext => dispatch(getHomePostsNextPage(postsNext)),
  getPostInfo: postID => dispatch(getPostInfo(postID)),
  sendLikeOrDislike: postID => dispatch(sendLikeOrDislike(postID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
