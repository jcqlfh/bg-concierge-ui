import React from 'react';
import {View} from 'react-native';
import {Chip, IconButton, Text} from 'react-native-paper';

function ListDisplay(props: {
  data: string[];
  onShowDialog: () => void;
  onClearData: (m: string) => void;
  showList: boolean;
  title: string;
}): JSX.Element {
  return (
    <View style={{flexDirection: 'row'}}>
      <IconButton icon={'magnify'} onPress={props.onShowDialog} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignSelf: 'center',
          flex: 1,
        }}>
        {!props.showList ? (
          <Text style={{flex: 1, marginLeft: 35}}>{props.title}</Text>
        ) : (
          props.data.map(m => (
            <Chip
              key={m}
              closeIcon={'close'}
              onClose={() => props.onClearData(m)}
              style={{marginLeft: 5, marginTop: 5}}
              textStyle={{fontSize: 9}}>
              {m}
            </Chip>
          ))
        )}
      </View>
    </View>
  );
}

export default ListDisplay;
