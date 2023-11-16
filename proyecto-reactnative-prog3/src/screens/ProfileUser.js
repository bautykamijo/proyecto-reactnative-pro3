import React, { Component } from 'react';
import {
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    FlatList, 
    ScrollView
  } from "react-native";
import {auth, db} from '../firebase/config'
import { FontAwesome } from '@expo/vector-icons';

class ProfileUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            usuario: [],
            busqueda: '',
            results: [],
            error: '',
        }
    }

    render(){
        return(
            <View style={styles.container}>
               
            </View>
        )}
    };
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding : 30,
          backgroundColor: '#282c34',
          color : 'white'
        },
        loader: {
            display : 'flex',
            flex : 1,
            justifyContent : 'center',
            marginTop : 300
        }
      })
    
    export default ProfileUser;