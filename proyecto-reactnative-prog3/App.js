import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Menu from './src/components/Menu'
import Register from './src/screens/Register';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
  
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
        name='Register'
        component={ Register }
        options={{headerShown : false}}  
        />
        <Stack.Screen
        name='Login'
        component={ Login }
        options={{headerShown : false}}  
        />
         <Stack.Screen
        name='Menu'
        component={ Menu }
        options={{headerShown : false}}  
        />




      </Stack.Navigator>
    </NavigationContainer>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
