import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
function EscapeText(props: {
  text: string;
}): JSX.Element {
  const { width } = useWindowDimensions()
  return (
    <RenderHtml
        baseStyle={{textAlign: 'justify', height: 300}}
        source={{html: props.text}}
        contentWidth={width}
      />
  );
}

export default EscapeText;
