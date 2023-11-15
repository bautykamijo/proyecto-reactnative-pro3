import react, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import MyCamera from "../components/MyCamera";

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
      <View>

        {this.state.showCamera ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} /> : 

        <>

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
          <Text style={styles.textButton}>Postear</Text>
        </TouchableOpacity>
        </> }
      </View>
    );
  }
}
const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: 10,
      backgroundColor: '#282c34',
      marginTop: 20,
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
      backgroundColor: "blue",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745",
    },
    textButton: {
      color: "#fff",
    },
  });

export default PostForm;
