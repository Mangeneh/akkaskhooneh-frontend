import React, {Component} from 'react';
import CustomTextBox from './src/components/CustomTextBox'
import { Container, Item } from 'native-base';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Item style = {{marginTop: 221}}>
          <CustomTextBox placeholder = {'آدرس ایمیل'} secureTextEntry = {false}/>
        </Item>
        <Item style = {{marginTop: 15}}>
          <CustomTextBox placeholder = {'رمز عبور'} secureTextEntry = {true}/>
        </Item>
      </Container>
    );
  }
}