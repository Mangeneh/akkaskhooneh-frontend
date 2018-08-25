import React, {Component} from 'react';
import {Button, Text, Icon, Spinner} from 'native-base';
import {View} from 'react-native';
import {Fonts} from '../config';

export default class SpinnerButton extends Component {
    render() {
        const {disabled, onPress, style} = this.props;
        return (
            <Button onPress={onPress}
                    block
                    style={style}
                    disabled={disabled}>
                {this.renderButtonContent()}
            </Button>
        );
    }

    renderButtonContent() {
        const {text, icon, loading} = this.props;
        if (loading) {
            return (<Spinner color='white'/>)
        } else {
            return (
                <View style={{flexDirection: 'row'}}>
                    <Icon type={'MaterialCommunityIcons'} name={icon}/>
                    <Text style={{fontFamily: Fonts.NORMAL_FONT}}>{text}</Text>
                </View>
            )
        }
    }
}