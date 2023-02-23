import CommonStyles from '@styles/common.style';
import React from 'react';
import {Button, Checkbox, Dialog, Text} from 'react-native-paper';
import {ScrollView, StyleSheet} from 'react-native';

function ListChooser(props: {
  data: {name: string; checked: boolean}[];
  setData: (data: {name: string; checked: boolean}[]) => void;
  isVisible: boolean;
  onDismiss: () => void;
}): JSX.Element {
  return (
    <Dialog
      visible={props.isVisible}
      onDismiss={props.onDismiss}
      style={CommonStyles.Styles.expandSize}>
      <Dialog.Title>Alert</Dialog.Title>
      <Dialog.Content>{<Text>'Teste'</Text>}</Dialog.Content>
      <Dialog.ScrollArea>
        <ScrollView removeClippedSubviews={false}>
          {props.data.map((m, i) => (
            <Checkbox.Item
              key={m.name}
              status={m.checked ? 'checked' : 'unchecked'}
              onPress={() => {
                props.data[i].checked = !props.data[i].checked;
                props.setData([...props.data]);
              }}
              label={m.name}
            />
          ))}
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button onPress={props.onDismiss}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default ListChooser;
