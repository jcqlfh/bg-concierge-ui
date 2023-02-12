/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Appbar } from 'react-native-paper';

function App(): JSX.Element {

  return (
    <Appbar mode='center-aligned' elevated={true}> 
      <Appbar.Action icon={require('../assets/logo.png')} size={64}/>
      <Appbar.Content title="BGConcierge" />
    </Appbar>
  );
}

export default App;
