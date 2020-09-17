import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput, Image, Dimensions, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import {fetchPosts} from '../posts/postsSlice'
import {fetchComments, addComment, addCommentDB} from '../comments/commentsSlice'
import {Comments} from '../comments/Comments'
import {fetchLikes} from '../likes/likesSlice'
import {Likes} from '../likes/Likes'
import {fetchUser} from '../user/userSlice'
import {changePage} from '../pageSlice'
import {fetchProfileById} from '../user/profileByIdSlice'
import {fetchUserPics} from '../user/userPicsSlice'
import Icon from 'react-native-vector-icons/FontAwesome'

export const Feed = () => {

    const [addCommentShowing,setAddCommentShowing] = useState(false)

    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    const comments = useSelector(state => state.comments)
    const likes = useSelector(state => state.likes)
    const token = useSelector(state => state.token)
    const user = useSelector(state => state.user.user)
    const userPics = useSelector(state => state.userPics.userPics)

    const postStatus = useSelector(state => state.posts.status)
    const postsError = useSelector(state => state.posts.error)
    const commentsStatus = useSelector(state => state.comments.status)
    const commentsError = useSelector(state => state.comments.error)
    const likesStatus = useSelector(state => state.likes.status)
    const likesError = useSelector(state => state.likes.error)
    const userStatus = useSelector(state => state.user.status)
    const userError = useSelector(state => state.user.error)
    const userPicsError = useSelector(state => state.userPics.error)
    const userPicsStatus = useSelector(state => state.userPics.status)

    console.log(user)
    console.log(likes)
    console.log(comments)
    console.log(posts)

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

    // This fetches the User Pics
    useEffect(() => {
        if (userPicsStatus === 'idle') {
                dispatch(fetchUserPics())
            }
    }, [userPicsStatus, dispatch])

    let content
    const [showFullText,setShowFullText] = useState(false)

    // This checks to see if all Posts
    if (postStatus === 'loading' || commentsStatus === 'loading' || likesStatus === 'loading' || userStatus === 'loading' || userPicsStatus === 'loading') {
        content = <Text style={styles.loading}>Loading...</Text>
    } else if (postStatus === 'succeeded' && commentsStatus === 'succeeded' && likesStatus === 'succeeded' && userStatus === 'succeeded' && userPicsStatus === 'succeeded') {
        // Sort posts in reverse chronological order by datetime string

        // let userCauses = [
        //     {name:'BLM',id:1},
        //     {name:'USPS',id:1}
        // ]

        // let filteredPosts = posts.posts.filter(post => {
        //     let status = false
        //     for (let i=0;i<userCauses.length;i++){
        //         if (userCauses[i].name === post.cause){
        //             status = true
        //         }
        //     }
        //     return status
        // })

        const orderedPosts = posts.posts
        .slice()
        .sort((a, b) => b.date_posted.localeCompare(a.date_posted))

        content = orderedPosts.map(post => {
            let postComments = comments.comments.filter(comment=>comment.post_id === post.id ? true : false)
            let postLikes = likes.likes.filter(like=>like.post_id === post.id ? true : false)
            let profilePic = userPics.find(pic=>pic.id === post.user_id ? true : false)
            let readableDate = new Date(`${post.date_posted}`).toDateString()

            let abridgedText = post.body.substr(0,80)

            let currentTimestamp = new Date()
            // console.log('readable date:', readableDate)
            // console.log('post.date_posted:', post.date_posted)
            // console.log('currentTimestamp:', currentTimestamp)
            let pointsStyle
            post.points_awarded === false ? pointsStyle = styles.pointsNotAwarded : pointsStyle = styles.pointsAwarded

            return (
                <View key={post.id} style={styles.postContainer}>
                    <View style={styles.userWhoPosted}>
                        <TouchableOpacity onPress={() => {
                                dispatch(fetchProfileById(post.user_id))
                                dispatch(changePage('profile'))
                            }}>
                            <Image 
                                source={{uri: profilePic.profilepic}} 
                                style={{height: 40, width: 40,borderRadius:50,marginRight:7}}
                                
                            />
                        </TouchableOpacity>
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
                            style={pointsStyle}
                        />
                    </View>
                    {post.action_title ? 
                    <View style={styles.actionContainer}>
                        <Text>{post.action_title} <Text style={styles.green}> +{post.points} </Text></Text>
                    </View>
                    : null}
                    <View style={styles.flex}>
                        <Likes postLikes={postLikes} post={post} user={user}/>
                        <Icon style={styles.marginTop} name="comment-o" size={30} onPress={() => setAddCommentShowing(!addCommentShowing)} />
                    </View>
                    {postLikes.length === 0 ? null :
                     postLikes.length === 1 ? <Text style={styles.likesNum}>{postLikes.length} like</Text> : <Text style={styles.likesNum}>{postLikes.length} likes</Text>
                    }
                    <View style={styles.postText}>
                        <Text style={styles.bold} onPress={() => {
                            dispatch(fetchProfileById(post.user_id))
                            dispatch(changePage('profile'))
                        }}>{post.username}</Text>
                        {showFullText ? null : <Text style={styles.spaceLeft}>{abridgedText}
                            {post.body.length > 80 ? <Text onPress={() => setShowFullText(true)}>...</Text> : null} </Text>}
                        {showFullText ? <Text style={styles.spaceLeft}>{post.body}</Text> : null}
                    </View>
                    <View>
                        <Comments postComments={postComments} postId={post.id}/>
                        {addCommentShowing ? 
                        <TextInput style={styles.addComment} onSubmitEditing={(evt)=>{
                                dispatch(addComment({
                                    comment: evt.target.value, 
                                    created_at: new Date().toUTCString(), 
                                    post_id: post.id, 
                                    username: user.username,
                                    post_username: post.username,
                                    user_id: user.id
                                }))
                                addCommentDB(evt.target.value, post.id, user.id, user.username, post.username)
                                evt.target.value = ''
                            }} placeholder='Add a Comment' />
                        : null }
                    </View>
                </View>
                )
        })
    } else if (postStatus === 'failed' || commentsStatus === 'failed' || likesStatus === 'failed' || userStatus === 'failed' || userPicsStatus === 'failed') {
        content = <Text>{postsError}, {commentsError}, {likesError}, {userError}, {userPicsError}</Text>
    } 

    return (
            <View style={styles.main}>{content}</View>
    )
    
}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    main: {
        marginBottom:50
    },
    loading: {
        marginTop:20
    },
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
        marginLeft:7,
        height:36
    },
    green: {
        color:'rgb(55,182,53)',
        fontWeight:'bold'
    },
    actionContainer: {
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#ccc',
        padding:7
    },
    pointsNotAwarded: {
        height: width, 
        width: width
    },
    pointsAwarded: {
        height: width, 
        width: width, 
        borderWidth: 10, 
        borderColor:'rgb(55,182,53)'
    }
})