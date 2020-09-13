import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'



const Post = () => {
    const dispatch = useDispatch()
    const postById = useSelector(state => state.postById.postById)

    const postByIdStatus = useSelector(state => state.postById.status)
    const postByIdError = useSelector(state => state.postById.error)

    let content

    if (postByIdStatus === 'loading') {
        content = <Text>Loading...</Text>
    } else if (postByIdStatus === 'succeeded'){
        console.log(postById, '26')
        content = 
        <View>
            <Text>{postById.body}</Text>
        </View>
    } else if (postByIdStatus === 'failed'){
        content = <Text>{postByIdError}</Text>
    }


    return (
        <View>
            {content}
        </View>
    )
}

export default Post
