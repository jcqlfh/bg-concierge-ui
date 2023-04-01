import React from 'react';
import {Text} from 'react-native-paper';
import {Image, TouchableHighlight, View} from 'react-native';
import {useSwipe} from '@shared/hooks/useSwipe';
import CommonStyles from '@shared/styles/common.style';
import { Boardgame } from '@shared/context/Boardgame';
const exampleImage = require('@assets/images/collection.png');

function CollectionItem(props: {
  data: Boardgame;
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
        onTouchEndCapture={() => props.onSelected(props.data.Name)}
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
          <Text style={CommonStyles.Styles.secondaryText}>{props.data.Name}</Text>
          <View style={{flexDirection: 'row'}}>
            <View>
            <Image
              style={[CommonStyles.Styles.squareSize64, {marginTop: 5, marginRight: 5}]}
              source={{uri: props.data.Thumbnail ?? Image.resolveAssetSource(exampleImage).uri}}
            />
              <View style={{flexDirection: 'column', marginTop: 5, alignItems: 'center'}}>
                <Image style={{height: 20, width: 20 }} source={require('@assets/images/num_players.png')} />
                <Text style={{flex: 1}}>{props.data.MinPlayers + '-' + props.data.MaxPlayers}</Text>
             </View>
             <View style={{flexDirection: 'column', marginTop: 5, alignItems: 'center'}}>
                <Image style={{height: 20, width: 20}} source={require('@assets/images/duration.png')} />
                <Text style={{flex: 1}}>{props.data.MinPlayTime + '-' + props.data.PlayingTime}</Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'justify'}} numberOfLines={10}>
                {props.data.Description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default CollectionItem;
