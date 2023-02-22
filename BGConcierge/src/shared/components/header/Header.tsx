import CommonStyles from '@styles/common.style';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

function Header(): JSX.Element {

  const contentStyle = StyleSheet.compose(StyleSheet.create({
    title: {
      lineHeight: 48,  
      fontSize: 48,
      margin: 10, 
    }
  }).title, CommonStyles.Styles.mainText);
  
  return (
    <Appbar mode='center-aligned' style={{ backgroundColor: CommonStyles.Colors.primary}}> 
      <Appbar.Action icon={require('@assets/images/logo.png')} size={64}/>
      <Appbar.Content title="BG Concierge"  titleStyle={contentStyle}/>
    </Appbar>
  );
} 

export default Header;
