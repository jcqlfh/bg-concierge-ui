import { StyleSheet } from "react-native";

const CommonStyles = {
    Styles: StyleSheet.create({
        expandSize: {
            flex: 1,
        },
        centerContent: {
            textAlign: 'center',
            textAlignVertical: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        squareSize64: {
            height: 64,
            width: 64,
        },
        secondaryText: {
            textAlign: 'center',
            fontFamily: 'BellotaText',
        },
        bottomButtonText: {
            textAlign: 'center',
            fontFamily: 'BellotaText',
            fontSize:32
        },
        absoluteOffset15: {
            position:'absolute', 
            top: -15
        },
        hidden: {
            height: 0,
            width: 0
        },
        defaultSpacing: {
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 10, 
            padding: 10
        },
        rowReverseCentered: {
            flexDirection:'row-reverse', 
            alignItems: 'center'
        },
        mainText: {
            fontFamily: 'BigelowRules',
            textAlign:'center'
        }
    }),
    Colors: 
    {
        primary: '#04FD9420',
        secondary: '#4504FD20',
        gray: '#CCCCCC20'
    }
};
  export default CommonStyles;