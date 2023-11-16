import react, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import MyCamera from "../components/MyCamera";
import { FontAwesome } from '@expo/vector-icons'; 


import { auth, db } from "../firebase/config";



class PostForm extends Component {

  constructor(props) {
    super(props);
    this.state = { post: "",
                   showCamera: true, 
                   url: ''}
    }


  postear(){
    db.collection("posts").add({
        owner: auth.currentUser.email,
        post: this.state.post,
        photo: this.state.url,
        likes: [],
        createdAt: Date.now()
    })
    .then(
      this.props.navigation.navigate("Home")
     )
    .catch(error => console.log(`El error fue: ${error}`))
  }

  onImageUpload(url){
    this.setState({ url: url , showCamera: false});
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.showCamera ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} /> : 

        <>
         <View style={styles.botonInput}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ post: text })}
          placeholder="Escribe tu mensaje aqui..."
          keyboardType="default"
          value={this.state.post}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.postear()}>
          <FontAwesome name="send" size={26} color="white" />
        </TouchableOpacity>
        </View>
        </> }
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex : 1,
      paddingHorizontal: 10,
      backgroundColor: '#282c34',
      marginTop: 20,
    },
    input: {
      width : '80%',
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10,
      backgroundColor : 'white'
    },
    button: {
      backgroundColor: '#282c34',
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginTop: 14,
      marginBottom : 8,
      textAlign: 'center',
      height : 20,
      width: '20%',
      display : 'flex',
      justifyContent: 'center',
      alignContent : "center",
      alignItems : "center",
    },
    botonInput : {
      display : 'flex',
      flexDirection:'row', 
      marginTop : 30
      },
    textButton: {
      color: "#fff",
    },
  });

export default PostForm;
