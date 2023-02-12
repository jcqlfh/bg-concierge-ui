import React from 'react';
import { Appbar } from 'react-native-paper';
function Menu(): JSX.Element {

  return (
    <Appbar mode='center-aligned' elevated={true}> 
      <Appbar.Action icon={require('@assets/logo.png')} size={64}/>
      <Appbar.Content title="BGConcierge" />
    </Appbar>
  );
}

export default Menu;
