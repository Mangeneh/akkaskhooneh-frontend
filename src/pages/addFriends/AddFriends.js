import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {Item, Input, Icon, Button, Text, Right, Left} from 'native-base';
import Contacts from 'react-native-contacts';
import BackHeader from "../../components/BackHeader";
import {Colors, Constants, Strings} from "../../config";
import {CustomStatusBar} from "../../components";
import {strings} from "../../i18n";

class AddFriends extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedContacts: []};
        Contacts.getAllWithoutPhotos((err, contacts) => {
            if (err) throw err;
            this.setContacts(contacts);
        });
    }

    render() {
        const {TEXT_BOX_RADIUS} = Constants;
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <CustomStatusBar/>
                <BackHeader title={strings(Strings.INVITE_FRIENDS)} onBackPress={() => this.props.navigation.goBack()}/>
                <View style={{marginRight: 8, marginLeft: 8, marginTop: 16}}>
                    <Item rounded style={{
                        alignSelf: 'center',
                        borderRadius: TEXT_BOX_RADIUS
                    }}>
                        <Icon name="ios-people" style={{color: Colors.BASE}}/>
                        <Input placeholder={strings(Strings.SEARCH_CONTACTS)}
                               style={{textAlign: 'right', fontSize: Constants.ITEM_FONT_SIZE}}/>
                        <Icon name="ios-search" style={{color: Colors.BASE}}/>
                    </Item>
                </View>
                <View>
                    <FlatList
                        style={{width: '100%'}}
                        keyExtractor={(item, index) => item.recordID}
                        data={this.state.selectedContacts}
                        ItemSeparatorComponent={() => <View
                            style={{
                                height: 2,
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: Colors.WHITE_BACK,
                            }}
                        />}
                        renderItem={({item, index}) => this.renderContact(item, index)}
                    />
                </View>
            </View>
        );
    }

    renderContact(item, index) {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    marginLeft: 16,
                    marginTop: 8,
                    marginBottom: 8
                }}>
                    <Button style={{width: 90, height: 30, backgroundColor: Colors.ACCENT}}>
                        <Right/>
                        <Text style={{
                            fontSize: Constants.TEXT_NORMAL_SIZE
                        }}>{strings(Strings.INVITE)}</Text>
                        <Left/>
                    </Button>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={{
                        fontSize: Constants.TEXT_NORMAL_SIZE,
                        marginRight: 8
                    }}>{`${item.givenName} ${item.familyName}`}</Text>
                </View>
            </View>
        );
    }

    setContacts(allContacts) {
        const selectedContacts = allContacts.filter(contact => contact.emailAddresses.length !== 0);
        this.setState({selectedContacts});
    }
}

export default AddFriends;