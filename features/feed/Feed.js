import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import {fetchPosts} from '../posts/postsSlice'
import {fetchComments, addComment, addCommentDB} from '../comments/commentsSlice'
import {Comments} from '../comments/Comments'
import {fetchLikes} from '../likes/likesSlice'
import {Likes} from '../likes/Likes'
// import Icon from 'react-native-vector-icons'

export const Feed = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    const comments = useSelector(state => state.comments)
    const likes = useSelector(state => state.likes)

    const postStatus = useSelector(state => state.posts.status)
    const postsError = useSelector(state => state.posts.error)
    const commentsStatus = useSelector(state => state.comments.status)
    const commentsError = useSelector(state => state.comments.error)
    const likesStatus = useSelector(state => state.likes.status)
    const likesError = useSelector(state => state.likes.error)

    // This fetches all Posts
    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])
    
    // This fetches all Comments
    useEffect(() => {
    if (commentsStatus === 'idle') {
            dispatch(fetchComments())
        }
    }, [commentsStatus, dispatch])

    // This fetches all Likes
    useEffect(() => {
        if (likesStatus === 'idle') {
                dispatch(fetchLikes())
            }
        }, [likesStatus, dispatch])

    let content

    // This checks to see if all Posts
    if (postStatus === 'loading' || commentsStatus === 'loading' || likesStatus === 'loading') {
        content = <Text>Loading...</Text>
    } else if (postStatus === 'succeeded' && commentsStatus === 'succeeded' && likesStatus === 'succeeded') {
        // Sort posts in reverse chronological order by datetime string
        console.log(posts.posts)
        console.log(comments.comments)
        console.log(likes.likes)
        const orderedPosts = posts.posts
        .slice()
        .sort((a, b) => b.date_posted.localeCompare(a.date_posted))

        content = orderedPosts.map(post => {
            let postComments = comments.comments.filter(comment=>comment.post_id === post.id ? true : false)
            let postLikes = likes.likes.filter(like=>like.post_id === post.id ? true : false)
            let readableDate = new Date(`${post.date_posted}`).toDateString()

            return (
            <View key={post.id} style={styles.postContainer}>
                <View>
                    <Text style={styles.bold}>{post.username}</Text>
                    <Text>Link to Post Router</Text>
                    <Text>{readableDate}</Text>
                </View>
                <View><Text>Image Here</Text></View>
                {/* <Icon name="heart" /> */}
                <Likes postLikes={postLikes} />
                <View>
                    <Text>{post.body}</Text>
                </View>
                <View>
                    <Comments postComments={postComments} />
                    <TextInput onSubmitEditing={(evt)=>{
                            dispatch(addComment({
                                comment: evt.target.value, 
                                created_at: new Date().toUTCString(), 
                                post_id: post.id, 
                                username: 'dstonem'
                            }))
                            addCommentDB(evt.target.value, post.id)
                            evt.target.value = ''
                        }} placeholder='Add a Comment' />
                </View>
            </View>
            )
        })
    } else if (postStatus === 'failed' || commentsStatus === 'failed' || likesStatus === 'failed') {
        content = <Text>{postsError}, {commentsError}, {likesError}</Text>
    }

    console.log(posts)
    console.log(comments)
    console.log(likes)

    // this works
    // useEffect(()=>{
    //     console.log('fetching')
    //     fetch('http://localhost:3333/posts')
    //     .then(resp=>resp.json())
    //     .then(data=>{
    //         dispatch({type: 'fetchPosts', data: data})
    //     })
    // },[dispatch])

    // console.log(posts, postStatus, error)
    // const [postText,setPostText] = useState('')

    // const onChangeText = (text) => {
    //     setPostText(text)
    // }

    // if (!posts){
    //     return <Text>...Loading</Text>
    // } 
    // const renderedPosts = posts.map(post => (
    //     // <View className="post-excerpt" key={post.id}>
    //     //   <Text>{post.title}</Text>
    //     //   <Text>{post.content.substring(0, 100)}</Text>
    //     // </View>
    //         <Text key={post.id}>{post.body}</Text>
    //   ))

    return (
        <View>
            <View>{content}</View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    bold: {
        fontWeight:'700'
    },
    postContainer: {
        margin:10
    }
})