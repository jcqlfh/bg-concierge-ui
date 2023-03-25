import CommonStyles from '@shared/styles/common.style';
import React from 'react';
import { Image, View } from 'react-native';

function Splash(props: {setSplashOn:(splashOn: boolean) => void}): JSX.Element {

  setTimeout(() => props.setSplashOn(false) , 2000);

  return (
    <View style={[CommonStyles.Styles.expandSize, CommonStyles.Styles.centerContent]}>
      <Image source={require('@assets/images/splash.png')} />
    </View>
  );
}

export default Splash;
