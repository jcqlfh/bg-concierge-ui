import CommonStyles from '@styles/common.style';
import React from 'react';
import {IconButton} from 'react-native-paper';

function CloseButton(props: {
  isVisible: boolean;
  onPress: () => void;
}): JSX.Element {
  return (
    <IconButton
      icon={'close-circle'}
      style={
        props.isVisible
          ? CommonStyles.Styles.absoluteOffset15
          : CommonStyles.Styles.hidden
      }
      onPress={props.onPress}
    />
  );
}

export default CloseButton;
