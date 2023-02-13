import React from "react";
import { Text, TextInput } from "react-native-paper";
import { Image, View } from "react-native";

function Collection(props : {name: string, isEditable: boolean}): JSX.Element
{
    var imageSize = 84;
    return(
        <View style={{flexDirection: 'row', backgroundColor: '#04FD9420', marginTop: 20, marginHorizontal: 20, borderRadius: 10, padding: 10}}>
            <Image style={{height:imageSize, width: imageSize}} source={require('@assets/images/logo.png')}/>
            <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <Text style={{textAlign: 'center'}}>Collection Name</Text>
                <TextInput style={{textAlign: 'center', backgroundColor: 'transparent'}} editable={props.isEditable}>{props.name}</TextInput>
            </View>
        </View>
    );
}

export default Collection