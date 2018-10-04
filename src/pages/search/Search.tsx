import { Header, Icon, Input, Item, } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { CustomStatusBar } from '../../components';
import Loading from '../../components/Loading';
import TagMasonry from '../../components/TagMasonry';
import { Colors, Constants, Graphics, Pages, Strings, } from '../../config';
import { createTopTagsURL } from '../../config/URLCreators';
import { strings } from '../../i18n';
import {
  generatePaginatorActionCreators,
  generatePaginatorSelectors,
} from '../../reducers/paginator';
import { ITag } from '../../types/api';

export interface IProps {
  navigation: NavigationScreenProp;
  topTags: ITag[];
  nextPage: number;
  totalPages: number;
  isFirstFetch: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  refresh: any;
  loadMore: any;
}

interface IState {
  topTags: ITag[];
}

class Search extends Component<IProps, IState> {

  constructor (props) {
    super(props);
    this.state = {
      topTags: [],
    };
    this.loadMore = this.loadMore.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  public componentWillMount () {
    this.refresh();
  }

  public componentWillReceiveProps (nextProps) {
    const topTags = nextProps.topTags.slice();
    const newTags = [];
    while (topTags.length > 0) {
      newTags.push(topTags.splice(0, 5));
    }
    this.setState({ topTags: newTags });
  }

  public render () {
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar/>
        {this.renderHeader()}
        {this.renderTopTagsList()}
      </View>
    );
  }

  private renderHeader () {
    const { navigation } = this.props;
    return (
      <Header
        androidStatusBarColor={Colors.BASE}
        searchBar
        style={{ backgroundColor: Colors.BASE }}
      >
        <CustomStatusBar/>
        <Item
          rounded
          style={{
            alignSelf: 'center',
            borderRadius: Graphics.SEARCH_BOX_RADIUS,
          }}
        >
          <Input
            placeholder={strings(Strings.SEARCH_USER_OR_TAG)}
            onTouchStart={() => navigation.navigate(Pages.SEARCH_USER_OR_TAG)}
            style={{
              textAlign: 'right',
              fontSize: Constants.ITEM_FONT_SIZE,
            }}
          />
          <Icon name="ios-search" style={{ color: Colors.ICON }}/>
        </Item>
      </Header>
    );
  }

  private renderTopTagsList () {
    const { isRefreshing, isFirstFetch } = this.props;
    const { topTags } = this.state;
    return (!isFirstFetch
        ? (
          <FlatList
            onRefresh={this.refresh}
            refreshing={isRefreshing}
            onEndReached={this.loadMore}
            style={{
              width: '100%',
              marginTop: 8,
            }}
            keyExtractor={(item, index) => index.toString()}
            data={topTags}
            renderItem={({ item }) => this.renderBrick(item)}
          />
        ) : <Loading/>
    );
  }

  private refresh () {
    const { isLoading, isRefreshing, refresh } = this.props;
    if (!isLoading && !isRefreshing) {
      refresh()
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  private loadMore () {
    const {
      nextPage, totalPages, isLoading, loadMore, isRefreshing,
    } = this.props;
    if (nextPage <= totalPages && !isLoading && !isRefreshing) {
      loadMore(nextPage)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  private renderBrick (item) {
    return <TagMasonry tags={item}/>;
  }
}

const mapStateToProps = (state) => {
  const paginatorSelectors = generatePaginatorSelectors(state, 'top_tags', '');
  const {
    selectData, selectNextPage, selectTotalPages,
    selectIsFirstFetch, selectIsRefreshing, selectIsLoading,
  } = paginatorSelectors;
  return {
    topTags: selectData(),
    nextPage: selectNextPage(),
    totalPages: selectTotalPages(),
    isFirstFetch: selectIsFirstFetch(),
    isRefreshing: selectIsRefreshing(),
    isLoading: selectIsLoading(),
  };
};

const mapDispatchToProps = (dispatch) => {
  const paginatorActionCreators = generatePaginatorActionCreators('top_tags', '');
  const { refresh, loadMore } = paginatorActionCreators;
  return {
    refresh: () => dispatch(refresh(createTopTagsURL())),
    loadMore: nextPage => dispatch(loadMore(createTopTagsURL(nextPage))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
