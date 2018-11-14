import { Icon, Input, Item, Text, } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import {
  BackHeader,
  CustomLongTextBox,
  CustomStatusBar,
  SpinnerButton,
  Tags,
} from '../../components';
import { Colors, Constants, Graphics, PageModes, Pages, Parameters, Strings, } from '../../config';
import { strings } from '../../i18n';
import { sendPost } from './actions';

export interface IProps {
  navigation: NavigationScreenProp;
  sendPost: any;
}

interface IState {
  tags: string[];
  caption: string;
  mode: PageModes;
}

class AddPostInfo extends Component<IProps, IState> {
  constructor (props) {
    super(props);
    this.state = {
      tags: [],
      caption: '',
      mode: PageModes.NORMAL,
    };
    this.sendPost = this.sendPost.bind(this);
  }

  public render () {
    const { mode } = this.state;
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      >
        <BackHeader title={strings(Strings.SEND_POST)}/>
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
            <CustomStatusBar/>
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
                  style={{ color: Colors.DARK_TEXT }}
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
              <SpinnerButton
                onPress={this.sendPost}
                mode={mode}
                text={strings(Strings.SEND_POST)}
                icon="send"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  private renderImageWithCaption () {
    const { navigation } = this.props;
    const { caption } = this.state;
    const imageSource = navigation.getParam(Parameters.IMAGE_SOURCE);
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
        <FastImage
          source={{ uri: imageSource }}
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

  private onChangeTags (tags: string[]) {
    this.setState({ tags });
  }

  private onChangeCaption (caption: string) {
    this.setState({ caption });
  }

  private sendPost () {
    this.setState({ mode: PageModes.LOADING });
    const imageSource = this.props.navigation.getParam(Parameters.IMAGE_SOURCE);
    const { caption, tags } = this.state;
    const { sendPost, navigation } = this.props;
    sendPost(imageSource, caption, tags)
      .then((response) => {
        this.setState({ mode: PageModes.SUCCESS });
        navigation.navigate(Pages.MAIN);
      })
      .catch((error) => {
        this.setState({ mode: PageModes.ERROR });
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

const mapDispatchToProps = dispatch => ({
  sendPost: (imageSource: string, caption: string, tags: string[]) =>
    dispatch(sendPost(imageSource, caption, tags)),
});

export default connect(null, mapDispatchToProps)(AddPostInfo);