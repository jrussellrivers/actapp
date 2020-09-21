import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Dimensions } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProfileById} from '../user/profileByIdSlice'
import {SinglePostComments} from '../comments/SinglePostComments'
import {addComment, addCommentDB} from '../comments/commentsSlice'
import {Likes} from '../likes/Likes'
import {fetchUserPics} from '../user/userPicsSlice'
import Icon from 'react-native-vector-icons/FontAwesome'


const Post = () => {

    const [addCommentShowing,setAddCommentShowing] = useState(false)

    const dispatch = useDispatch()
    const postById = useSelector(state => state.postById.postById)
    const user = useSelector(state => state.user.user)
    const userPics = useSelector(state => state.userPics.userPics)

    const postByIdStatus = useSelector(state => state.postById.status)
    const postByIdError = useSelector(state => state.postById.error)
    const userPicsError = useSelector(state => state.userPics.error)
    const userPicsStatus = useSelector(state => state.userPics.status)

    const comments = useSelector(state => state.comments.comments)
    const likes = useSelector(state => state.likes.likes)

    // This fetches the User Pics
    useEffect(() => {
        if (userPicsStatus === 'idle') {
                dispatch(fetchUserPics())
            }
    }, [userPicsStatus, dispatch])

    let profilePic = userPics.find(pic=>pic.id === postById.user_id ? true : false)
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
            <View style={styles.main}>
                <View style={styles.userWhoPosted}>
                    <TouchableOpacity onPress={() => {
                            dispatch(fetchProfileById(postById.user_id))
                            dispatch(changePage('profile'))
                        }}>
                        <Image 
                            source={{uri: profilePic.profilepic}} 
                            style={{height: 40, width: 40,borderRadius:50,marginRight:7}}
                            
                        />
                    </TouchableOpacity>
                    <Text style={styles.bold} onPress={() => {
                        dispatch(fetchProfileById(postById.user_id))
                        dispatch(changePage('profile'))
                    }}>{postById.username}</Text>
                    <Text style={styles.date}>{readableDate}</Text>
                </View>

                <Image 
                    source={{uri: postById.picurl}} 
                    style={{height: width, width: width}}
                />

                {postById.action_title ? 
                    <View style={styles.actionContainer}>
                        <Text>{postById.action_title} <Text style={styles.green}> +{postById.points} </Text></Text>
                    </View>
                : null}

                <View style={styles.flex}>
                    <Likes postLikes={postLikes} post={postById} user={user}/>
                    <Icon style={styles.marginTop} name="comment-o" size={30} onPress={() => setAddCommentShowing(!addCommentShowing)} />
                </View>
                {postLikes.length === 0 ? null :
                    postLikes.length === 1 ? <Text style={styles.likesNum}>{postLikes.length} like</Text> : <Text style={styles.likesNum}>{postLikes.length} likes</Text>
                }
                <View style={styles.postText}>
                    <Text style={styles.bold} onPress={() => {
                            dispatch(fetchProfileById(postById.user_id))
                            dispatch(changePage('profile'))
                        }}>{postById.username}</Text>
                    <Text style={styles.spaceLeft}>{postById.body}</Text>
                </View>
                <SinglePostComments orderedComments={orderedComments} comments={comments}/>                    
                {/* {addCommentShowing ?  */}
                    <TextInput style={styles.addComment} onSubmitEditing={(evt)=>{
                        const searchRegExp = /'/g;
                        const replaceWith = "''";
                        const result = evt.target.value.replace(searchRegExp, replaceWith)

                        dispatch(addComment({
                            comment: evt.target.value, 
                            created_at: new Date().toUTCString(), 
                            post_id: postById.id, 
                            username: user.username,
                            post_username: postById.username,
                            user_id: user.id
                        }))
                        addCommentDB(result, postById.id, user.id, user.username, postById.username)
                        evt.target.value = ''
                    }} placeholder='Add a Comment' />
                {/* : null } */}

            </View>
    } else if (postByIdStatus === 'failed'){
        content = <Text>{postByIdError}</Text>
    }


    return (
        <View style={styles.postContainer}>
            {content}
        </View>
    )
}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    main: {
        marginBottom:50
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
    date: {
        position:'absolute',
        color:'gray',
        right:10
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
    }
})

export default Post
