import React from 'react';
import {Chip, Text} from 'react-native-paper';
import {Image, Linking, TouchableHighlight, View} from 'react-native';
import {useSwipe} from '@shared/hooks/useSwipe';
import CommonStyles from '@shared/styles/common.style';
import { Boardgame } from '@shared/context/Boardgame';
import EscapeText from '../escapeText/EscapeText';
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

  function getText(value1: any, value2: any) {
    if(value1 == value2)
      return value1;
    else
     return value1 + '-' + value2;
  }

  function getWeight(value: number)
  {
    if(value >= 0 && value < 2)
    {
      return 'Easy';
    } else if (value >= 2 && value < 4) {
      return 'Medium';
    } else if (value >= 4) {
      return 'Hard';
    }
  }

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
          
          <Text style={[CommonStyles.Styles.secondaryText, { fontSize: 18}]}>{props.data.Name}</Text>
          <Image
              style={{width: 200, height: 200, marginTop: 5, marginRight: 10, alignSelf: 'center'}}
              source={{uri: props.data.Thumbnail ?? Image.resolveAssetSource(exampleImage).uri}}
            />
          <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly'}}>
            
              <View style={{flexDirection: 'column', marginTop: 5, alignItems: 'center'}}>
                <Image style={{height: 20, width: 20 }} source={require('@assets/images/num_players.png')} />
                <Text style={{flex: 1}}>{getText(props.data.MinPlayers, props.data.MaxPlayers)}</Text>
             </View>
             <View style={{flexDirection: 'column', marginTop: 5, alignItems: 'center'}}>
                <Image style={{height: 20, width: 20}} source={require('@assets/images/duration.png')} />
                <Text style={{flex: 1}}>{getText(props.data.MinPlayTime,props.data.PlayingTime)}</Text>
              </View>
              <View style={{flexDirection: 'column', marginTop: 5, alignItems: 'center'}}>
                <Image style={{height: 20, width: 20}} source={require('@assets/images/difficulty.png')} />
                <Text style={{flex: 1}}>{getWeight(props.data.Statistics.AverageWeight)}</Text>
              </View>
            
          </View>

          <View style={{flex: 1, marginTop: 20}}>
              <EscapeText text={props.data.Description}/>
            </View>
          <View style={{flexDirection: 'column', marginTop: 20}}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 5,  justifyContent: 'center'}}>
              <Image style={{height: 20, width: 20}} source={require('@assets/images/mechanic.png')} />
              <Text>Categories</Text>
            </View>
            <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>{props.data.Categories.map(i => 
              <Chip
                key={i}
                style={{marginLeft: 5, marginTop: 5}}
                textStyle={{fontSize: 9}}>
                {i}
              </Chip>
            )}</View>
          </View>
          <View style={{flexDirection: 'column', marginTop: 20}}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 5,  justifyContent: 'center'}}>
              <Image style={{height: 20, width: 20}} source={require('@assets/images/mechanic.png')} />
              <Text>Mechanics</Text>
            </View>
            <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>{props.data.Mechanics.map(i => 
              <Chip
                key={i}
                style={{marginLeft: 5, marginTop: 5}}
                textStyle={{fontSize: 9}}>
                {i}
              </Chip>
            )}</View>
          </View>

          <Text 
            style={{ flex: 1, marginTop:20, textAlign: 'center', color: 'blue', textDecorationLine: 'underline',  }} 
            onPress={() => Linking.openURL('https://boardgamegeek.com/boardgame/'+ props.data.Id)}>
              Show in BGG
        </Text>
          </View>

          
        </View>
    </TouchableHighlight>
  );
}

export default CollectionItem;
