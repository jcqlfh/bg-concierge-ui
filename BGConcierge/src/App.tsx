import React, { useEffect, useState } from 'react';
import { Dimensions, Keyboard, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SetupView from './screens/setup/view/SetupView';
import SearchView from './screens/search/view/SearchView';
import Header from '@components/header/Header';

function App() {
  const Stack = createNativeStackNavigator();
  const [height, setHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
      const keyboardShown = Keyboard.addListener('keyboardDidShow', (e) => {
          setHeight(Dimensions.get('window').height-e.endCoordinates.height);
      });
      const keyboardHidden = Keyboard.addListener('keyboardDidHide', () => {
          setHeight(Dimensions.get('window').height);
      });
      const dimensionChanged = Dimensions.addEventListener('change', () => {
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
                    <Stack.Screen name="Setup" component={SetupView} 
                      options={{ header: (props) => <Header />}}
                    />
                    <Stack.Screen name="Search" component={SearchView} 
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
