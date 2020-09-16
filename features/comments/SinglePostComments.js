import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'


export const SinglePostComments = ({orderedComments}) => {
    if (orderedComments.length === 0){
        return (null)
    } else {

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
                {content}
            </View>
        )
    }
}