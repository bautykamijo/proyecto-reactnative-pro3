import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";


import Home from "../screens/Home";
import PostForm from "../screens/PostForm";
import User from "../screens/User";

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

class Menu extends Component {
    constructor() {
      super();
      this.state = {
        valor : ''
      };
    }
  
    render() {
  
      return (
          <Tab.Navigator screenOptions={{ tabBarShowLabel: false } }>
              <Tab.Screen name="Home" component={Home} options={ 
	 { tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}} />
              <Tab.Screen name="PostForm" component={PostForm} options={ 
	 { tabBarIcon: () => <AntDesign name="plussquareo" size={24} color="black" /> }}/>
              <Tab.Screen name="User" component={User} options={ 
	 { tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }} />
          </Tab.Navigator>
      );
    }
  } 
  
  export default Menu;
