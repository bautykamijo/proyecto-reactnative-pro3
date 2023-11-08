import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";

import Home from "../screens/Home";
import PostForm from "../screens/PostForm";
import User from "../screens/User";

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
          <Tab.Navigator>
              <Tab.Screen name="Home" component={Home}/>
              <Tab.Screen name="PostForm" component={PostForm}/>
              <Tab.Screen name="User" component={User}/>
          </Tab.Navigator>
      );
    }
  }
  
  export default Menu;