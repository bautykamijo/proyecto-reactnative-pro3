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
            loggedIn: false

        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
          if (user) {
            this.props.navigation.navigate("Menu");
          }
        });
      }

    register(mail, pass){
        auth.createUserWithEmailAndPassword(mail, pass)
         .then( response => {
             this.setState({registered: true});
          })     
         .catch( error => {
           this.setState({error: 'Fallo en el registro.'})
         })
      }


    userDatos(name, bio){
        db.collection('users').add(
            {userName : name,
            biografia : bio,
            createdAt : Date.now()
            })
        .then(console.log('Datos del usuario'))
        .catch(error => console.log(`El error fue: ${error}`))
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
                <TouchableOpacity style={styles.button} onPress={() => {this.register(this.state.email, this.state.password); this.userDatos(this.state.usuario, this.state.biografia);}}>
                    <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
                <Text>Ya tienes cuenta? </Text><TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}><Text>Ir al Login</Text></TouchableOpacity>

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
    }

})




export default Register;



