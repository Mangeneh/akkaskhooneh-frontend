import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import Fonts from "../config/Fonts";
import {Strings} from "../config/Strings";

class SelfProfileInfo extends Component {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        const {bio, name, followers, following} = this.props.user;
        return (
            <View style={{height: 80, flexDirection: 'row', alignItems: 'flex-start'}}>
                <View
                    style={{alignItems: 'flex-end', marginRight: 16, justifyContent: 'space-between', marginBottom: 4}}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <TouchableOpacity>
                            <Text style={{
                                marginRight: 16,
                                fontFamily: Fonts.NORMAL_FONT,
                                fontSize: 12
                            }}>{`${following} ${Strings.FOLLOWING}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{
                                fontFamily: Fonts.NORMAL_FONT,
                                fontSize: 12
                            }}>{`${followers} ${Strings.FOLLOWER}`}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.bio}>{bio}</Text>
                </View>
                {this.renderAvatar()}
            </View>
        );
    }

    renderAvatar() {
        return (
            <Avatar
                height={80}
                width={80}
                rounded
                source={{uri: 'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Chrome-icon.png'}}
            />
        );
    }
}

const styles = StyleSheet.create({
    name: {flex: 1, fontFamily: Fonts.NORMAL_FONT, fontSize: 14},
    bio: {flex: 1, marginBottom: 12, fontFamily: Fonts.NORMAL_FONT, fontSize: 10},
});

const mapStateToProps = (state) => ({
    user: state.userInfo.user
});

export default connect(mapStateToProps, null)(SelfProfileInfo);