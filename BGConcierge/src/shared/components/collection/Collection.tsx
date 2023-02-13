import React from "react";
import { Text, TextInput } from "react-native-paper";
import { Image, View } from "react-native";
import { useSwipe } from "@hooks/useSwipe";

function Collection(props : {name: string, isEditable: boolean, onChange: (newItem: string) => void, isSelected: boolean, onSelected: (selected: string) => void, onDelete: () => void}): JSX.Element
{
    var imageSize = 84;

    const { onTouchStart, onTouchEnd } = useSwipe(() => props.isEditable && props.onDelete(), () => props.isEditable && props.onDelete(), 6)

    return(
        <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchEndCapture={() => props.onSelected(props.name)} style={{zIndex: 999, shadowColor: 'black', shadowOpacity: 1, shadowOffset: { width: 10, height: 10}, flexDirection: 'row', backgroundColor: props.isSelected ? '#04FD9420' : '#CCCCCC20', marginTop: 20, marginHorizontal: 20, borderRadius: 10, padding: 10}}>
            <Image style={{height:imageSize, width: imageSize}} source={require('@assets/images/collection.png')}/>
            <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <Text style={{textAlign: 'center', fontFamily: 'BellotaText'}}>Collection from BGG user</Text>
                <TextInput value={props.name} onChangeText={(text:string) => props.onChange(text)} style={{textAlign: 'center', backgroundColor: 'transparent'}} editable={props.isEditable}/>
            </View>
        </View>
    );
}

export default Collection