import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { auth } from '../firebase/config';


class Register extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            registered : false,
            usuario : '',
            email : '',
            password : ''

        }
    }

    register(mail, pass){
        auth.createUserWithEmailAndPassword(email, pass)
         .then( response => {
             this.setState({registered: true});
          })     
         .catch( error => {
           this.setState({error: 'Fallo en el registro.'})
         })

         
      }
     

    render(){
        return(
            <View>
                <Text>Registrarse</Text>
                <TextInput
                keyboardType='default'
                placeholder='Username'
                onChangeText={ text => this.setState({usuario:text}) }
                value={this.state.usuario} />
                <TextInput
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={ text => this.setState({email:text}) }
                value={this.state.email} />
                <TextInput
                keyboardType='default'
                placeholder='Password'
                secureTextEntry={true} 
                onChangeText={ text => this.setState({password:text}) }
                value={this.state.password} />
                <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password)}>
                    <Text>Resgistrarse</Text>
                </TouchableOpacity>

            </View>
        )
    }

}

export default Register;

const styles = StyleSheet.create({

})