import React from 'react';
import { Text } from 'react-native-paper';
import { View } from 'react-native';


function Title(props: {text:string}): JSX.Element {

    var barSize = props.text.length * 12;
    
    return (
        <View>
        <Text style={{height:30, marginTop: 50, fontFamily: 'BellotaText', fontSize: 22, textAlign: 'center'}}>{props.text}</Text>
        <View
            style={{
                alignSelf: 'center',
                height: 1,
                width: barSize,
                marginBottom: 50,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
        />
        </View>
    );
}

export default Title;