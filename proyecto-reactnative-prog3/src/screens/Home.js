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
            listaPost : []
        }
    }


    componentDidMount(){
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
                    <ActivityIndicator size='large' color='white' />
                </View>
           
            :
                    
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ onePost => onePost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } /> } />}

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
  })

export default Home;