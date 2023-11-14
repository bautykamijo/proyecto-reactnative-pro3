import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { Component } from 'react';
import {auth, db} from '../firebase/config'

class Bucador extends Component {
    constructor(props){
        super(props);
        this.state = {
            usuaria: [],
            buscamos: '',
            results: [],
            error: '',
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot (docs => {
            let usu = []
            docs.forEach(doc => {
                usu.push ({
                    id: doc.id,
                    dato: doc.data()
                })
            })

            this.setState ({
                usuaria: usu,
            });
        })
    }

}