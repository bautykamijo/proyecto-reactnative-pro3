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
import { auth, db } from "../firebase/config";
import Post from '../components/Post';


class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            listaPost : []
        }
    }

    componentDidMount(){


        db.collection('posts').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
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
        <View style={styles.container}>
            <Text style={styles.textoBlanco}>Nombre de usuario: </Text>
            <Text style={styles.textoBlanco}>Email: {auth.currentUser.email}</Text>
            <Text style={styles.textoBlanco}>Mini bio: </Text>
            <Text style={styles.textoBlanco}>Foto de perfil: </Text>

         
            {this.state.listaPost.length === 0 ? 
                <View>
                    <ActivityIndicator size='large' color='white' />
                </View>
            :
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ onePost => onePost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } /> } />}

             

           <TouchableOpacity onPress ={() => this.logout()}>
        
                <Text>Logout</Text>
           </TouchableOpacity>
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
textoBlanco: {
    color: 'white',
    }
  })

export default User;