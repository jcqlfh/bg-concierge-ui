/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Button, Text} from 'react-native-paper';
import { FlatList, ScrollView, View } from 'react-native';
import Header from '@components/header/Header';
import Title from '@components/title/Title';
import Collection from '@components/collection/Collection';

function App(): JSX.Element {
  const [data, setData] = useState([
    {name: 'BGG Ranking', isEditable: false},
    {name: 'jcqlfh', isEditable: true},
  ]);
  const [rerender, setRerender] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState('');

  console.log(selectedItem);

  return (
    <View style={{flex: 1}}>
      <Header />
      <Title text={'Choose a Collection'} />
      <Button icon='plus' style={{margin:10}}buttonColor='#4504FD20' onPress={() => {setData([{name: '', isEditable: true}, ...data]); setRerender(new Date())}}>Add Collection</Button>
      <View style={{flex: 1}}>
      <FlatList data={data}
        extraData={rerender}
        renderItem={
          ({item, index}) => 
          <Collection 
            name={item.name}
            isEditable={item.isEditable} 
            isSelected={selectedItem === item.name} 
            onChange={
              (newItem) => 
              {
                data[index].name = newItem
                setData(data);
                setRerender(new Date());
              }
            }
            onSelected={
              (name: string) => 
              {
                setSelectedItem(name);
                setRerender(new Date());
              }
            }
            onDelete={
              () =>
              {
                data.splice(index, 1);
                setData(data);
                setRerender(new Date());
              }
            }/>
        }
      />
      </View>
    </View>
    
  );
}

export default App;
