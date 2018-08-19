import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';

class RoundAvatar extends Component {

    render() {
        return (
            <Avatar
                large
                rounded
                containerStyle={this.props.style}
                title={"Hello"}
                source={{uri: "https://cdn.dribbble.com/users/61921/screenshots/4724856/dribbble.png"}}
                onPress={() => console.warn("Works!")}
                activeOpacity={0.7}
            />
        );
    }
}

export default RoundAvatar;