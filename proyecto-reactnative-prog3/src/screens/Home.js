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

import Post from '../components/Post';
import {auth, db} from '../firebase/config'


class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            listaPost : [],
            userEnUso : []
        }
    }


    componentDidMount(){


        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            (usuario) => {
                let usuarioIndicado = [];

                usuario.forEach( actual => {
                                usuarioIndicado.push(
                                    {id : actual.id,
                                    user : actual.data()})})

            this.setState({
                userEnUso : usuarioIndicado
            })

            }

        )

        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            posteos => {
                let postsARenderizar = [];

                posteos.forEach( onePost => {
                                postsARenderizar.push(
                                    {id : onePost.id,
                                    datos : onePost.data()})})

            this.setState({
                listaPost : postsARenderizar
        }, ()=>{

            console.log(this.state.listaPost);
        })
           
           
            }
        )

        
    }
   

    render(){
    return(
        <View style={styles.container}>
            {this.state.listaPost.length === 0 ? 

                <View>
                    <ActivityIndicator size='large' color='white' style={styles.loader} />
                </View>
           
            :
                    
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ onePost => onePost.id }
                        renderItem={ ({item}) => <Post infoPost={item}  navigation={this.props.navigation} /> } />}

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

export default Home;