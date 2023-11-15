import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";

class User extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){


        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            posteos => {
                let postsARenderizar = [];

                posteos.forEach( onePost => {
                                postsARenderizar.push(
                                    {id : onePost.id,
                                    datos : onePost.data()})})

            this.setState({
                listaPost : postsARenderizar
            })
           
           
            }
        )
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