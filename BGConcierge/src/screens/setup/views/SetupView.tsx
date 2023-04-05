import React, {useContext, useRef, useState} from 'react';
import {Button, Snackbar, Text} from 'react-native-paper';
import {FlatList, Image, TouchableHighlight, View} from 'react-native';
import Title from '@shared/components/title/Title';
import CollectionUser from '@shared/components/collection/CollectionUser';
import CommonStyles from '@shared/styles/common.style';
import {SuggestionContext} from '@shared/context/SuggestionContext';
import Loading from '@shared/components/loading/Loading';

function SetupView({navigation}: any): JSX.Element {
  const flatListRef =
    useRef<FlatList<{name: string; isEditable: boolean}>>(null);
  const predefinedData = [
    {name: 'BGG TOP 100', isEditable: false},
    {name: 'BGG Strategy TOP 100', isEditable: false},
    {name: 'BGG Abstracts TOP 100', isEditable: false},
    {name: 'BGG Family TOP 100', isEditable: false},
  ];
  const [data, setData] = useState(predefinedData);
  const [rerender, setRerender] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const [snackOn, setSnackOn] = useState(false)
  const [snackText, setSnackText] = useState('')
  const context = useContext(SuggestionContext);

  const onAddCollectionButtonPressCallback = () => {
    if (data.find(i => i.name === '')) {
      setSelectedItem('');
      return;
    }

    setData([{name: '', isEditable: true}, ...data,]);
    setRerender(new Date());
  };

  const onSetupButtonPressCallback = async () => {
    
    let collectionItems: number[] = [];
    console.log
    if(predefinedData.map(d=> d.name).join().indexOf(selectedItem) < 0 && selectedItem.match(/^[A-Za-z]{1}[A-Za-z_]{3,19}$/)) {
      setLoading(true);

      var status = 202;
      var response = null;

      while (status === 202) {
        response = await fetch('https://boardgamegeek.com/xmlapi2/collection?username='+selectedItem);
        status = response.status
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      }

      if(status !== 200) {
        setLoading(false);
        setSnackOn(true);
        setSnackText('Network error while getting the collection. Please try again another time.')
        return;
      } 

      var responseText = await response?.text();

      let errorMatch = responseText?.match(/(?<=<message>).*(?=<\/message>)/gm);
      
      if(errorMatch) {
        setLoading(false);
        setSnackOn(true);
        setSnackText(errorMatch.join(':'));
        return;
      }
      
      let goodMatch = responseText?.match(/(?<=objectid=")[0-9]+(?=")/gm)
      collectionItems = goodMatch?.map(p => parseInt(p)).filter((value, index, array) => array.indexOf(value) === index) ?? collectionItems;
    } 
    
    if(predefinedData.map(d=> d.name).join().indexOf(selectedItem) < 0 && !selectedItem.match(/^[A-Za-z]{1}[A-Za-z_]{3,19}$/)){
      setLoading(false);
      setSnackOn(true);
      setSnackText("Invalid username");
      return;
    }

    if(collectionItems.length == 0){
      setLoading(false);
      setSnackOn(true);
      setSnackText("Empty collection. Please use another setting.");
      return;
    }


    context.setValue({
      ...context.value,
      collection: selectedItem,
      colectionItems: collectionItems,
    });
    
    navigation.navigate('Search');
    setTimeout(() => {
      setLoading(false)}, 1000);
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
      <Snackbar
        visible={snackOn}
        onDismiss={() => setSnackOn(false)}
      >
        {snackText}
      </Snackbar>
    </View>
  );
}

export default SetupView;
