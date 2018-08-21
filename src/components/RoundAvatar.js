import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';

class RoundAvatar extends Component {
    render() {
        const {uri, style, onPress, large, xlarge} = this.props;
        return (
            <Avatar
                large={large}
                xlarge={xlarge}
                rounded
                containerStyle={style}
                source={{uri}}
                onPress={onPress}
            />
        );
    }
}

export default RoundAvatar;