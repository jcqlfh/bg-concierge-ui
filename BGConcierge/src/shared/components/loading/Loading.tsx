import React from 'react';
import {Image, View} from 'react-native';
import CommonStyles from '@shared/styles/common.style';
import { Text } from 'react-native-paper';

function Loading(props: {text: string}): JSX.Element {

  return (
    <View style={[CommonStyles.Styles.expandSize, CommonStyles.Styles.centerContent]}>
      <Image source={require('@assets/images/loading.gif')} />
      <Text>{props.text}</Text>
    </View>
  );
}

export default Loading;
