import React from 'react';
import { Appbar } from 'react-native-paper';

function Menu(): JSX.Element {

  return (
    <Appbar mode='center-aligned' style={{ backgroundColor: '#04FD9420'}}> 
      <Appbar.Action icon={require('@assets/images/logo.png')} size={64}/>
      <Appbar.Content title="BGConcierge"  titleStyle={{fontFamily: 'BigelowRules', lineHeight: 48, letterSpacing: 1, fontSize: 48, margin: 10, textAlign:'center'}}/>
    </Appbar>
  );
}

export default Menu;
