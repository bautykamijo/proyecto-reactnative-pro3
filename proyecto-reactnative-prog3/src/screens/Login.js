import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { auth } from '../firebase/config';

class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

   /* componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.props.navigation.navigate("Menu");
          }
        });
      } */

    login (email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
        .then ((response) => {
            console.log ("Login si", response);
            this.props.navigation.navigate("Menu");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <View style = {StyleSheet.formContainer}>
                <Text>Login</Text>
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.login(this.state.email, this.state.password)}>
                <Text style={styles.textButton}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Register")}>
                <Text>No tengo cuenta. Registrarme.</Text>
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
    }

})
  
  export default Login;
  



