import React, {Component} from 'react';
import {Container, Tab, Tabs} from 'native-base';
import {View, StatusBar, Image, FlatList, ActivityIndicator, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import NavigationService from '../../NavigationService';
import {Colors, Fonts, Strings} from '../../config';
import {ProfileHeader, SelfProfileInfo} from '../../components';
import {getPhotosNextPage} from './actions';

const WIDTH = Dimensions.get('window').width;

class Profile extends Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        setTimeout(this._tabs.goToPage.bind(this._tabs, 1));
        this.props.getPhotosNextPage(this.props.photosNext);
    }

    render() {
        const {PHOTOS, INTERESTS} = Strings;
        return (
            <Container>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={Colors.BASE}
                />
                <ProfileHeader username={this.props.username} onEditPress={this.onEditPress.bind(this)}
                               onSettingsPress={this.onSettingsPress.bind(this)}/>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                    <View style={{marginTop: 16, marginRight: 16, marginBottom: 40}}>
                        <SelfProfileInfo/>
                    </View>
                    <Tabs ref={component => this._tabs = component}
                          tabBarUnderlineStyle={{backgroundColor: Colors.ACCENT}} initialPage={1}>
                        <Tab heading={INTERESTS}
                             activeTextStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Fonts.NORMAL_FONT}}
                             textStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Fonts.NORMAL_FONT}}
                             tabStyle={{backgroundColor: 'white'}}
                             activeTabStyle={{backgroundColor: 'white'}}>
                        </Tab>

                        <Tab heading={PHOTOS}
                             activeTextStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Fonts.NORMAL_FONT}}
                             textStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Fonts.NORMAL_FONT}}
                             activeTabStyle={{backgroundColor: 'white'}}
                             tabStyle={{backgroundColor: 'white'}}>
                            <View>
                                {(this.props.isLoading) ? (<ActivityIndicator size="large"/>) : (
                                    <FlatList
                                        onEndReached={() => this.props.getPhotosNextPage(this.props.photosNext)}
                                        style={{width: '100%'}}
                                        numColumns={2}
                                        keyExtractor={(item, index) => item.id}
                                        data={this.props.photos}
                                        renderItem={({item, index}) => (
                                            <View style={{
                                                justifyContent: 'center',
                                                flex: 1,
                                                alignItems: 'center',
                                                margin: 4,
                                                borderRadius: 4
                                            }}>
                                                <Image source={{uri: item.picture}} resizeMode={'stretch'}
                                                       style={{width: WIDTH / 2, height: WIDTH / 2, borderRadius: 4}}/>
                                            </View>
                                        )}
                                    />
                                )
                                }
                            </View>
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        );
    }

    onEditPress() {
        NavigationService.navigate('ProfileEdit');
    }

    onSettingsPress() {
        this.props.navigation.navigate('ProfileSettings');
    }
}

const mapStateToProps = (state) => ({
    username: state.userInfo.user.username,
    photos: state.profilePage.photos,
    photosNext: state.profilePage.photosNext,
    isLoading: state.profilePage.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    getPhotosNextPage: (photosNext) => dispatch(getPhotosNextPage(photosNext))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);