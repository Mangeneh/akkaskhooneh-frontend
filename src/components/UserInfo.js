import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import Fonts from "../config/Fonts";

class UserInfo extends Component {

    render() {
        const {description, name,} = this.props;
        return (
            <View style={{height: 80, flexDirection: 'row', alignItems: 'flex-start'}}>
                <View style={{flex: 1, alignItems: 'flex-end', marginRight: 16}}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <TouchableOpacity>
                            <Text style={{marginRight: 16, fontFamily: Fonts.NORMAL_FONT, fontSize: 12}}>30 دنبال
                                شده</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{fontFamily: Fonts.NORMAL_FONT, fontSize: 12}}>30 دنبال کننده</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.description}>{description}</Text>
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
    description: {flex: 1, marginBottom: 12, fontFamily: Fonts.NORMAL_FONT, fontSize: 10},

});

const mapStateToProps = (state, ownProps) => {
    
};

export default connect()(UserInfo);