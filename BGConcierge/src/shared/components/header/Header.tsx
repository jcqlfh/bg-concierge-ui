import CommonStyles from '@shared/styles/common.style';
import React, {useContext} from 'react';
import {Divider, Text} from 'react-native-paper';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {SuggestionContext} from '@shared/context/SuggestionContext';

function Header(props: {onPress: () => void}): JSX.Element {
  const contentStyle = StyleSheet.compose(
    StyleSheet.create({
      title: {
        lineHeight: 48,
        fontSize: 48,
        position: 'absolute',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 10
      },
    }).title,
    CommonStyles.Styles.mainText,
  );

  const context = useContext(SuggestionContext);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: CommonStyles.Colors.primary,
        }}>
        <Image
          style={[{marginHorizontal: 20}, CommonStyles.Styles.squareSize64]}
          source={require('@assets/images/logo.png')}
        />
        <Text style={contentStyle}>BG Concierge</Text>
      </View>
      <Divider />
      <TouchableHighlight activeOpacity={0.6}>
        <View 
          onTouchEndCapture={props.onPress}
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            backgroundColor: CommonStyles.Colors.tertiary,
          }}>
          <View
            style={{
              marginHorizontal: 22,
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Image
              style={CommonStyles.Styles.squareSize24}
              source={require('@assets/images/collection.png')}
            />
            <Text>Collection</Text>
          </View>
          <Text
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              textAlign: 'center',
              textAlignVertical: 'center',
              padding: 20,
              fontSize: 16,
            }}>
            {context.value.collection || 'NOT DEFINED'}
          </Text>
        </View>
      </TouchableHighlight>
      <Divider />
    </View>
  );
}

export default Header;
