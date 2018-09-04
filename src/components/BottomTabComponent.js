import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MaterialTopTabBar} from 'react-navigation-tabs';
import {Icon} from "react-native-elements";
import {Colors} from "../config";

export default props => (
    <View>
        <TouchableOpacity activeOpacity={0.8}
                          style={{position: 'absolute', zIndex: 10, alignSelf: 'center', bottom: 20}}
                          onPress={() => this.props.navigation.navigate('NewPost')}>
            <Icon
                color={'white'}
                name={'plus'}
                raised
                size={30}
                containerStyle={{backgroundColor: Colors.ACCENT}}
                type={'material-community'}
            />
        </TouchableOpacity>
        <View style={{zIndex: 1}}>
            <MaterialTopTabBar {...props}/>
        </View>
    </View>
);