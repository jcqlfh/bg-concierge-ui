import React, { useState } from 'react';
import {Text, TextInput} from 'react-native-paper';
import {Image, NativeSyntheticEvent, TextInputEndEditingEventData, TouchableHighlight, View} from 'react-native';
import {useSwipe} from '@shared/hooks/useSwipe';
import CommonStyles from '@shared/styles/common.style';

function CollectionUser(props: {
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

  const [errorState, setErrorState] = useState(false);

  return (
    <TouchableHighlight activeOpacity={0.6}>
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchEndCapture={() => props.onSelected(props.name)}
        style={[
          {
            flexDirection: 'row',
            backgroundColor: errorState ? '#FF000040':
            props.isSelected
              ? CommonStyles.Colors.primary
              : CommonStyles.Colors.gray,
          },
          CommonStyles.Styles.defaultSpacing,
        ]}>
        <Image
          style={CommonStyles.Styles.squareSize64}
          source={require('@assets/images/collection.png')}
        />
        <View style={[CommonStyles.Styles.expandSize, {marginHorizontal: 10}]}>
          <Text style={CommonStyles.Styles.secondaryText}>
            Collection from BGG user
          </Text>
          <TextInput
            value={props.name}
            onChangeText={(text: string) => {
              setErrorState(!text.match(/^[A-Za-z]{1}[A-Za-z_]{3,19}$/));
              props.onChange(text);
            }}
            style={{textAlign: 'center', backgroundColor: 'transparent'}}
            editable={props.isEditable}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default CollectionUser;
