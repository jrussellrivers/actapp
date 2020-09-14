import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {fetchPostById} from '../posts/postByIdSlice'


export const ProfilePosts = ({posts}) => {
    const dispatch = useDispatch()

    if (posts.length === 0){
        return null
    // } else if (posts.length > 0 && posts.length < 4){
    //     let readableDate = new Date(`${posts[0].created_at}`).toDateString()
    //     return (
    //         <View key={posts[0].id}>
    //             <Text>Comments:</Text>
    //             <Text>{posts[0].username} {posts[0].comment} {readableDate}</Text>
    //         </View>
    //     )
    } else {

        let content = posts.map((post, idx) => {
            return (
                <View key={idx}>
                    <Text onPress={() => {
                        dispatch(fetchPostById(post.id))
                        dispatch(changePage('post'))
                    }}>Post id: {post.id}</Text>
                </View>
            )
        })

        return (
            <View>
                {content}
            </View>
        )
    } 
}