import React, { Component } from "react";
import {Camera} from 'expo-camera'
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { storage } from "../firebase/config";
import { AntDesign } from '@expo/vector-icons'; 




class MyCamera extends Component {
    constructor(props) {
        super(props);
        this.state = { permisos: false, photo: '', showCamera: true}
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(res => {
            if (res.granted === true) {
                this.setState({
                    permisos: true
                })
            }
        })
        .catch(e => console.log(e))
    }

    sacarFoto(){
        this.metodosCamara.takePictureAsync()
        .then( photo => {
            this.setState({
                photo: photo.uri,
                showCamera: false
            })
        })
        .catch(e => console.log(e))
    }

    rechazarFoto(){
        this.setState({
            showCamera: true,
        })
    }

    aceptarFoto(){
        fetch(this.state.photo)
        .then(res => res.blob())
        .then(image => {
           const ref = storage.ref(`photo/${Date.now()}.jpg`)
           ref.put(image)
           .then( () => {
            ref.getDownloadURL()
            .then( url => {
                this.props.onImageUpload(url)
            }
            )
        })
        })
        .catch(e => console.log(e))
    }

    render(){

        console.log(this.state.photo)
        return (
            <>
                {this.state.permisos ? 
                this.state.showCamera ?
                <View style={styles.formContainer} >
                    <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={metodosCamara => this.metodosCamara = metodosCamara}/>

                    <TouchableOpacity style={styles.button}onPress={() => this.sacarFoto()} >
                         <AntDesign name="camera" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.formContainer}>
                    <Image style={styles.camera} source={{uri: this.state.photo}} />
                    <TouchableOpacity style={styles.buttonVerde} onPress={() => this.aceptarFoto()}>
                        <AntDesign name="check" size={26} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonRojo} onPress={() => this.rechazarFoto()}>
                        <AntDesign name="close" size={26} color="white" />
                    </TouchableOpacity>
                </View>
                :
                <Text style={styles.limite}>Procesando los permisos de la camara ...</Text>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        widht: `100vw`,
    },
    limite : {
        color: 'white',
        fontWeight : 500,
        marginTop : 15
      },
    camera: {
        widht: '100%',
        height: '100%',
        marginBottom : 8
    },
    input: {
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
        backgroundColor: "#282c34",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        display : 'flex',
        marginBottom : 1,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        justifyContent: 'center',
        alignContent : "center",
        alignItems : "center",
        widht : '100%'
      },
    buttonRojo: {
      backgroundColor: "rgb(255, 0, 0)",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      display : 'flex',
      marginBottom : 1,
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'white',
      justifyContent: 'center',
      alignContent : "center",
      alignItems : "center",
      widht : '100%'
    },
    buttonVerde: {
        backgroundColor: "rgb(18, 252, 14)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        display : 'flex',
        marginBottom : 1,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        justifyContent: 'center',
        alignContent : "center",
        alignItems : "center",
        widht : '100%'
      },
    textButton: {
      color: "#fff",
    },
  });


export default MyCamera