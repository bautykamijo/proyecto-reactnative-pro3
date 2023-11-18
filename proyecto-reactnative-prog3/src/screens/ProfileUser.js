import React, { Component } from 'react';
import {
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    FlatList, 
    ScrollView
  } from "react-native";
import {auth, db} from '../firebase/config'
import { AntDesign } from '@expo/vector-icons'; 


class ProfileUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            usuario: [],
            listaPost: [],
        }
    }


    componentDidMount(){

        if (this.props.route.params.dataUsuario.owner === auth.currentUser.email) {
            this.props.navigation.navigate("User");
          }

        console.log(this.props.route.params.dataUsuario)
        console.log(auth.currentUser)
        let profile = this.props.route.params.dataUsuario.owner 



            db.collection('users').where('owner', '==', profile).onSnapshot(
                usuario => {
                    let usuarioIndicado = [];
    
                    usuario.forEach( actual => {
                                    usuarioIndicado.push(
                                        {id : actual.id,
                                        user : actual.data()})})
    
                this.setState({
                            usuario : usuarioIndicado}, () => {console.log(this.state.usuario)});

    
                })
    
    


    
            db.collection('posts').where('owner', '==', profile).orderBy('createdAt', 'desc').onSnapshot(
                posteos => {
                    let postsARenderizar = [];
    
                    posteos.forEach( onePost => {
                                    postsARenderizar.push(
                                        {id : onePost.id,
                                        datos : onePost.data()})})
    
                this.setState({
                    listaPost : postsARenderizar,
                })
               
               
                }
            )
        }
    
    
    



    render(){
        return(
            <View style={styles.container}>

               <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Menu")} style={styles.button}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>

            {this.state.userEnUso.length > 0 ? (
              <>
                <Text style={styles.titulo}>Perfil de: {this.state.usuario.datos.userName}</Text>
                <View style={styles.flexUno}>
                  <Text style={styles.textoBlanco}>
                  <strong>Email:</strong> {this.state.usuario.datos.owner}
                  </Text>
                  <Text style={styles.textoBlanco}><strong>Biografia:</strong> {this.state.usuario.datos.biografia}</Text>
                  <Text style={styles.textoBlanco}><strong>Biografia:</strong> {this.state.userEnUso[0].user.biografia}</Text>
                  {this.state.listaPost ?  <Text style={styles.textoBlancoPost}><strong>Posteos:</strong> {this.state.listaPost.length}</Text> :
                  <Text style={styles.textoBlancoPost}><strong>Posteos: </strong> 0</Text>}

                    <Image style={styles.fotoPerfil}  source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} resizeMode='contain'/>
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
        )}
    };
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding : 30,
          backgroundColor: '#282c34',
          color : 'white'
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
                },
        loader: {
            display : 'flex',
            flex : 1,
            justifyContent : 'center',
            marginTop : 300
        }
      })
    
    export default ProfileUser;