/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Button, Text} from 'react-native-paper';
import { FlatList, ScrollView, View } from 'react-native';
import Header from '@components/header/Header';
import Title from '@components/title/Title';
import Collection from '@components/collection/Collection';

function App(): JSX.Element {
  return (
    <View style={{flex: 1}}>
      <Header />
      <Title text={'Choose a Collection'} />
      <Button icon='plus' style={{margin:10}}buttonColor='blue'>Add Collection</Button>
      <View style={{flex: 1}}>
      <FlatList data={[
          {name: 'BGG Ranking', isEditable: false},
          {name: 'jcqlfh', isEditable: true},
        ]}
        renderItem={
          ({item}) => <Collection name={item.name} isEditable={item.isEditable} />
        }
      />
      </View>
    </View>
    
  );
}

export default App;
