import React, { Component } from 'react';
import {
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    FlatList 
  } from "react-native";

import {auth, db} from '../firebase/config'


class Comments extends Component {

    constructor(props){
        super(props);
        this.state = {
            valor : ''
        }}

        render(){
            return(
                <View>
                    <Text>Hola</Text>
                </View>
            )
                
            }
    }



        const styles = StyleSheet.create({
            container: {
              flex: 1,
              padding : 30,
              backgroundColor: '#282c34',
              color : 'white'
            },
          })
        
        


   
    export default Comments;

