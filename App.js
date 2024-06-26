import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/register';
//import ResultsScreen from './screens/ResultsScreen';
import StartScreen from './screens/start';
import LoginScreen from './screens/login';
import OptionsScreen from './screens/options';
import CameraScreen from './screens/camera';
import GalleryScreen from './screens/imagePicker1';
import PreviouScans from './screens/PreviousScans';
import AnalysisScreen from './screens/ResultsScreen';

const Stack = createNativeStackNavigator();

export default function App(){
  
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen options ={{headerShown: false }}  name="Start" component={StartScreen} />
        <Stack.Screen options ={{headerShown: false }}  name="Register" component={RegisterScreen} />
        <Stack.Screen options ={{headerShown: false }}  name="Login" component={LoginScreen} />
        <Stack.Screen options ={{headerShown: false }}  name="Options" component={OptionsScreen} />
        <Stack.Screen options ={{headerShown: false }}  name="Camera" component={CameraScreen} />
        <Stack.Screen options ={{headerShown: false }}  name="Gallery" component={GalleryScreen} />
        <Stack.Screen options ={{headerShown: false }}  name="Previous" component={PreviouScans} />
        <Stack.Screen options ={{headerShown: false }}  name="Analysis" component={AnalysisScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
    )
}
 
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});