import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";

class User extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    logout() {
        auth.signOut();
        this.props.navigation.navigate ("Login")
    }

   

    render(){
    return(
        <View>
            <Text>Nombre de usuario: </Text>
            <Text>Email: {auth.currentUser.email}</Text>
            <Text>Mini bio: </Text>
            <Text>Foto de perfil: </Text>
           <TouchableOpacity onPress ={() => this.logout()}>
        
                <Text>Logout</Text>
           </TouchableOpacity>
        </View>
    )}
};

export default User;