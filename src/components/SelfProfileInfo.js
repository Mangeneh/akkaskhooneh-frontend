import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {Strings, Fonts} from '../config';

class SelfProfileInfo extends Component {
    render() {
        const {bio, fullname, followers, following} = this.props.user;
        return (
            <View style={{height: 80, flexDirection: 'row', alignItems: 'flex-start'}}>
                <View style={styles.textArea}>
                    <Text style={styles.name}>{fullname}</Text>
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
                source={{uri: this.props.user.avatar}}
            />
        );
    }
}

const styles = StyleSheet.create({
    name: {
        flex: 1,
        fontFamily: Fonts.NORMAL_FONT,
        fontSize: 14
    },
    bio: {
        flex: 1,
        fontFamily: Fonts.NORMAL_FONT,
        fontSize: 10,
        marginBottom: 12
    },
    textArea: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginRight: 16,
        marginBottom: 4
    }
});

const mapStateToProps = (state) => ({
    user: state.userInfo.user
});

export default connect(mapStateToProps, null)(SelfProfileInfo);