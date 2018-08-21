import React, {Component} from 'react';
import {Container, Tab, Tabs, Text} from 'native-base';
import {TouchableOpacity, View, StyleSheet, StatusBar} from 'react-native';
import {Strings} from '../config/Strings';
import {Colors} from "../config/Colors";
import Constants from "../config/Constants";
import RoundAvatar from "../components/RoundAvatar";
import ProfileHeader from "../components/ProfileHeader";
import GridView from 'react-native-super-grid';

const items = [
    {name: 'TURQUOISE', code: '#1abc9c'}, {name: 'EMERALD', code: '#2ecc71'},
    {name: 'PETER RIVER', code: '#3498db'}, {name: 'AMETHYST', code: '#9b59b6'},
    {name: 'WET ASPHALT', code: '#34495e'}, {name: 'GREEN SEA', code: '#16a085'},
    {name: 'NEPHRITIS', code: '#27ae60'}, {name: 'BELIZE HOLE', code: '#2980b9'},
    {name: 'WISTERIA', code: '#8e44ad'}, {name: 'MIDNIGHT BLUE', code: '#2c3e50'},
    {name: 'SUN FLOWER', code: '#f1c40f'}, {name: 'CARROT', code: '#e67e22'},
    {name: 'ALIZARIN', code: '#e74c3c'}, {name: 'CLOUDS', code: '#ecf0f1'},
    {name: 'CONCRETE', code: '#95a5a6'}, {name: 'ORANGE', code: '#f39c12'},
    {name: 'PUMPKIN', code: '#d35400'}, {name: 'POMEGRANATE', code: '#c0392b'},
    {name: 'SILVER', code: '#bdc3c7'}, {name: 'ASBESTOS', code: '#7f8c8d'},
];


export default class Profile extends Component {

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        setTimeout(this._tabs.goToPage.bind(this._tabs, 1))
    }

    render() {
        const {PHOTOS, INTERESTS} = Strings;
        return (
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.BASE}
                />
                <ProfileHeader username={"Alireza"}/>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                    <TouchableOpacity style={{marginTop: 16, marginRight: 16, marginBottom: 40}}>
                        <RoundAvatar
                            large={true}
                            uri={'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Chrome-icon.png'}/>
                    </TouchableOpacity>
                    <Tabs ref={component => this._tabs = component}
                          tabBarUnderlineStyle={{backgroundColor: Colors.ACCENT}} initialPage={1}>
                        <Tab heading={INTERESTS}
                             activeTextStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Constants.NORMAL_FONT}}
                             textStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Constants.NORMAL_FONT}}
                             tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}}>
                        </Tab>

                        <Tab heading={PHOTOS}
                             activeTextStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Constants.NORMAL_FONT}}
                             textStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Constants.NORMAL_FONT}}
                             activeTabStyle={{backgroundColor: 'white'}}
                             tabStyle={{backgroundColor: 'white'}}>
                            <GridView
                                itemDimension={130}
                                items={items}
                                style={styles.gridView}
                                renderItem={item => (
                                    <View style={[styles.itemContainer, {backgroundColor: item.code}]}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemCode}>{item.code}</Text>
                                    </View>
                                )}
                            />
                        </Tab>
                    </Tabs>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
