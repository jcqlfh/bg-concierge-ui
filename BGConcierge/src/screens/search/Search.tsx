import React, { useRef, useState } from 'react';
import { Text} from 'react-native-paper';
import { FlatList, Image, View } from 'react-native';
import Title from '@components/title/Title';
import Collection from '@components/collection/CollectionUser';

function Search({navigation}: any): JSX.Element {
  const flatListRef = useRef<FlatList<{ name: string; isEditable: boolean;}>>(null);
  const [data, setData] = useState([
    {name: 'BGG Ranking', isEditable: false},
  ]);
  const [rerender, setRerender] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState('');


  const onSetupButtonPressCallback = () => {
    navigation.navigate('Search');
  }

  return (
    <View style={{flex: 1}}>
      <Title text={'Select the Parameters'} />
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
                flatListRef && flatListRef.current && flatListRef.current.scrollToItem({item: item, viewPosition: 1});
              }
            }
            onSwipe={
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
      <View onTouchEndCapture={onSetupButtonPressCallback} style={{flexDirection: 'row', backgroundColor: selectedItem ? '#4504FD20' : '#CCCCCC20', padding: 10, justifyContent:'center', alignItems: 'center'}}>
            <Image style={{height:64, width: 64}} source={require('@assets/images/search.png')}/>
            <View style={{ marginLeft: 10, marginRight: 10}}>
                <Text style={{textAlign: 'center', fontFamily: 'BellotaText', fontSize:32}}>SEARCH</Text>
            </View>
        </View>
    </View>
    
  );
}

export default Search;
