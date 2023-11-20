// Post.js
import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

import User from '../screens/User';
import Comments from '../screens/Comments';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            commentText: '',
            comments: [],
            showComments: false,
            trashear: false
        };
    }

    componentDidMount() {
        let likes = this.props.infoPost.datos.likes;

        if (likes.length === 0) {
            this.setState({
                like: false,
            });
        }
        if (likes.length > 0) {
            likes.forEach(like => {
                if (like === auth.currentUser.email) {
                    this.setState({ like: true });
                }
            });
        }

        console.log(auth.currentUser);
    }

    
  
    
    



    likear() {
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
        })
            .then(() => this.setState({ like: true }));
    }

    dislikear() {
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
        })
            .then(() => this.setState({ like: false }));
    }
    comentar (comentario){
        let us = this.props.infoPost.datos.owner

        let newComment = {
            usuario : us,
            comentario : comentario
        };

        let photo = db.collection("posts").doc(this.props.infoPost.id);

        console.log(this.props.infoPost.datos.comments);

        photo.update({
            comments: firebase.firestore.FieldValue.arrayUnion(newComment)
        })
    }

    borrar(id) {
        db.collection('posts').doc(id).delete()
          .then(() => {
            console.log('Post eliminado correctamente')
          })
          .catch((error) => {
            console.log(error)
          })


         

      }


    render(){

        return(
            <View style={styles.formContainer}>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('ProfileUser', {dataUsuario : this.props.infoPost.datos})} style={styles.perfilBox}>
                <Image style={styles.fotoPerfil}  source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} resizeMode='contain'/> 
                <Text style={styles.usuario} >{this.props.infoPost.datos.owner}</Text>
                </TouchableOpacity>
                <Image style={styles.camera} source={{ uri: this.props.infoPost.datos.photo }} />
               
            <View style={styles.likesComments} >
                {this.state.like ?
                    <TouchableOpacity style={styles.button} onPress={() => this.dislikear()}>
                        <AntDesign name="heart" size={24} color="red" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => this.likear()}>
                        <AntDesign name="heart" size={24} color="white" />
                    </TouchableOpacity>
                }
                {this.props.infoPost.datos.comments ?
                <Text style={styles.cantLikes}><strong>{this.props.infoPost.datos.likes.length}</strong> like/s y <strong>{this.props.infoPost.datos.comments.length}</strong> comentario/s</Text> : 
                <Text style={styles.cantLikes}><strong>{this.props.infoPost.datos.likes.length}</strong> like/s y <strong>0</strong> comentario/s</Text> }


                {auth.currentUser.email === this.props.infoPost.datos.owner && 
                    (
                    <TouchableOpacity style={styles.buttonTrash} onPress={() =>
                        auth.currentUser.email === this.props.infoPost.datos.owner && (this.setState({trashear : true}))
                      }>
                    <FontAwesome5 name="trash" size={24} color="white" />
                    </TouchableOpacity>
                    )}

            {this.state.trashear === true && (
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonVerde} onPress={() => this.borrar(this.props.infoPost.id)}>
                <FontAwesome5 name="trash" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRojo} onPress={() => this.setState({trashear : false})}>
                <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>
            )}



            </View>
            <Text style={styles.cantLikes}>{this.props.infoPost.datos.post}</Text>
            
            <View style={styles.cris}>
            <TextInput
                        style={styles.input}
                        onChangeText={(texto) => this.setState({ commentText: texto })}
                        placeholder="Comenta aqui ..."
                        maxLength={40}
                        keyboardType="default"
                        value={this.state.commentText}
                    />
                    <TouchableOpacity style={styles.buttonComms} onPress={ () => this.comentar(this.state.commentText)}>
                    <FontAwesome5 name="comment" size={24} color="white" />
                    </TouchableOpacity>
                    </View>
                   

                    {this.props.infoPost.datos.comments && this.props.infoPost.datos.comments.length > 0 ? (
  <FlatList
    data={this.props.infoPost.datos.comments.slice(-4).reverse()}
    keyExtractor={(ok) => ok.id}
    renderItem={({ item }) => (
      <TouchableOpacity>
        <View styles={styles.comentarioUsuario}>
          <Text style={styles.textoComment}><Text style={styles.mailComment}>{auth.currentUser.email}</Text> {item.comentario}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
) : (
  <View>
    <Text style={styles.cantLikes}>No hay comentarios en este post...</Text>
  </View>
)}

               

            </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: 500,
        backgroundColor: '#282c34',
        marginTop : 150,
        marginBottom : 80,
        color : 'white',  
    },
    buttonContainer: {
        height: `60vh`,
        widht: `100vw`,
    },
    cris : {
        display : 'flex',
        flexDirection : 'row',
    },
    camera: {
        width: '100vw',
        height: 350,
        marginVertical : 10
    },
    input: {
        height: 20,
        width: '85%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        color : 'white'
        
    },
    botonInput : {
        display : 'flex',
        flexDirection:'row', 
        marginTop : 30
        },
    button: {
        backgroundColor: '#282c34',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 5,
        marginBottom : 8,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#282c34',
        height : 28,
        width: 62,
        display : 'flex',
        justifyContent: 'left'
    },
    buttonRojo: {
        backgroundColor: "rgb(255, 0, 0)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        display : 'flex',
        marginBottom : 1,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        justifyContent: 'center',
        alignContent : "center",
        alignItems : "center",
        widht : '100%'
      },
      buttonVerde: {
          backgroundColor: "rgb(18, 252, 14)",
          paddingHorizontal: 10,
          paddingVertical: 6,
          textAlign: "center",
          display : 'flex',
          marginBottom : 1,
          borderRadius: 4,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'white',
          justifyContent: 'center',
          alignContent : "center",
          alignItems : "center",
          widht : '100%'
        },
    buttonTrash: {
        backgroundColor: '#282c34',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 5,
        marginBottom : 8,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#282c34',
        height : 28,
        width: 62,
        display : 'flex',
        justifyContent: 'right'
    },
buttonComms: {
    backgroundColor: '#282c34',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 5,
    marginBottom : 8,
    marginLeft : 10,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#282c34',
    height : 28,
    width: '20%',
    display : 'flex',
    justifyContent: 'left',

},
    textButton: {
        textAlign : 'left',
        fontSize : 18,
        color: '#fff',
        marginLeft : 10
    },
    usuario: {
        fontSize : 16,
        color: 'white',
        fontWeight : 700,
        paddingTop : 10,
        paddingLeft : 1
    },
    texto : {
        fontSize: 14,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'left',
        marginBottom: 20,
        color : 'white'

    },
    likesComments : {
        display : 'flex',
        flexDirection:'row', 
        flexWrap : 'wrap',
        marginBottom : 2
    },
    nestor : {
        display : 'flex',
        flexDirection:'row', 
        marginLeft : 5,
        marginTop : 15,
        marginBottom : 15,
        marginRight: 80,
        color : 'white'
    },
    cantLikes : {
        display : 'flex',
        flexDirection:'row', 
        marginLeft : 5,
        marginTop : 15,
        marginBottom : 15,
        color : 'white'

    },
    fotoPerfil : {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'rgb(240, 228, 228)',
        marginRight: 10
    },
    perfilBox : {
        flex:1,
        flexDirection:'row',
        height: 50,
        width : 100,
        justifyContent : 'left',
        marginLeft : 5,
        marginTop : 15,
        marginBottom : 50
    },
    commentContainer: {
        marginVertical: 10,
    },
    comentarioUsuario: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom : 10
      },
      mailComment: {
        fontSize : 13,
        color: 'white',
        fontWeight : 700,
        paddingTop : 10,
        paddingLeft : 1
    },
      textoComment :{
        fontSize : 12,
        color : 'white'
      }
});

export default Post;
