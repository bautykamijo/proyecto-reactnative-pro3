import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            like: false,
        }}


    componentDidMount(){
        let likes = this.props.infoPost.datos.likes

        if(likes.length === 0){
            this.setState({
                like: false
            })
        }
        if(likes.length > 0){
            likes.forEach( like => {if (like === auth.currentUser.email) {
                this.setState({ like: true })
            }})
        }
        }


    likear(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(this.setState({like: true}))
        }
    

    dislikear(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(this.setState({like: false}))
        }


    render(){

        return(
            <View style={styles.formContainer}>
                <Text>Datos del Post</Text>
                <Text>{this.props.infoPost.datos.owner}</Text>
                <Text>Texto: {this.props.infoPost.datos.post}</Text>
                <Image style={styles.camera} source={{uri:this.props.infoPost.datos.photo }}/> 
                <Text>Likes: {this.props.infoPost.datos.likes.length}</Text>

               
                {this.state.like ? 
                <TouchableOpacity style={styles.button} onPress={()=>this.dislikear()}>
                    <Text style={styles.textButton} >Dislike</Text>
                    
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={()=>this.likear()}>
                    <Text style={styles.textButton} >Like</Text>
                </TouchableOpacity>
                }
                
                
            </View>
            )
        }


    


}


const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        width: `100vw`,
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10,
    },
    button: {
      backgroundColor: "salmon",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "salmon",
      width: "30%",
    },
    textButton: {
      color: "#fff",
    },
  });

    export default Post;