import CommonStyles from '@styles/common.style';
import React, { useContext } from 'react';
import {Appbar, Divider, Text} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import SuggestionContext from '../../context/SuggestionContext';

function Header(props: {onPress: () => void}): JSX.Element {
  const contentStyle = StyleSheet.compose(
    StyleSheet.create({
      title: {
        lineHeight: 48,
        fontSize: 48,
        margin: 10,
      },
    }).title,
    CommonStyles.Styles.mainText,
  );

  const context = useContext(SuggestionContext);

  
  return (
    <View onTouchEndCapture={props.onPress}>
      <Appbar
        mode="center-aligned"
        style={{backgroundColor: CommonStyles.Colors.primary}}>
        <Appbar.Action icon={require('@assets/images/logo.png')} size={64} />
        <Appbar.Content title="BG Concierge" titleStyle={contentStyle} />
      </Appbar>
      <Divider/>
      <View style={{flexDirection: 'row', alignContent: 'center', backgroundColor: CommonStyles.Colors.tertiary}}>
        <View style={{marginHorizontal: 22, marginVertical: 10, alignItems: 'center'}}>
          <Image style={CommonStyles.Styles.squareSize24}
            source={require('@assets/images/collection.png')}/>
          <Text>Collection</Text>
        </View>
        <Text style={{position: 'absolute', height: '100%', width: '100%', textAlign: 'center', textAlignVertical: 'center'}}>jcqlfh</Text>
      </View>
      <Divider/>
    </View>
  );
}

export default Header;
