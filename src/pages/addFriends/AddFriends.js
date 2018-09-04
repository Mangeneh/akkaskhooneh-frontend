import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {Container, Item, Input, Icon, Button, Text, Right, Left} from 'native-base';
import Contacts from 'react-native-contacts';
import BackHeader from "../../components/BackHeader";
import {Colors, Constants, Fonts, Strings} from "../../config";
import {CustomStatusBar} from "../../components";
import { colors } from 'react-native-elements';

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
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS} = Constants;
        return (
            <Container>
                <CustomStatusBar/>
                <BackHeader title={Strings.INVITE_FRIENDS} onBackPress={() => this.props.navigation.goBack()}/>
                <View style={{marginRight:8, marginLeft: 8, marginTop: 16}}>
                    <Item rounded style={{
                        alignSelf: 'center',
                        backgroundColor: Colors.WHITE_BACK,
                        borderRadius: TEXT_BOX_RADIUS
                    }}>
                        <Icon name="ios-people" style={{color: Colors.BASE}}/>
                        <Input placeholder={Strings.SEARCH_CONTACT}
                               style={{textAlign: 'right', fontSize: Constants.ITEM_FONT_SIZE}}
                               fontFamily={Fonts.NORMAL_FONT}/>
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
                                alignSelf:'center',
                                backgroundColor: Colors.WHITE_BACK,
                            }}
                        />}
                        renderItem={({item, index}) => this.renderContact(item, index)}
                    />
                </View>
            </Container>
        );
    }

    renderContact(item, index) {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'flex-start', marginLeft: 16, marginTop: 8, marginBottom: 8}}>
                    <Button style={{width: 90,height: 30, backgroundColor: Colors.ACCENT, textAlign: 'center'}}>
                        <Right />
                        <Text style={{fontFamily: Fonts.NORMAL_FONT, fontSize: Constants.TEXT_NORMAL_SIZE}}>{Strings.INVITE}</Text>
                        <Left />
                    </Button>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={{fontSize: Fonts.NORMAL_FONT, fontSize: Constants.TEXT_NORMAL_SIZE, marginRight: 8}}>{`${item.givenName} ${item.familyName}`}</Text>
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