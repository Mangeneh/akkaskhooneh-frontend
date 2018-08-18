import React, {Component} from 'react';
import CustomTextBox from './src/components/CustomTextBox'
import { Container, Item, Text } from 'native-base';

export default class App extends Component {
  render() {
    return (
      <Container style = {{backgroundColor: '#5c5c5c'}}>
        <Text style = {{fontSize:12, color: 'white', textAlign: 'center', marginTop: 163}}>عکاسخونه</Text>
        <Item style = {{marginTop: 38, marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded >
          <CustomTextBox type = 'email' placeholder = {'آدرس ایمیل'} secureTextEntry = {false} style = {{textAlign: 'center', fontSize: 10}}/>
        </Item>
        <Item style = {{marginTop: 15, marginLeft: 30, marginRight: 30, backgroundColor: 'white'}} rounded>
          <CustomTextBox placeholder = {'رمز عبور'} secureTextEntry = {true} style = {{textAlign: 'center', fontSize: 10}}/>
        </Item>
      </Container>
    );
  }
}