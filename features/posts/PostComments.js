import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'



const PostComments = ({postId, comments, posts}) => {
    let postComments = comments.filter(comment=>comment.post_id === postId ? true : false)
    let singlePost = posts.find(post => post.id === postId ? true : false)
    console.log(singlePost)
    let readableDate = new Date(`${singlePost.date_posted}`).toDateString()

    const orderedComments = postComments
    .slice()
    .sort((a, b) => a.created_at.localeCompare(b.created_at))

    let content = orderedComments.map((comment, idx) => {
        let readableDate = new Date(`${comment.created_at}`).toDateString()
        return (
            <View key={idx}>
                <Text>{comment.username} {comment.comment} {readableDate}</Text>
            </View>
        )
    })

    return (
        <View>
            <Text>{singlePost.username} {singlePost.body} {readableDate}</Text>
            <Text>Comments:</Text>
            {content}
        </View>
    )
}

export default PostComments
