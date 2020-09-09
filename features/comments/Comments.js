import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"

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
    } else if (postComments.length === 2){
        const orderedComments = postComments
        .slice()
        .sort((a, b) => a.created_at.localeCompare(b.created_at))

        let content = orderedComments.map(comment => {
            let readableDate = new Date(`${comment.created_at}`).toDateString()
            return (
                <View key={comment.id}>
                    <Text>{comment.username} {comment.comment} {readableDate}</Text>
                </View>
            )
        })

        return (
            <View>
                <Text>Comments:</Text>
                {content}
            </View>
        )
    } else {
        const orderedComments = postComments
        .slice()
        .sort((a, b) => a.created_at.localeCompare(b.created_at))

        let readableDateFirst = new Date(`${orderedComments[0].created_at}`).toDateString()
        let readableDateLast = new Date(`${orderedComments[orderedComments.length - 1].created_at}`).toDateString()
        let commentFirst = <View key={orderedComments[0].id}>
                                <Text>{orderedComments[0].username} {orderedComments[0].comment} {readableDateFirst}</Text>
                            </View>
        let commentLast = <View key={orderedComments[orderedComments.length - 1].id}>
                                <Text>{orderedComments[orderedComments.length - 1].username} {orderedComments[orderedComments.length - 1].comment} {readableDateLast}</Text>
                            </View>

        return (
            <View>
                <Text>Comments:</Text>
                {commentFirst}
                {commentLast}
                <Text>Link to Load More Comments!</Text>
            </View>
        )
    }
}