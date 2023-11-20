import React, { Component } from 'react';
import {
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    Text,
    Image,
    StyleSheet,
    FlatList 
  } from "react-native";
import { auth, db } from "../firebase/config";
import { deleteAuthUser } from 'firebase/auth';
import Post from '../components/Post';
import { FontAwesome5 } from '@expo/vector-icons'; 



class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            listaPost : [],
            userEnUso : []
        }
    }

    componentDidMount(){



        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            usuario => {
                let usuarioIndicado = [];

                usuario.forEach( actual => {
                                usuarioIndicado.push(
                                    {id : actual.id,
                                    user : actual.data()})})

            this.setState({
                userEnUso : usuarioIndicado
            })

            })

        console.log(this.state.userEnUso);

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

    borrarPerfil() {
      const user = auth.currentUser;
  
      
      deleteAuthUser(user)
        .then(() => {
          console.log('Usuario eliminado correctamente de la autenticación');
  
          db.collection('users').doc(user.id).delete()
            .then(() => {
              console.log('Datos del usuario eliminados de la colección "users"');
              this.props.navigation.navigate('Login'); 
            })
            .catch((error) => {
              console.error('Error al eliminar datos del usuario:', error);
            });
        })
        .catch((error) => {
          console.error('Error al eliminar el usuario:', error);
        });
    }

    logout() {
        auth.signOut();
        this.props.navigation.navigate ("Login")
    }

   

    render() {
        return (
          <View style={styles.container}>
            {this.state.userEnUso.length > 0 ? (
              <>
                <Text style={styles.titulo}>Tu Perfil <TouchableOpacity style={styles.button} onPress={() => this.borrarPerfil()}><FontAwesome5 name="trash" size={20} color="white" /></TouchableOpacity></Text>
                <View style={styles.flexUno}>
                  <Text style={styles.textoBlanco}>
                  <strong>Username:</strong> {this.state.userEnUso[0].user.userName} 
                  </Text>
                  <Text style={styles.textoBlanco}>
                  <strong>Email:</strong> {auth.currentUser.email}
                  </Text>
                  <Text style={styles.textoBlanco}><strong>Biografia:</strong> {this.state.userEnUso[0].user.biografia}</Text>
                  {this.state.listaPost ?  <Text style={styles.textoBlancoPost}><strong>Posteos:</strong> {this.state.listaPost.length}</Text> :
                  <Text style={styles.textoBlancoPost}><strong>Posteos: </strong> 0</Text>}

                    <Image style={styles.fotoPerfil}  source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} resizeMode='contain'/> 
                  <TouchableOpacity onPress={() => this.logout()}>
                  <Text style={styles.textoBlanco}>Logout</Text>
                </TouchableOpacity>
                </View>
      
                <View style={styles.flexDos}> 
                 <FlatList
                    data={this.state.listaPost}
                    keyExtractor={(onePost) => onePost.id}
                    renderItem={({ item }) => <Post infoPost={item} navigation={this.props.navigation} />}
                  />
                </View>
      

              </>
            ) : (
              <View>
                <ActivityIndicator size='large' color="white" style={styles.loader}  />
              </View>
            )}
          </View>
        );
      }
      
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding : 30,
      backgroundColor: '#282c34',
      color : 'white'
    },
    titulo: {
      display : 'flex',
      justifyContent : 'center',
      fontWeight : 600,
      fontSize : 30,
      color: 'white',
      marginBottom : 30
      },
    textoBlanco: {
        color: 'white',
        marginBottom : 10
        },
        textoBlancoPost: {
          color: 'white',
          marginBottom : 10
          },
      flexUno: {
        flex : 1,
        },
        flexDos: {
          flex : 2
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
          fotoPerfil : {
            height: 40,
            width: 40,
            borderWidth: 1,
            borderRadius: 25,
            borderColor: 'rgb(240, 228, 228)',
            marginRight: 10
           },
            loader: {
            display : 'flex',
            flex : 1,
            justifyContent : 'center',
            marginTop : 300
          }
  })

export default User;