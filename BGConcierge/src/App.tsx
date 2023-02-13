/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import { Button, Text} from 'react-native-paper';
import { FlatList, Image, View } from 'react-native';
import Header from '@components/header/Header';
import Title from '@components/title/Title';
import Collection from '@components/collection/Collection';

function App(): JSX.Element {
  const flatListRef = useRef();
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
      <FlatList         
        ref={flatListRef}
        removeClippedSubviews={false}
        data={data}
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
                flatListRef.current.scrollToItem({item: item, viewPosition: 1});
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
      <View>

      </View>
      <View style={{flexDirection: 'row', backgroundColor: '#4504FD20', padding: 10, justifyContent:'center', alignItems: 'center'}}>
            <Image style={{height:64, width: 64}} source={require('@assets/images/collection.png')}/>
            <View style={{ marginLeft: 10, marginRight: 10}}>
                <Text style={{textAlign: 'center', fontFamily: 'BellotaText', fontSize:32}}>CHOOSE</Text>
            </View>
        </View>
    </View>
    
  );
}

export default App;
