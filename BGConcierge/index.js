/**
 * @format
 */

import {AppRegistry, Dimensions, SafeAreaView} from 'react-native';
import App from './src/App';
import { Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './src/app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function Main() {
    var height = Dimensions.get('window').height;

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
