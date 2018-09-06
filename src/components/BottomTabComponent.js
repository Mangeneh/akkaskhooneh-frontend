import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { Colors, Pages } from '../config';
import NavigationService from '../NavigationService';
import CustomStatusBar from './CustomStatusBar';

export default props => (
  <View>
    <CustomStatusBar />
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        position: 'absolute',
        zIndex: 10,
        alignSelf: 'center',
        bottom: 20,
      }}
      onPress={() => NavigationService.navigate(Pages.NEW_POST)}
    >
      <Icon
        color="white"
        name="plus"
        raised
        size={30}
        containerStyle={{ backgroundColor: Colors.ACCENT }}
        type="material-community"
      />
    </TouchableOpacity>
    <View style={{ zIndex: 1 }}>
      <MaterialTopTabBar {...props} />
    </View>
  </View>
);
