import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'


const Post = ({postId}) => {
    console.log(postId)
    const dispatch = useDispatch()
    let content = `Post id = ${postId}`
    return (
        <View>
            <Text>{content}</Text>
            <Text onPress={() => {
                    dispatch(changePage('feed'))
                }}>Return to Feed</Text>
        </View>
    )
}

export default Post
