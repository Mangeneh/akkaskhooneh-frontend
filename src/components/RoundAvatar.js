import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';

class RoundAvatar extends Component {
    render() {
        const {uri, style, onPress} = this.props;
        return (
            <Avatar
                large
                rounded
                containerStyle={style}
                source={{uri}}
                onPress={onPress}
            />
        );
    }
}

export default RoundAvatar;