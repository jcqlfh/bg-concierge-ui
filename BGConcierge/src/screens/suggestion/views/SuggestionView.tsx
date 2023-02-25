import React, {useContext, useRef, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import Title from '@shared/components/title/Title';
import CollectionItem from '@shared/components/collection/CollectionItem';
import CommonStyles from '@shared/styles/common.style';
import {SuggestionContext} from '@shared/context/SuggestionContext';

function SuggestionView(): JSX.Element {
  const [data, setData] = useState([{name: 'BGG Ranking', isEditable: false}]);
  const [rerender, setRerender] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState('');
  const context = useContext(SuggestionContext);

  return (
    <View style={CommonStyles.Styles.expandSize}>
      <Title text={'Suggestions'} />
      <View style={{flex: 1}}>
        <FlatList
          removeClippedSubviews={false}
          data={data}
          extraData={rerender}
          renderItem={({item, index}) => (
            <CollectionItem
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
    </View>
  );
}

export default SuggestionView;
