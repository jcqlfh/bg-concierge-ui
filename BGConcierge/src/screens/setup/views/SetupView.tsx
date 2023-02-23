import React, {useRef, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {FlatList, Image, View} from 'react-native';
import Title from '@components/title/Title';
import CollectionUser from '@components/collection/CollectionUser';
import CommonStyles from '@styles/common.style';

function SetupView({navigation}: any): JSX.Element {
  const flatListRef =
    useRef<FlatList<{name: string; isEditable: boolean}>>(null);
  const [data, setData] = useState([{name: 'BGG Ranking', isEditable: false}]);
  const [rerender, setRerender] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState('');

  const onAddCollectionButtonPressCallback = () => {
    if (data.find(i => i.name === '')) {
      setSelectedItem('');
      return;
    }

    setData([data[0], {name: '', isEditable: true}, ...data.slice(1)]);
    setRerender(new Date());
  };

  const onSetupButtonPressCallback = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={CommonStyles.Styles.expandSize}>
      <Title text={'Choose a Collection'} />
      <Button
        icon="plus"
        style={{margin: 10}}
        buttonColor={CommonStyles.Colors.secondary}
        onPress={onAddCollectionButtonPressCallback}>
        Add Collection
      </Button>
      <View style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          removeClippedSubviews={false}
          data={data}
          extraData={rerender}
          renderItem={({item, index}) => (
            <CollectionUser
              name={item.name}
              isEditable={item.isEditable}
              isSelected={selectedItem === item.name}
              onChange={newItem => {
                data[index].name = newItem;
                setData(data);
                setRerender(new Date());
              }}
              onSelected={(name: string) => {
                setSelectedItem(name);
                setRerender(new Date());
                flatListRef &&
                  flatListRef.current &&
                  flatListRef.current.scrollToItem({
                    item: item,
                    viewPosition: 1,
                  });
              }}
              onSwipe={() => {
                data.splice(index, 1);
                setData(data);
                setRerender(new Date());
              }}
            />
          )}
        />
      </View>
      <View></View>
      <View
        onTouchEndCapture={onSetupButtonPressCallback}
        style={[
          {
            flexDirection: 'row',
            backgroundColor: selectedItem
              ? CommonStyles.Colors.secondary
              : CommonStyles.Colors.gray,
            padding: 10,
          },
          CommonStyles.Styles.centerContent,
        ]}>
        <Image
          style={CommonStyles.Styles.squareSize64}
          source={require('@assets/images/collection.png')}
        />
        <View style={{marginHorizontal: 10}}>
          <Text style={CommonStyles.Styles.bottomButtonText}>SET UP</Text>
        </View>
      </View>
    </View>
  );
}

export default SetupView;
