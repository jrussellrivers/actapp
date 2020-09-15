import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput, Image, Dimensions } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import {fetchPosts} from '../posts/postsSlice'
import {fetchComments, addComment, addCommentDB} from '../comments/commentsSlice'
import {Comments} from '../comments/Comments'
import {fetchLikes} from '../likes/likesSlice'
import {Likes} from '../likes/Likes'
import {fetchUser} from '../user/userSlice'
import {changePage} from '../pageSlice'
import {fetchProfileById} from '../user/profileByIdSlice'
import Icon from 'react-native-vector-icons/FontAwesome'

export const Feed = () => {

    let width = Dimensions.get('window').width; //full width
    let height = Dimensions.get('window').height;

    const [addCommentShowing,setAddCommentShowing] = useState(false)

    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    const comments = useSelector(state => state.comments)
    const likes = useSelector(state => state.likes)
    const token = useSelector(state => state.token)
    console.log(token, '18')
    const user = useSelector(state => state.user.user)

    const postStatus = useSelector(state => state.posts.status)
    const postsError = useSelector(state => state.posts.error)
    const commentsStatus = useSelector(state => state.comments.status)
    const commentsError = useSelector(state => state.comments.error)
    const likesStatus = useSelector(state => state.likes.status)
    const likesError = useSelector(state => state.likes.error)
    const userStatus = useSelector(state => state.user.status)
    const userError = useSelector(state => state.user.error)

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

    // This fetches the User
    useEffect(() => {
        if (userStatus === 'idle') {
                dispatch(fetchUser(token.token))
            }
        }, [userStatus, dispatch])

    let content

    // This checks to see if all Posts
    if (postStatus === 'loading' || commentsStatus === 'loading' || likesStatus === 'loading' || userStatus === 'loading') {
        content = <Text>Loading...</Text>
    } else if (postStatus === 'succeeded' && commentsStatus === 'succeeded' && likesStatus === 'succeeded' && userStatus === 'succeeded') {
        // Sort posts in reverse chronological order by datetime string
        console.log(posts.posts)
        console.log(comments.comments)
        console.log(likes.likes)
        console.log(user, '68')
        const orderedPosts = posts.posts
        .slice()
        .sort((a, b) => b.date_posted.localeCompare(a.date_posted))

        content = orderedPosts.map(post => {
            let postComments = comments.comments.filter(comment=>comment.post_id === post.id ? true : false)
            let postLikes = likes.likes.filter(like=>like.post_id === post.id ? true : false)
            let readableDate = new Date(`${post.date_posted}`).toDateString()
            let currentTimestamp = new Date()
            console.log('readable date:', readableDate)
            console.log('post.date_posted:', post.date_posted)
            console.log('currentTimestamp:', currentTimestamp)

            return (
                <View key={post.id} style={styles.postContainer}>
                    <View style={styles.userWhoPosted}>
                        <Image 
                            source={{uri: post.picurl}} 
                            style={{height: 40, width: 40,borderRadius:50,marginRight:7}}
                        />
                        <Text style={styles.bold} onPress={() => {
                            dispatch(fetchProfileById(post.user_id))
                            dispatch(changePage('profile'))
                        }}>{post.username}</Text>
                        {/* <Text onPress={() => {
                            dispatch(changePage('post'))
                            dispatch(fetchPostById(post.id))
                        }}>Link to Post</Text> */}
                        <Text>{readableDate}</Text>
                    </View>
                    <View>
                        <Image 
                            source={{uri: post.picurl}} 
                            style={{height: width, width: width}}
                        />
                    </View>
                    <View style={styles.flex}>
                        <Likes postLikes={postLikes} postId={post.id} user={user}/>
                        <Icon style={styles.marginTop} name="comment-o" size={30} onPress={() => setAddCommentShowing(!addCommentShowing)} />
                    </View>
                    {postLikes.length === 0 ? null :
                    postLikes.length === 1 ? <Text style={styles.likesNum}>{postLikes.length} like</Text> : <Text style={styles.likesNum}>{postLikes.length} likes</Text>
                    }
                    <View style={styles.postText}>
                        <Text style={styles.bold}>{post.username}</Text>
                        <Text style={styles.spaceLeft}>{post.body}</Text>
                    </View>
                    <View>
                        <Comments postComments={postComments} postId={post.id}/>
                        {addCommentShowing ? 
                        <TextInput style={styles.addComment} onSubmitEditing={(evt)=>{
                                dispatch(addComment({
                                    comment: evt.target.value, 
                                    created_at: new Date().toUTCString(), 
                                    post_id: post.id, 
                                    username: user.username
                                }))
                                addCommentDB(evt.target.value, post.id, user.id, user.username)
                                evt.target.value = ''
                            }} placeholder='Add a Comment' />
                        : null }
                    </View>
                </View>
                )
        })
    } else if (postStatus === 'failed' || commentsStatus === 'failed' || likesStatus === 'failed' || userStatus === 'failed') {
        content = <Text>{postsError}, {commentsError}, {likesError}, {userError}</Text>
    } 

    console.log(posts)
    console.log(comments)
    console.log(likes)
    console.log(user)
    // console.log(userStatus)
    // console.log(user)

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
            <View>{content}</View>
    )
    
}

const styles = StyleSheet.create({
    bold: {
        fontWeight:'700'
    },
    postContainer: {
        margin:10
    },
    spaceLeft: {
        marginLeft:5
    },
    flex: {
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        marginLeft:7
    },
    postText: {
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        marginLeft:7,
        marginTop:7
    },
    userWhoPosted: {
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        margin:7,
        alignItems:'center'
    },
    marginTop: {
        marginTop:3
    },
    likesNum: {
        fontSize:14,
        fontWeight:'bold',
        marginLeft:7
    },
    addComment: {
        marginTop:7,
        marginLeft:7
    }
})