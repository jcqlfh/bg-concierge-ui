import React from 'react';
import {Text} from 'react-native-paper';
import {Image, TouchableHighlight, View} from 'react-native';
import {useSwipe} from '@shared/hooks/useSwipe';
import CommonStyles from '@shared/styles/common.style';

function CollectionItem(props: {
  data: {
    name: string,
    img: string,
    text: string,
    minplayers: number,
    maxplayers: number,
    minplaytime: number,
    maxplaytime: number,
    boardgamecategory: string[],
    boardgamemechanic: string[]
  };
  onChange: (newItem: string) => void;
  isSelected: boolean;
  onSelected: (selected: string) => void;
  onSwipe: () => void;
}): JSX.Element {
  const {onTouchStart, onTouchEnd} = useSwipe(
    () => props.onSwipe(),
    () => props.onSwipe(),
    6,
  );

  return (
    <TouchableHighlight activeOpacity={0.6}>
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchEndCapture={() => props.onSelected(props.data.name)}
        style={[
          {
            flexDirection: 'row',
            backgroundColor: props.isSelected
              ? CommonStyles.Colors.primary
              : CommonStyles.Colors.gray,
          },
          CommonStyles.Styles.defaultSpacing,
        ]}>
        <View style={[CommonStyles.Styles.expandSize, {marginHorizontal: 10}]}>
          <Text style={CommonStyles.Styles.secondaryText}>{props.data.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <View>
            <Image
              style={[CommonStyles.Styles.squareSize64, {marginTop: 5, marginRight: 5}]}
              source={{uri: props.data.img}}
            />
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Image style={{height: 16, width: 16, marginRight:5 }} source={require('@assets/images/num_players.png')} />
                <Text style={{marginRight: 10}}>{props.data.minplayers + '-' + props.data.maxplayers}</Text>
             </View>
             <View style={{flexDirection: 'row', marginTop: 5}}>
                <Image style={{height: 16, width: 16, marginRight: 5 }} source={require('@assets/images/duration.png')} />
                <Text>{props.data.minplaytime + '-' + props.data.maxplaytime}</Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'justify'}} numberOfLines={10}>
                {props.data.text}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default CollectionItem;
