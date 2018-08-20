import React from 'react';
import BottomNavigation, {
    IconTab
} from 'react-native-material-bottom-navigation';
import {View} from 'react-native';
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import {Icon} from "native-base";
import {Colors} from "../config/Colors";

export default class BottomNavigationTab extends React.Component {

    state = {activeTab: ""};

    tabs = [
        {
            key: 'profile',
            icon: 'movie',
            barColor: Colors.BASE,
        },
        {
            key: 'movie',
            icon: 'check',
            barColor: Colors.BASE,
        }
    ];

    renderIcon = icon => () => (
        <Icon type={"MaterialCommunityIcons"} size={24} style={{color: "white"}} name={icon}/>
    );

    renderTab = ({tab, isActive}) => (
        <IconTab
            isActive={isActive}
            key={tab.key}
            renderIcon={this.renderIcon(tab.icon)}
        />
    );

    renderTabContent = (activeTab) => {
        if (activeTab === "profile") {
            return (<Profile/>)
        } else {
            return (<Login/>)
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    {this.renderTabContent(this.state.activeTab)}
                </View>
                <BottomNavigation
                    onTabPress={newTab => this.setState({activeTab: newTab.key})}
                    renderTab={this.renderTab}
                    tabs={this.tabs}
                />
            </View>
        )
    }
}