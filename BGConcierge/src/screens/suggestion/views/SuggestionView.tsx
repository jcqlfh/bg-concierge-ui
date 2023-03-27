import React, {useContext, useRef, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import Title from '@shared/components/title/Title';
import CollectionItem from '@shared/components/collection/CollectionItem';
import CommonStyles from '@shared/styles/common.style';
import {SuggestionContext} from '@shared/context/SuggestionContext';

function SuggestionView(): JSX.Element {
  const [data, setData] = useState([
    {
      name: 'Earth', 
      img: 'https://cf.geekdo-images.com/0xqF_KyOb7V26Lu5YT3fxw__original/img/uqxMcj1QPt-U34drYdL6mmv2eos=/0x0/filters:format(jpeg)/pic6699821.jpg', 
      text: 'Earth, the soil that supports and sustains our beautiful planet, Earth. Over thousands of years of evolution and adaptation the flora and fauna of this unique planet have grown and developed into amazing life forms, creating symbiotic ecosystems and habitats.&#10;&#10;It&rsquo;s time to jump into these rich environments and create some amazing natural synergies that replicate and extrapolate on Earth&rsquo;s amazing versatility and plethora of natural resources. Create a self-supporting engine of growth, expansion and supply where even your unused plants become compost for future growth.&#10;&#10;Earth is an open world engine builder for 1 to 5 players with simple rules but tons of strategic possibilities. With its encyclopedic nature and the enormous number of unique cards and combinations, every single game will allow you to discover new synergies and connections, just as our vast and fascinating world allows us to do!&#10;&#10;&mdash;description from the publisher&#10;&#10',
      minplayers: 1,
      maxplayers: 5,
      minplaytime: 45,
      maxplaytime: 90,
      boardgamecategory: ['Adventure', 'Ancient', 'Exploration', 'Travel'],
      boardgamemechanic: ['End Game Bonuses', 'Hand Management', 'Pattern Building', 
        'Tile Placement', 'Variable Set-up', 'Victory Points as a Resource']
    },
    {
      name: 'Lost Ruins of Arnak: The Missing Expedition', 
      img: 'https://cf.geekdo-images.com/TABbfOUUMAuD6R7WEK8PZg__thumb/img/N7kNan3PbUo_5sK_4KT7A-iddRc=/fit-in/200x150/filters:strip_icc()/pic7412877.jpg', 
      text: 'Follow a trail to learn the fate of Professor Kutil and other missing explorers in Lost Ruins of Arnak: The Missing Expedition.&#10;&#10;In this expansion, you can test the strategies offered by two new leaders, explore new paths to knowledge on two new research tracks, and build your expedition team with new artifacts, items, and assistants.&#10;&#10;This expansion can simply be added to the Lost Ruins of Arnak base game, or it can be discovered as part of a solo or two-player co-operative campaign that consists of six chapters, each with a different set of rules, goals, and achievements.&#10;&#10;This expansion requires the Lost Ruins of Arnak base game and is fully compatible with the Expedition Leaders expansion.&#10;&#10;&mdash;description from the publisher&#10;&#10;',
      minplayers: 1,
      maxplayers: 4,
      minplaytime: 30,
      maxplaytime: 120,
      boardgamecategory: ['Animals', 'Card Game', 'Environmental'],
      boardgamemechanic: ['End Game Bonuses', 'Hand Management', 'Pattern Building', 
        'Tile Placement', 'Variable Set-up', 'Victory Points as a Resource']
  }]);
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
              data={item}
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
