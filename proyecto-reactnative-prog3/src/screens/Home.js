import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from "react-native";

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            valor : ''
        }
    }

   

    render(){
    return(
        <View>
            <Text>Hola mundo!</Text>
        </View>
    )}
};

export default Home;