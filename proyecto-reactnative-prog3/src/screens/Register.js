import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { auth, db } from '../firebase/config';


class Register extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            registered : false,
            usuario : '',
            email : '',
            password : '',
            biografia : '',
            error: '',
            fotoDePerfil: '',
            loggedIn: false,

        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
          if (user) {
            this.props.navigation.navigate("Menu");
          }
        });
      }

    register(mail, pass, userName, biografia){
       
        auth.createUserWithEmailAndPassword(mail, pass)
         .then( response => {
            console.log(response);
            db.collection('users').add({
                    owner: mail,
                    createdAt: Date.now(),
                    userName : userName,
                    biografia : biografia,
                    })
            
             this.setState({registered: true});
          })     
         .catch( error => {
           this.setState({error: 'Fallo en el registro.'})
         })
      }
    

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Registrarse</Text>
                <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Username'
                onChangeText={ text => this.setState({usuario:text}) }
                value={this.state.usuario} />
                <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Biography'
                onChangeText={ text => this.setState({biografia:text}) }
                value={this.state.biografia} />
                <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={ text => this.setState({email:text}) }
                value={this.state.email} />
                <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Password'
                secureTextEntry={true} 
                onChangeText={ text => this.setState({password:text}) }
                value={this.state.password} />
               
               {!this.state.email || !this.state.password  ? (
            <TouchableOpacity style={styles.textButton} onPress={() => alert("Debe completar los campos obligatorios")}>
                <Text style={styles.button}>Registrarse</Text>
            </TouchableOpacity>
            ) :(
            <TouchableOpacity style={styles.textButton} onPress={()=>this.register(this.state.email, this.state.password, this.state.usuario, this.state.biografia )}>
                <Text style={styles.button}>Registrarse</Text>    
            </TouchableOpacity> 
            
            )}

        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
            <Text style={styles.irAlogin}>Ya tengo cuenta. Ir al login</Text>
         </TouchableOpacity>
            </View>
        )
    }

}  

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    botonDeshabilitado: {
        backgroundColor: '#7f848e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
   irAlogin: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        fontSize: 15,
    }



})




export default Register;



