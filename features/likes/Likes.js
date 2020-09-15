import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput} from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import {addLike, addLikeDB} from './likesSlice'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'

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
        button = <Icon name="like1" size={30} />
    } else {
        button = <Icon name="like2" size={30}
            onPress={()=>{
                dispatch(addLike({user_id: user.id, post_id: postId}))
                addLikeDB(postId, user.id)
        }} />
    }

    if(postLikes.length === 0) {
        return <View style={styles.margin}>{button}</View>
    } else {
        return (
            <View style={styles.margin}>
                <View>{button}</View>
            </View>
            //we will put logic for which friends liked it, and logic for if you yourself has liked it
        )
    }
}

const styles = StyleSheet.create({
    flex: {
        flex:1,
        flexDirection:'row',
        // marginLeft:5
    },
    margin:{
        marginRight:5,
        marginTop:5
    }
})