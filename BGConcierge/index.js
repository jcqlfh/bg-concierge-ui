/**
 * @format
 */

import {AppRegistry, SafeAreaView} from 'react-native';
import App from './src/App';
import { Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './src/app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function Main() {
    return (
    <PaperProvider style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
            <SafeAreaProvider style={{flex: 1}}>
                <App />
            </SafeAreaProvider>
        </SafeAreaView>
    </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
