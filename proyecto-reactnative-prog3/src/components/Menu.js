import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";


import Home from "../screens/Home";
import PostForm from "../screens/PostForm";
import Buscador from "../screens/Buscador";
import User from "../screens/User";


import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 




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

              <Tab.Screen  name="Home" component={Home} options={{
            headerShown: false,
            tabBarIcon: () => (
              <Entypo name="home" size={24} color="black" />)}} /> 

              <Tab.Screen name="PostForm" component={PostForm} options={{
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="plussquareo" size={24} color='black' />)}} /> 

              <Tab.Screen name="Buscador" component={Buscador} options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome name="search" size={24} color="black" />)}} /> 

              <Tab.Screen name="User" component={User} options={{
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="user" size={24} color='black' />)}} /> 

          </Tab.Navigator>
      );
    }
  } 
  
  export default Menu;
