/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Dimensions, Keyboard, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Setup from './features/setup/Setup';
import Search from './features/search/Search';
import Header from '@components/header/Header';

function App() {
  const Stack = createNativeStackNavigator();
  const [height, setHeight] = useState(Dimensions.get('window').height);

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


  return (
      <SafeAreaView style={{height: height}}>
          <SafeAreaProvider>
              <PaperProvider>
                <NavigationContainer >
                  <Stack.Navigator>
                    <Stack.Screen name="Setup" component={Setup} 
                      options={{ header: (props) => <Header />}}
                    />
                    <Stack.Screen name="Search" component={Search} 
                      options={{ header: (props) => <Header />}}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </PaperProvider>
          </SafeAreaProvider>
      </SafeAreaView>
  );
}

export default App;
