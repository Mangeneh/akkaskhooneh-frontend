import React, { Component } from 'react';
import Masonry from 'react-native-masonry';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { View, Item, Icon, Input, Content, Header, Container } from 'native-base';
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
  static navigationOptions= {
    header: null,
    headerMode: 'none',
  }
  render() {
    return (
      <Container>
        <CustomStatusBar />
        <Header style={{backgroundColor: Colors.BASE}}>
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
          <Masonry
            sorted// optional - Default: false
            columns={2} // optional - Default: 2
            bricks={[
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo2ZXx2XeHvYwYlLUo9ycRNpwZ9U_m-Et1Q5dBlgC8E22SLRb4wg' },
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVbpnIHeHoAelQ6pCmR3iyFsVt7uDgT9tSmjS31KaFl0I_SzSI' },
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuvRNEfhZnTIK1jX2q-qKBEBxS4fywAITvGs4bDqc04P1zIuEM0g' },        
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo2ZXx2XeHvYwYlLUo9ycRNpwZ9U_m-Et1Q5dBlgC8E22SLRb4wg' },
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVbpnIHeHoAelQ6pCmR3iyFsVt7uDgT9tSmjS31KaFl0I_SzSI' },
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuvRNEfhZnTIK1jX2q-qKBEBxS4fywAITvGs4bDqc04P1zIuEM0g' },        
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo2ZXx2XeHvYwYlLUo9ycRNpwZ9U_m-Et1Q5dBlgC8E22SLRb4wg' },
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVbpnIHeHoAelQ6pCmR3iyFsVt7uDgT9tSmjS31KaFl0I_SzSI' },
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuvRNEfhZnTIK1jX2q-qKBEBxS4fywAITvGs4bDqc04P1zIuEM0g' },        
            ]}
          />
        </Content>
      </Container>
    );
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
