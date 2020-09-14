import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProfileById} from '../user/profileByIdSlice'
import {SinglePostComments} from '../comments/SinglePostComments'
import {addComment, addCommentDB} from '../comments/commentsSlice'
import {Likes} from '../likes/Likes'




const Post = () => {
    const dispatch = useDispatch()
    const postById = useSelector(state => state.postById.postById)
    const user = useSelector(state => state.user.user)

    const postByIdStatus = useSelector(state => state.postById.status)
    const postByIdError = useSelector(state => state.postById.error)

    const comments = useSelector(state => state.comments.comments)
    const likes = useSelector(state => state.likes.likes)
    let postComments = comments.filter(comment=>comment.post_id === postById.id ? true : false)
    let orderedComments = postComments
        .slice()
        .sort((a, b) => a.created_at.localeCompare(b.created_at))
    let postLikes = likes.filter(like=>like.post_id === postById.id ? true : false)
    let readableDate = new Date(`${postById.date_posted}`).toDateString()

    let content

    if (postByIdStatus === 'loading') {
        content = <Text>Loading...</Text>
    } else if (postByIdStatus === 'succeeded'){
        content = 
            <View>
                <Text onPress={() => {
                        dispatch(fetchProfileById(postById.user_id))
                        dispatch(changePage('profile'))
                    }}>{postById.username}</Text>
                <Text>{readableDate}</Text>
                <View><Text>Image Here</Text></View>
                <Likes postLikes={postLikes} postId={postById.id} user={user}/>
                <Text>{postById.body}</Text>
                <Text>Comments:</Text>
                <SinglePostComments orderedComments={orderedComments}/>
                <TextInput onSubmitEditing={(evt)=>{
                            dispatch(addComment({
                                comment: evt.target.value, 
                                created_at: new Date().toUTCString(), 
                                post_id: postById.id, 
                                username: user.username
                            }))
                            addCommentDB(evt.target.value, postById.id, user.id, user.username)
                            evt.target.value = ''
                        }} placeholder='Add a Comment' />
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
