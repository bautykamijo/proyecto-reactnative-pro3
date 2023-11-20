import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { auth } from '../firebase/config';

class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            email: "",
            password: "",
            recuerdame : false,
        };
    }

    login (email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
        .then ((response) => {
            console.log ("Login ok", response);
            this.props.navigation.navigate("Menu");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    controlarRecuerdame = () => {
        this.setState(estadoPrevio => ({ recuerdame: !estadoPrevio.recuerdame }));
    }
    

    render() {
        return (
            <View style = {styles.formContainer}>
                <Text style = {styles.blanco}>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder="Password"
                    keyboardType="default"
                    secureTextEntry={true}
                    value={this.state.password}
                />


                
                {(!this.state.email || !this.state.password)  ? (
            <TouchableOpacity style={styles.textButton} onPress={() => alert("Debe completar los campos obligatorios")}>
                <Text style={styles.button}>Ingresar</Text>
            </TouchableOpacity>
            ) :(
            <TouchableOpacity style={styles.textButton} onPress={()=>this.login(this.state.email, this.state.password)}>
                <Text style={styles.button}>Ingresar</Text>    
            </TouchableOpacity> 
            )}

        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
            <Text style={styles.irAregister}>No tengo cuenta. Ir a register</Text>
         </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formContainer:{
        flex : 1,
        backgroundColor: '#282c34',
        marginTop: 20,
    },
    blanco:{
        color: 'white'
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
        backgroundColor:'white',
    },
    button:{
        color : 'white',
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
    irAregister: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        fontSize: 15,
        color : 'white'
    }

})
  
  export default Login;
  



