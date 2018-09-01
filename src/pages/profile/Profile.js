import React, {Component} from 'react';
import {Container, Tab, Tabs} from 'native-base';
import {View, Image, FlatList, ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Strings} from '../../config';
import {ProfileHeader, SelfProfileInfo, CustomStatusBar} from '../../components';
import {getPhotosNextPage} from './actions';

const WIDTH = Dimensions.get('window').width;

class Profile extends Component {
    componentDidMount() {
        setTimeout(this._tabs.goToPage.bind(this._tabs, 1));
        this.updatePhotos();
    }

    render() {
        const {PHOTOS, INTERESTS} = Strings;
        return (
            <Container>
                <CustomStatusBar/>
                <ProfileHeader username={this.props.username} onEditPress={this.onEditPress.bind(this)}
                               onSettingsPress={this.onSettingsPress.bind(this)}/>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                    <View style={{marginTop: 16, marginRight: 16, marginBottom: 8}}>
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
                            <View style={{backgroundColor: Colors.WHITE_BACK, flex: 1}}>
                                {(this.props.isLoading) ? (<ActivityIndicator size="large"/>) : (
                                    <FlatList
                                        onEndReached={() => this.updatePhotos()}
                                        style={{width: '100%', marginTop: 8}}
                                        numColumns={2}
                                        keyExtractor={(item, index) => item.id}
                                        data={this.props.photos}
                                        renderItem={({item, index}) => this.renderPhoto(item, index)}
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

    renderPhoto(item, index) {
        return (
            <View style={index % 2 === 0 ? styles.evenPhoto : styles.oddPhoto}>
                <Image source={{uri: item.picture}} resizeMode={'stretch'}
                       style={{width: WIDTH / 2 - 12, height: WIDTH / 2 - 12}}/>
            </View>
        );
    }

    updatePhotos() {
        if (!this.props.fetchStatus) {
            this.props.getPhotosNextPage(this.props.photosNext);
        }
    }

    onEditPress() {
        this.props.navigation.navigate('ProfileEdit');
    }

    onSettingsPress() {
        this.props.navigation.navigate('ProfileSettings');
    }
}

const styles = StyleSheet.create({
    evenPhoto: {
        justifyContent: 'flex-start',
        marginRight: 4,
        marginLeft: 8,
        marginBottom: 8,
        borderRadius: 10,
        overflow: 'hidden'
    },
    oddPhoto: {
        justifyContent: 'flex-start',
        marginBottom: 8,
        marginRight: 8,
        marginLeft: 4,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

const mapStateToProps = (state) => ({
    username: state.userInfo.user.username,
    photos: state.profilePage.photos,
    photosNext: state.profilePage.photosNext,
    isLoading: state.profilePage.isLoading,
    fetchStatus: state.profilePage.fetchStatus
});

const mapDispatchToProps = (dispatch) => ({
    getPhotosNextPage: (photosNext) => dispatch(getPhotosNextPage(photosNext))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);