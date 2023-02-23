import React from 'react';
import {Text, TextInput} from 'react-native-paper';
import {Image, View} from 'react-native';
import {useSwipe} from '@hooks/useSwipe';
import CommonStyles from '@styles/common.style';

function CollectionItem(props: {
  name: string;
  isEditable: boolean;
  onChange: (newItem: string) => void;
  isSelected: boolean;
  onSelected: (selected: string) => void;
  onSwipe: () => void;
}): JSX.Element {
  const {onTouchStart, onTouchEnd} = useSwipe(
    () => props.isEditable && props.onSwipe(),
    () => props.isEditable && props.onSwipe(),
    6,
  );

  return (
    <View
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchEndCapture={() => props.onSelected(props.name)}
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
        <Text style={CommonStyles.Styles.secondaryText}>
          Catan
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={CommonStyles.Styles.squareSize64}
            source={require('@assets/images/collection.png')}
          />
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'justify'}}>alsdnlaskndlka nlkas dlkamsdlkamslkdm alskmdlaks mdlakms dlkasm dlkasmdlk maslkdm alksmd laksm dlkams lkasm dlkasdlk m</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>3-6</Text>
              <Text>140</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CollectionItem;
