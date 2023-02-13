/**
 * @format
 */
import React, { useState, useEffect } from 'react';
import {AppRegistry, Dimensions, Keyboard, SafeAreaView} from 'react-native';
import App from './src/App';
import { Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './src/app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function Main() {

    useEffect(() => {
        const keyboardShown = Keyboard.addListener('keyboardDidShow', (e) => {
            console.log("show");
            setHeight(Dimensions.get('window').height-e.endCoordinates.height);
        });
        const keyboardHidden = Keyboard.addListener('keyboardDidHide', () => {
            console.log("hide");
            setHeight(Dimensions.get('window').height);
        });
        const dimensionChanged = Dimensions.addEventListener('change', () => {
            console.log("hide");
            setHeight(Dimensions.get('window').height);
        });

        return () => {
            keyboardShown.remove();
            keyboardHidden.remove();
            dimensionChanged.remove();
        }

    })

    const [height, setHeight] = useState(Dimensions.get('window').height);

    return (
        <SafeAreaView style={{height: height}}>
            <SafeAreaProvider>
                <PaperProvider>
                    <App />
                </PaperProvider>
            </SafeAreaProvider>
        </SafeAreaView>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
