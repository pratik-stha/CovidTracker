import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Button} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import MainScreen from './Screens/main';
import VisualScreen from './Screens/Visualization';
import TryPage from './Screens/trypage';
 
export default function App() {

  const Stack = createStackNavigator();

  return (
    
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Main" component={MainScreen} options={{          title: 'Home',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: 'blue',
          textAlign: 'center',
          alignSelf: 'center'
        },}} />
    
   
    <Stack.Screen name="Visuals" component={VisualScreen} options={{ title:'Visuals',headerStyle:{backgroundColor:'yellow'} ,headerTitleStyle:{color:'green',textAlign:'center', alignSelf: 'center'}}}/>
      
    <Stack.Screen name="Try" component={TryPage} options={{ title:'TryPage',headerStyle:{backgroundColor:'yellow'} ,headerTitleStyle:{color:'green',textAlign:'center', alignSelf: 'center'}}}/>
  
    </Stack.Navigator>
  </NavigationContainer>
  
    );
  
  
  
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
