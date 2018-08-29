import React, {Component} from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import NavigationService from '../../NavigationService';
import {Strings} from '../../config';
import {CustomStatusBar} from '../../components';

const WIDTH = Dimensions.get('window').width;

class Profile extends Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        setTimeout(this._tabs.goToPage.bind(this._tabs, 1));
        this.updatePhotos();
    }

    render() {
        const {} = Strings;
        return (
            <CustomStatusBar/>

        );
    }

    renderPhoto(item, index) {
        return (
            <View style={index % 2 === 0 ? styles.evenPhoto : styles.oddPhoto}>
                <Image source={{uri: item.picture}} resizeMode={'stretch'}
                       style={{width: WIDTH / 2, height: WIDTH / 2}}/>
            </View>
        );
    }

    updatePhotos() {
        if (!this.props.fetchStatus) {
            this.props.getPhotosNextPage(this.props.photosNext);
        }
    }

    onEditPress() {
        NavigationService.navigate('ProfileEdit');
    }

    onSettingsPress() {
        NavigationService.navigate('ProfileSettings');
    }
}

const styles = StyleSheet.create({
    evenPhoto: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        marginRight: 4,
        marginLeft: 8,
        marginBottom: 8,
        borderRadius: 10,
        overflow: 'hidden'
    },
    oddPhoto: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
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