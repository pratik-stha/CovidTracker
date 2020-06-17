import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Button} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import MainScreen from './Screens/main';
import VisualScreen from './Screens/Visualization';
import TryPage from './Screens/trypage';
import HistoryScreen from './Screens/SearchHistory';
import MapScreen from './Screens/MapView'; 
 
export default function App() {

  const Stack = createStackNavigator();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Main" component={MainScreen} options={{  title: 'Home', headerStyle: {
          backgroundColor: '#3b8a88',
        },
        headerTintColor: 'blue',
        headerTitleStyle: {
          color: 'yellow',
          textAlign: 'center',
          alignSelf: 'center'
        },}} />
      
    <Stack.Screen name="Visuals" component={TryPage} options={{ title:'Statistics',headerStyle:{backgroundColor:'#3b8a88'} ,headerTitleStyle:{color:'yellow',textAlign:'center', alignSelf: 'center'}}}/>
    <Stack.Screen name="History" component={HistoryScreen} options={{ title:'Search History',headerStyle:{backgroundColor:'#3b8a88'} ,headerTitleStyle:{color:'yellow',textAlign:'center', alignSelf: 'center'}}}/>
    <Stack.Screen name="Maps" component={MapScreen} options={{ title:'Map View',headerStyle:{backgroundColor:'#3b8a88'} ,headerTitleStyle:{color:'yellow',textAlign:'center', alignSelf: 'center'}}}/>
  
    </Stack.Navigator>
  </NavigationContainer>
  </TouchableWithoutFeedback>
  
    );
  
  
  
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
