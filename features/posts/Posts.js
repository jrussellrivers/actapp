import React, {useState, useEffect} from "react"
import { Stylesheet, View, Text, TextInput } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import {fetchPosts} from './postsSlice'

export const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    // const comments = useSelector(state => state.comments)

    const postStatus = useSelector(state => state.posts.status)
    const postsError = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
          dispatch(fetchPosts())
        }
      }, [postStatus, dispatch])

    let content

    if (postStatus === 'loading') {
        content = <Text>Loading...</Text>
    } else if (postStatus === 'succeeded') {
        // Sort posts in reverse chronological order by datetime string
        console.log(posts.posts)
        const orderedPosts = posts.posts
        .slice()
        .sort((a, b) => b.date_posted.localeCompare(a.date_posted))

        content = orderedPosts.map(post => {
            let readableDate = new Date(`${post.date_posted}`).toDateString()
            return (
            <View key={post.id}>
                <View>
                    <Text>{post.username}</Text>
                    <Text>Link to Post Router</Text>
                </View>
                <View><Text>Image Here</Text></View>
                <View>
                    <Text>{post.body}</Text>
                </View>
            </View>
            )
        })
    } else if (postStatus === 'failed') {
        content = <Text>{postsError}</Text>
    }

    console.log(posts)

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