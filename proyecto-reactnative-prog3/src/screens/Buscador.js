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
import { FontAwesome } from '@expo/vector-icons';

class Buscador extends Component {

    constructor(props){
        super(props);
        this.state = {
            usuario: [],
            busqueda: '',
            results: [],
            error: '',
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let usu = []
            docs.forEach(doc => {
                usu.push ({
                    id: doc.id,
                    datos: doc.data()
                })
            })


            this.setState ({
                usuario: usu,
            });
            console.log(this.state.usuario)
        })

      
    }

    handleChanges(texto){
        this.setState({
            busqueda : texto
        })
    }

    buscarUsers(){
        const lower = this.state.busqueda.toLowerCase()
        const resultadosBusqueda = this.state.usuario.filter((user) => 
        user.datos.owner.toLowerCase().includes(lower));

        if (resultadosBusqueda.length === 0){
            this.setState({
                resultadosBusqueda : [],
                error : 'Ningun resultado coincide con tu busqueda...'
            });
        } 
        else if (this.state.busqueda === ''){
            this.setState({
                resultadosBusqueda : [],
                error : 'No puedes dejar este campo vacío...'
            })
        }
        else {
            this.setState({
                resultadosBusqueda : resultadosBusqueda,
                error : ''
            })
        }
    }

    render(){
        return(
            <ScrollView style={styles.buscador}>
            <View style={styles.botonInput}>
                <TextInput  style={styles.input}
                            keyboardType='default'
                            placeholder='Buscar perfil por email...'
                            onChangeText={(texto) => this.handleChanges(texto)}
                            value={this.state.busqueda}
                            />

                <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.buscarUsers()}>
                    <FontAwesome name="search" size={28} color="white" />
                </TouchableOpacity>
                </View>

                {this.state.error ? (<Text style={styles.blanco}>{this.state.error}</Text>
                
                    ) : (

                        <FlatList 
                                data={this.state.resultadosBusqueda}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <View>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileUser' , {dataUsuario : item.data})}>
                                            <Text style={styles.blanco}>{item.datos.owner}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                        
                        />
                    ) }

            
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    botonInput : {
        display : 'flex',
        flexDirection:'row', 
        marginTop : 30
        },
        blanco : {
            color : 'white',
            marginTop : 4
        },
    buscador: {
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: 1,
        minHeight: 'auto',
        paddingHorizontal: 15,
        backgroundColor: '#282c34',
        flex: 1,
        display: 'flex',
        flexDirection:'column'
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
  })

export default Buscador;