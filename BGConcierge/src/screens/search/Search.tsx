import React, { useRef, useState } from 'react';
import { Button, Chip, Dialog, Portal, SegmentedButtons, Text, TextInput} from 'react-native-paper';
import { FlatList, Image, ScrollView, View } from 'react-native';
import Title from '@components/title/Title';
import Collection from '@components/collection/CollectionUser';

function Search({navigation}: any): JSX.Element {
  const flatListRef = useRef<FlatList<{ name: string; isEditable: boolean;}>>(null);
  const [data, setData] = useState([
    {name: 'BGG Ranking', isEditable: false},
  ]);
  const [rerender, setRerender] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState('');
  const [value, setValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const onSetupButtonPressCallback = () => {
    navigation.navigate('Search');
  }

  return (
    <View style={{flex: 1}}>
      <Title text={'Select the Parameters'} />
      <View style={{flex: 1}}>
        <ScrollView         
          removeClippedSubviews={false}
        >
          <View style={{zIndex: 999, shadowColor: 'black', shadowOpacity: 1, shadowOffset: { width: 10, height: 10}, flexDirection: 'row', backgroundColor: '#04FD9420', marginTop: 20, marginHorizontal: 20, borderRadius: 10, padding: 10}}>
            <Image style={{height:72, width: 72}} source={require('@assets/images/collection.png')}/>
            <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <Text style={{textAlign: 'center', fontFamily: 'BellotaText'}}>Number of Players</Text>
                <TextInput style={{textAlign: 'center', backgroundColor: 'transparent'}} inputMode={'numeric'} />
            </View>
          </View>

          <View style={{zIndex: 999, shadowColor: 'black', shadowOpacity: 1, shadowOffset: { width: 10, height: 10}, flexDirection: 'row', backgroundColor: '#04FD9420', marginTop: 20, marginHorizontal: 20, borderRadius: 10, padding: 10}}>
            <Image style={{height:72, width: 72}} source={require('@assets/images/collection.png')}/>
            <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <Text style={{textAlign: 'center', fontFamily: 'BellotaText'}}>Durations</Text>
                <TextInput style={{textAlign: 'center', backgroundColor: 'transparent'}} inputMode={'numeric'} />
            </View>
          </View>

          <View style={{zIndex: 999, shadowColor: 'black', shadowOpacity: 1, shadowOffset: { width: 10, height: 10}, flexDirection: 'row', backgroundColor: '#04FD9420', marginTop: 20, marginHorizontal: 20, borderRadius: 10, padding: 10}}>
            <Image style={{height:72, width: 72}} source={require('@assets/images/collection.png')}/>
            <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <Text style={{textAlign: 'center', fontFamily: 'BellotaText'}}>Difficult</Text>
                <SegmentedButtons
                  value={value}
                  onValueChange={setValue}
                  density={'small'}
                  buttons={[
                    {
                      value: 'easy',
                      label: 'Easy',
                    },
                    {
                      value: 'medium',
                      label: 'Medium',
                    },
                    { value: 'hard', label: 'Hard' },
                  ]}
                />
            </View>
          </View>

          <View style={{zIndex: 999, shadowColor: 'black', shadowOpacity: 1, shadowOffset: { width: 10, height: 10}, flexDirection: 'row', backgroundColor: '#04FD9420', marginTop: 20, marginHorizontal: 20, borderRadius: 10, padding: 10}}>
            <Image style={{height:72, width: 72}} source={require('@assets/images/collection.png')}/>
            <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <Text style={{textAlign: 'center', fontFamily: 'BellotaText'}}>Mechanic</Text>
                <Button onPress={showDialog}>Show Dialog</Button>
                <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                      <Text variant="bodyMedium">This is simple dialog</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
            </View>
          </View>
        </ScrollView>
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
