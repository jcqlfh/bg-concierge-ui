import React, {useContext, useRef, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {FlatList, Image, TouchableHighlight, View} from 'react-native';
import Title from '@shared/components/title/Title';
import CollectionUser from '@shared/components/collection/CollectionUser';
import CommonStyles from '@shared/styles/common.style';
import {SuggestionContext} from '@shared/context/SuggestionContext';
import Loading from '@shared/components/loading/Loading';

function SetupView({navigation}: any): JSX.Element {
  const flatListRef =
    useRef<FlatList<{name: string; isEditable: boolean}>>(null);
  const [data, setData] = useState([{name: 'BGG Ranking', isEditable: false}]);
  const [rerender, setRerender] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const context = useContext(SuggestionContext);

  const onAddCollectionButtonPressCallback = () => {
    if (data.find(i => i.name === '')) {
      setSelectedItem('');
      return;
    }

    setData([data[0], {name: '', isEditable: true}, ...data.slice(1)]);
    setRerender(new Date());
  };

  const onSetupButtonPressCallback = () => {
    setLoading(true);
    context.setValue({
      ...context.value,
      collection: selectedItem,
    });
    setTimeout(() => {
      navigation.navigate('Search');
      setTimeout(() => {
        setLoading(false)}, 1000);
    }, 2000);
    
  };

  if(isLoading)
  return (
    <Loading text={loadingText} />
  )
  else
  return (
    <View style={CommonStyles.Styles.expandSize}>
      <Title text={'Choose a Collection'} />
      <TouchableHighlight activeOpacity={0.6}>
        <Button
          icon="plus"
          style={{margin: 10}}
          buttonColor={CommonStyles.Colors.secondary}
          onPress={onAddCollectionButtonPressCallback}>
          Add Collection
        </Button>
      </TouchableHighlight>
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
      <TouchableHighlight activeOpacity={0.6}>
        <View
          onTouchEndCapture={() => selectedItem && onSetupButtonPressCallback()}
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
      </TouchableHighlight>
    </View>
  );
}

export default SetupView;
