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

        if (!userName) {
            this.setState({ error: 'El campo de Usuario es obligatorio' });
            return;
        }

       else if (mail.includes('@') === false || mail.includes('.com') === false){
        this.setState({ error: "El email debe contener '@' y '.com'" });
            return;
       }

       else if (pass.length < 6){
        this.setState({ error: "La contraseña debe tener 6 o mas caracteres." });
            return;
       }
       
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
                <Text style={styles.blanco}>Registrarse</Text>
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
                maxLength={60}
                onChangeText={ text => this.setState({biografia:text}) }
                value={this.state.biografia} />
                <Text style={styles.limite}>{this.state.biografia.length}/60 caracteres</Text> 
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
               
               {this.state.email.length > 0 && this.state.password.length > 0 && this.state.usuario.length > 0   ? (
             <TouchableOpacity style={styles.textButton} onPress={ ()=>this.register(this.state.email, this.state.password, this.state.usuario, this.state.biografia )}>
                <Text style={styles.button}>Registrarse</Text>    
             </TouchableOpacity> 
            ) :(
            <TouchableOpacity style={styles.textButton} onPress={ ()=> this.setState({error: 'Es necesario completar todos los campos'})}>
                <Text style={styles.button}>Registrarse</Text>    
            </TouchableOpacity> 
            
            )}


                        {this.state.error.length > 0 
                        
                        ? 
                        
                        <Text style={styles.error}>{this.state.error}</Text> 
                    
                        : 
                        
                        false }


        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
            <Text style={styles.irAlogin}>Ya tengo cuenta. Ir al login</Text>
         </TouchableOpacity>
            </View>
        )
    }

}  

const styles = StyleSheet.create({
    formContainer:{
        flex : 1,
        backgroundColor: '#282c34',
        paddingHorizontal:10,
        marginTop: 20,
    },
    limite : {
        color: 'white',
        fontWeight : 500,
        marginBottom : 10
      },
    input:{
        backgroundColor : 'white',
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
        borderColor: '#28a745',
        color: 'white'

    },
    blanco:{
        color: 'white'
    },
    botonDeshabilitado: {
        backgroundColor: '#7f848e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    error: {
        color: 'rgb(209, 0, 0)',
        fontSize: 15,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop : 10,
        fontWeight : 600
    },
   irAlogin: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        fontSize: 15,
        color: 'white'
    }



})




export default Register;



