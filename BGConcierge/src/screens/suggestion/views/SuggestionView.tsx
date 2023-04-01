import React, {useContext, useRef, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import Title from '@shared/components/title/Title';
import CollectionItem from '@shared/components/collection/CollectionItem';
import CommonStyles from '@shared/styles/common.style';
import {SuggestionContext} from '@shared/context/SuggestionContext';

function SuggestionView(): JSX.Element {
  const [rerender, setRerender] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState('');
  const context = useContext(SuggestionContext);

  return (
    <View style={CommonStyles.Styles.expandSize}>
      <Title text={'Suggestions'} />
      <View style={{flex: 1}}>
        <FlatList
          removeClippedSubviews={false}
          data={context.value.suggestions}
          extraData={rerender}
          renderItem={({item, index}) => (
            <CollectionItem
              data={item}
              isSelected={selectedItem === item.Name}
              onChange={newItem => {
              }}
              onSelected={(name: string) => {
                setSelectedItem(name);
                setRerender(new Date());
              }}
              onSwipe={() => {
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

export default SuggestionView;
