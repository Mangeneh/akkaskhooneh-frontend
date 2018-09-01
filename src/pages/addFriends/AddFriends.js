import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {Container, Item, Input, Icon, Button, Text} from 'native-base';
import Contacts from 'react-native-contacts';
import BackHeader from "../../components/BackHeader";
import {Colors, Constants, Fonts, Strings} from "../../config";
import {CustomStatusBar} from "../../components";

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
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS, TEXT_BOX_ELEVATION} = Constants;
        return (
            <Container>
                <CustomStatusBar/>
                <BackHeader title={Strings.INVITE_FRIENDS} onBackPress={() => this.props.navigation.goBack()}/>
                <View style={{marginRight: 32, marginLeft: 32, marginTop: 16}}>
                    <Item rounded style={{
                        alignSelf: 'center',
                        backgroundColor: Colors.WHITE_BACK,
                        borderRadius: TEXT_BOX_RADIUS
                    }}>
                        <Icon name="ios-people"/>
                        <Input placeholder={Strings.SEARCH_CONTACT}
                               style={{textAlign: 'right', fontSize: TEXT_BOX_FONT_SIZE}}
                               fontFamily={Fonts.NORMAL_FONT}/>
                        <Icon name="ios-search"/>
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
                    <Button style={{width:90,height:30}}>
                        <Text style={{fontFamily: Fonts.NORMAL_FONT}}>{Strings.INVITE}</Text>
                    </Button>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text>{`${item.givenName} ${item.familyName}`}</Text>
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