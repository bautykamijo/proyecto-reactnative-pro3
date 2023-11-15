// Post.js
import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

import User from '../screens/User';
import Comments from '../screens/Comments';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            commentText: '',
            comments: this.props.infoPost.datos.comments || [],
        };
    }

    componentDidMount() {
        let likes = this.props.infoPost.datos.likes;

        if (likes.length === 0) {
            this.setState({
                like: false,
            });
        }
        if (likes.length > 0) {
            likes.forEach(like => {
                if (like === auth.currentUser.email) {
                    this.setState({ like: true });
                }
            });
        }
    }

    likear() {
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
        })
            .then(() => this.setState({ like: true }));
    }

    dislikear() {
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
        })
            .then(() => this.setState({ like: false }));
    }


    render(){

        return(
            <View style={styles.formContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('User')} style={styles.perfilBox}>
                <Text>{this.props.infoPost.datos.owner}</Text>
                </TouchableOpacity>
                <Image style={styles.camera} source={{ uri: this.props.infoPost.datos.photo }} />
               
            <View style={styles.likesComments} >
                {this.state.like ?
                    <TouchableOpacity style={styles.button} onPress={() => this.dislikear()}>
                        <Text style={styles.textButton}><AntDesign name="heart" size={24} color="red" /></Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => this.likear()}>
                        <Text style={styles.textButton}><AntDesign name="heart" size={24} color="white" /></Text>
                    </TouchableOpacity>
                }

                    <TouchableOpacity style={styles.button} onPress={ () => this.props.navigation.navigate('Comments')}>
                    <Text style={styles.textButton}><FontAwesome5 name="comment" size={24} color="white" /></Text>
                    </TouchableOpacity>

            </View>

                <Text style={styles.perfilBox}>Likes: {this.props.infoPost.datos.likes.length}</Text>

                <FlatList
                    data={this.state.comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <Text>{item.user}: {item.text}</Text>
                        </View>
                    )}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: 500,
        backgroundColor: '#282c34',
        color : 'white'
    },
    camera: {
        width: '100vw',
        height: 350,
        marginVertical : 10
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#282c34',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 5,
        marginBottom : 8,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#282c34',
        height : 28,
        width: 62,
        display : 'flex',
        justifyContent: 'left'
    },
    textButton: {
        textAlign : 'left',
        fontSize : 18,
        color: '#fff',
        marginLeft : 10
    },
    texto : {
        fontSize: 14,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'left',
        marginBottom: 20,
        color : 'white'

    },
    likesComments : {
        display : 'flex',
        flexDirection:'row', 
    },
    perfilBox : {
        flex:1,
        flexDirection:'row',
        height: 50,
        width : 100,
        justifyContent : 'left',
        marginLeft : 5,
        marginTop : 15,
        marginBottom : 35
    },
    commentContainer: {
        marginVertical: 10,
    },
});

export default Post;
