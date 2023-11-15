// CommentScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { db } from '../firebase/config';

const CommentScreen = ({ route }) => {
    const { postId } = route.params;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('posts').doc(postId).onSnapshot((snapshot) => {
            const postComments = snapshot.data()?.comments || [];
            setComments(postComments);
        });

        return () => unsubscribe();
    }, [postId]);

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text>{item.user}: {item.text}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentContainer: {
        marginVertical: 10,
    },
});

export default CommentScreen;
