import React, {useState, useEffect} from "react"
import { Stylesheet, View, Text, TextInput } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import {fetchComments} from './commentsSlice'

export const Comments = ({postComments}) => {
    if (postComments.length === 0){
        return null
    } else if (postComments.length === 1){
        let readableDate = new Date(`${postComments[0].created_at}`).toDateString()
        return (
            <View key={postComments[0].id}>
                <Text>Single Comment:</Text>
                <Text>{postComments[0].username} {postComments[0].comment} {readableDate}</Text>
            </View>
        )
    } else {
        const orderedComments = postComments
        .slice()
        .sort((a, b) => b.created_at.localeCompare(a.created_at))

        let content = orderedComments.map(comment => {
            let readableDate = new Date(`${comment.created_at}`).toDateString()
            return (
                <View key={comment.id}>
                    <Text>Single Comment:</Text>
                    <Text>{comment.username} {comment.comment} {readableDate}</Text>
                </View>
            )
        })

        return (
            {content}
        )
    }
}