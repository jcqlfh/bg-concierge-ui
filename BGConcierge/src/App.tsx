import React, {useEffect, useState} from 'react';
import {Dimensions, Keyboard, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '@shared/components/header/Header';
import SetupView from './screens/setup/views/SetupView';
import SearchView from './screens/search/views/SearchView';
import SuggestionView from './screens/suggestion/views/SuggestionView';
import {
  SuggestionContext,
  SuggestionContextValueType,
} from '@shared/context/SuggestionContext';
import Splash from '@shared/components/splash/Splash';

function App() {
  const Stack = createNativeStackNavigator();
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [splashOn, setSplashOn] = useState(true)
  const [value, setValue] = useState({} as SuggestionContextValueType);

  useEffect(() => {
    const keyboardShown = Keyboard.addListener('keyboardDidShow', e => {
      setHeight(Dimensions.get('window').height - e.endCoordinates.height);
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
    };
  });
  
  setTimeout(() => setSplashOn(false) , 2000);

  if (splashOn) {
    return (<Splash/>);
  }
  else
  return (
    <SafeAreaView style={{height: height}}>
      <SafeAreaProvider>
        <PaperProvider>
          <SuggestionContext.Provider value={{value, setValue}}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Setup"
                  component={SetupView}
                  options={({navigation}) => ({ 
                    header: () => (
                      <Header onPress={() => navigation.navigate('Setup')} />
                    ), 
                  })}
                />
                <Stack.Screen
                  name="Search"
                  component={SearchView}
                  options={({navigation}) => ({
                    header: () => (
                      <Header onPress={() => navigation.navigate('Setup')} />
                    ),
                  })}
                />
                <Stack.Screen
                  name="Suggestion"
                  component={SuggestionView}
                  options={({navigation}) => ({
                    header: () => (
                      <Header onPress={() => navigation.navigate('Setup')} />
                    ),
                  })}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SuggestionContext.Provider>
        </PaperProvider>
      </SafeAreaProvider>
    </SafeAreaView>
  );
}

export default App;
