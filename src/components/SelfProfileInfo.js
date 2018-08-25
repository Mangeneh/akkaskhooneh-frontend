import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import Fonts from "../config/Fonts";
import {Strings} from "../config/Strings";

class SelfProfileInfo extends Component {

    render() {
        const {bio, name, followers, following} = this.props.user;
        return (
            <View style={{height: 80, flexDirection: 'row', alignItems: 'flex-start'}}>
                <View style={{flex: 1, alignItems: 'flex-end', marginRight: 16}}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <TouchableOpacity>
                            <Text style={{
                                marginRight: 16,
                                fontFamily: Fonts.NORMAL_FONT,
                                fontSize: 12
                            }}>{`${Strings.FOLLOWING} ${following}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{
                                fontFamily: Fonts.NORMAL_FONT,
                                fontSize: 12
                            }}>{`${Strings.FOLLOWER} ${followers}`}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.description}>{bio}</Text>
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
    name: {flex: 1, fontFamily: Fonts.NORMAL_FONT, fontSize: 14, marginBottom: 4},
    bio: {flex: 1, marginBottom: 12, fontFamily: Fonts.NORMAL_FONT, fontSize: 10},
});

const mapStateToProps = (state, ownProps) => ({
    user: state.userInfo.user
});

export default connect(mapStateToProps, null)(SelfProfileInfo);