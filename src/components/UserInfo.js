import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import Fonts from "../config/Fonts";

class UserInfo extends Component {

    render() {
        return (
            <View style={{height: 80, flexDirection: 'row', alignItems: 'flex-start'}}>
                <View style={{flex: 1, alignItems: 'flex-end', marginRight: 16}}>
                    {this.renderName()}
                    {this.renderFollowStatus()}
                    <Text style={styles.description}>{this.props.description}</Text>
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

    renderFollowStatus() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                <TouchableOpacity>
                    <Text style={{marginRight: 16, fontFamily: Fonts.NORMAL_FONT, fontSize: 12}}>30 دنبال
                        شده</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontFamily: Fonts.NORMAL_FONT, fontSize: 12}}>30 دنبال کننده</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderName() {
        return (
            <Text style={styles.name}>
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    name: {flex: 1, fontFamily: Fonts.NORMAL_FONT, fontSize: 14, marginBottom: 4},
    description: {flex: 1, marginBottom: 12, fontFamily: Fonts.NORMAL_FONT, fontSize: 10},

});

export default UserInfo;