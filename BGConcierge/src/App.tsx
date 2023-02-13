/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text} from 'react-native-paper';
import { Dimensions, FlatList, ScrollView, View } from 'react-native';
import Menu from './shared/components/menu/Menu';

function App(): JSX.Element {
  var height = Dimensions.get('window').height;
  return (
    <View style={{ display:'flex', backgroundColor: 'pink', flex:1}}>
      <Menu />
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>texasdasdast</Text>
      
      <View style={{flex: 1, backgroundColor: 'orange'}} onStartShouldSetResponder={() => true}>
      <ScrollView style={{backgroundColor: 'white', margin: 10}}>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      <Text style={{height:30, marginTop: 50, fontSize: 22, textDecorationLine: 'underline', textAlign: 'center'}}>TESTE</Text>
      </ScrollView>
      </View>
    </View>
    
  );
}

export default App;
