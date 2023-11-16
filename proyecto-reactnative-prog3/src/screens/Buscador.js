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
import {auth, db} from '../firebase/config'

class Buscador extends Component {

    constructor(props){
        super(props);
        this.state = {
            usuario: [],
            buscamos: '',
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
                    dato: doc.data()
                })
            })


            this.setState ({
                usuario: usu,
            });
            console.log(this.state.usuario)
        })

      
    }


    render(){
        return(
            <View style={styles.container}>
                <Text>Este es el buscador</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding : 30,
      backgroundColor: '#282c34',
      color : 'white'
    },
  })

export default Buscador;