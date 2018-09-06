import {
  Icon, Input, Item, Text,
} from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import {
  BackHeader, CustomLongTextBox, CustomStatusBar, Tags,
} from '../../components';
import {
  Colors, Constants, Graphics, Pages, Strings,
} from '../../config';
import SendPostButton from '../../containers/SendPostButton';
import { strings } from '../../i18n';
import { sendPost } from './actions';

class AddPostInfo extends Component {
  state = {
    tags: [],
    caption: '',
  };

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      >
        <BackHeader onBackPress={() => this.onBackPress()} title={strings(Strings.SEND_POST)} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
        >
          <View style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            marginTop: 0,
          }}
          >
            <CustomStatusBar />
            <View style={{
              flex: 5,
              backgroundColor: 'white',
            }}
            >
              {this.renderImageWithCaption()}
              <Item
                style={{
                  backgroundColor: Colors.LIGHT_GRAY,
                  borderColor: Colors.LIGHT_GRAY,
                  borderRadius: Constants.TEXT_BOX_RADIUS,
                  marginBottom: 10,
                  marginRight: 8,
                  marginLeft: 8,
                }}
                rounded
              >
                <Icon
                  type="EvilIcons"
                  name="location"
                  style={{ color: Colors.TEXT }}
                />
                <Input
                  type="location"
                  placeholder={strings(Strings.LOCATION)}
                  style={{
                    textAlign: 'right',
                    fontSize: Graphics.TEXT_NORMAL_SIZE,
                  }}
                />
              </Item>
              <View style={{
                marginRight: 8,
                marginLeft: 8,
              }}
              >
                <Text note>{strings(Strings.TAGS)}</Text>
                <Tags
                  onChangeTags={tags => this.onChangeTags(tags)}
                  style={{ justifyContent: 'center' }}
                />
              </View>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: 16,
              alignSelf: 'center',
            }}
            >
              <SendPostButton
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                }}
                text={strings(Strings.SEND_POST)}
                onPress={() => this.SendPost()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  renderImageWithCaption() {
    const { navigation } = this.props;
    const { caption } = this.state;
    const imageSource = navigation.getParam('imageSource');
    return (
      <View style={styles.photo}>
        <View style={{ flex: 3 }}>
          <CustomLongTextBox
            placeholder={strings(Strings.CAPTION)}
            value={caption}
            onChangeText={(caption) => {
              this.onChangeCaption(caption);
            }}
            style={{
              borderRadius: Graphics.BOX_RADIUS,
              textAlign: 'right',
              fontSize: Graphics.TEXT_NORMAL_SIZE,
              backgroundColor: Colors.LIGHT_GRAY,
              height: 100,
              marginRight: 12,
              marginLeft: 8,
            }}
          />
        </View>
        <Image
          source={{ uri: imageSource }}
          resizeMode="stretch"
          style={{
            borderRadius: 10,
            width: 100,
            height: 100,
            flex: 1,
            marginRight: 8,
          }}
        />
      </View>
    );
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  onChangeTags = (tags) => {
    this.setState({ tags });
  };

  onChangeCaption(caption) {
    this.setState({ caption });
  }

  SendPost() {
    const imageSource = this.props.navigation.getParam('imageSource');
    const { caption, tags } = this.state;
    this.props.sendPost(imageSource, caption, tags)
      .then((response) => {
        this.props.navigation.navigate(Pages.MAIN);
      });
  }
}

const styles = StyleSheet.create({
  photo: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

const mapStateToProps = state => ({
  mode: state.addPostInfoPage.mode,
});

const mapDispatchToProps = dispatch => ({
  sendPost: (imageSource, caption, tags) => dispatch(sendPost(imageSource, caption, tags)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostInfo);
