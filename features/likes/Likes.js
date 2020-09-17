import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput} from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import {addLike, addLikeDB} from './likesSlice'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import {changeStatus} from '../posts/postsSlice'

export const Likes = ({postLikes, post, user}) => {
    const dispatch = useDispatch()

    const checkPoints = async (post, likes) => {
        // XXXXXXXXXXX fetch likes, filter to post, use that length

        console.log('checkpoints')
        // CHANGE THIS NUMBER TO UPDATE POINT THRESHOLD 
        if (likes.length === 9){
            let author = await fetch(`http://localhost:3333/user/${post.user_id}`)
            .then(res=>res.json())
            .then(data=>data)

            let value = author.points + post.points
            await fetch(`http://localhost:3333/updatePoints/${value}/${author.id}`, {method:'post'})
            await fetch(`http://localhost:3333/updatePointsStatus/${post.id}`, {method:'post'})
        }
    }

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
                dispatch(addLike({
                    user_id: user.id, 
                    post_id: post.id, 
                    post_username: post.username,
                    created_at: new Date().toUTCString(),
                    username: user.username
                }))
                addLikeDB(post.id, user.id, post.username, user.username)
                post.points_awarded === false ? checkPoints(post, postLikes) : null
        }} />
    }

    if(postLikes.length === 0) {
        return <View style={styles.margin}>{button}</View>
    } else {
        return (
            <View style={styles.margin}>
                <View>{button}</View>
            </View>
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