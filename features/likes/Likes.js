import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput} from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import {addLike, addLikeDB} from './likesSlice'
import { useDispatch } from 'react-redux'

export const Likes = ({postLikes, postId, user}) => {
    const dispatch = useDispatch()
    

    let userLikeStatus = false
    for (let i=0;i<postLikes.length;i++){
        if (postLikes[i].user_id === user.id){
            userLikeStatus = true
        }
    }

    let button

    if (userLikeStatus){
        button = <TouchableOpacity style={styles.TouchableOpacityPressed}><Text style={styles.TouchableText}>Click to Like</Text></TouchableOpacity>
    } else {
        button = <TouchableOpacity onPress={()=>{
            dispatch(addLike({user_id: user.id, post_id: postId}))
            addLikeDB(postId, user.id)
        }} style={styles.TouchableOpacityNotPressed}><Text style={styles.TouchableText}>Click to Like</Text></TouchableOpacity>
    }

    if(postLikes.length === 0) {
        return <View>{button}</View>
    } else {
        return (
            <View>
                <View>{button}</View>
                <Text>Likes: {postLikes.length}</Text>
            </View>
            //we will put logic for which friends liked it, and logic for if you yourself has liked it
        )
    }
}

const styles = StyleSheet.create({
    TouchableOpacityNotPressed: {
        backgroundColor:'blue',
    },
    TouchableOpacityPressed: {
        backgroundColor:'red',
    },
    TouchableText:{
        color:'white'
    }
})