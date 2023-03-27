import CommonStyles from '@shared/styles/common.style';
import React from 'react';
import { Image, View } from 'react-native';

function Splash(): JSX.Element {

  return (
    <View style={[CommonStyles.Styles.expandSize, CommonStyles.Styles.centerContent]}>
      <Image source={require('@assets/images/splash.png')} />
    </View>
  );
}

export default Splash;
