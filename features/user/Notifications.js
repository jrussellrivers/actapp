import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import { changeNotificationDate,changeNoteDateDB } from './userSlice'
import { fetchProfileById } from './profileByIdSlice'
import { fetchPostById } from '../posts/postByIdSlice'

const Notifications = () =>{
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)
    const comments = useSelector(state => state.comments.comments)
    const likes = useSelector(state => state.likes.likes)
    const community = useSelector(state => state.myCommunity.myCommunity)

    const [userpics,setUserPics] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3333/userpics/`)
        .then(r=>r.json())
        .then(data=>data)
        .then(d=>setUserPics(d))
    },[])

    let content = null

    console.log(userpics)
    if(userpics.length > 0){
        let checkedDate = user.notification_check
        let myComments = comments.filter(comment=>comment.post_username === user.username && comment.user_id !== user.id ? true : false)
        let newComments = myComments.map(comment=>{
            let commenterPic = userpics.find(person => person.id === comment.user_id ? true : false)
            let {profilepic} = commenterPic
            let newComment = {
                type: 'comment',
                content: comment,
                pic: profilepic
            }
            return newComment
        })

        let myLikes = likes.filter(like=>like.post_username === user.username && like.user_id !== user.id ? true : false)
        let newLikes = myLikes.map(like=>{
            let likerPic = userpics.find(person => person.id === like.user_id ? true : false)
            let {profilepic} = likerPic
            let newLike = {
                type: 'like',
                content: like,
                pic:profilepic
            }
            return newLike
        })

        let myCommunity = community.filter(com=>com.user_id === user.id ? true : false)
        let newCommunity = myCommunity.map(com=>{
            let adderPic = userpics.find(person => person.id === com.user_id ? true : false)
            let {profilepic} = adderPic
            let newCom = {
                type: 'community',
                content: com,
                pic:profilepic
            }
            return newCom
        })

        let combined = newComments.concat(newLikes, newCommunity)
        console.log(combined)

        let orderedNotifications = combined
        .slice()
        .sort((a, b) => b.content.created_at.localeCompare(a.content.created_at))

        console.log(orderedNotifications)

        let filteredDates = orderedNotifications.filter(notification=>notification.content.created_at < checkedDate ? true : false)

        content = filteredDates.map((notification, idx) => {
            if(notification.type === 'comment'){
                return(
                    <View key={idx} style={styles.notificationContainer}>
                        <TouchableOpacity onPress={() => {
                            dispatch(fetchProfileById(notification.content.user_id))
                            dispatch(changePage('profile'))
                        }}><Image source={{uri:notification.pic}} style={styles.img} /></TouchableOpacity>
                        <View style={styles.column}>
                            <Text style={styles.marginLeft}><Text style={styles.bold}>{notification.content.username}</Text> <Text onPress={() => {
                                dispatch(fetchPostById(notification.content.post_id))
                                dispatch(changePage('post'))
                            }}>commented on your post</Text></Text>                            
                            <Text style={styles.gray}>{notification.content.created_at.slice(0,16)}</Text>
                        </View>
                    </View>
                )
            } else if (notification.type === 'community'){
                return(
                    <View key={idx} style={styles.notificationContainer}>
                        <TouchableOpacity onPress={() => {
                            dispatch(fetchProfileById(notification.content.user_id))
                            dispatch(changePage('profile'))
                        }}><Image source={{uri:notification.pic}} style={styles.img} /></TouchableOpacity>
                        <View style={styles.column}>
                            <Text style={styles.marginLeft}><Text style={styles.bold}>{notification.content.username}</Text> <Text onPress={() => {
                                dispatch(fetchProfileById(notification.content.post_id))
                                dispatch(changePage('profile'))
                            }}>added you to their community</Text></Text>
                            <Text style={styles.gray}>{notification.content.created_at.slice(0,16)}</Text>
                        </View>
                    </View>
                )
            } else {
                return(
                    <View key={idx} style={styles.notificationContainer}>
                        <TouchableOpacity onPress={() => {
                            dispatch(fetchProfileById(notification.content.user_id))
                            dispatch(changePage('profile'))
                        }}><Image source={{uri:notification.pic}} style={styles.img} /></TouchableOpacity>
                        <View style={styles.column}>
                            <Text><Text style={styles.bold}>{notification.content.username}</Text> <Text onPress={() => {
                                dispatch(fetchPostById(notification.content.post_id))
                                dispatch(changePage('post'))
                            }}>liked your post</Text></Text>
                            <Text style={styles.gray}>{notification.content.created_at.slice(0,16)}</Text>
                        </View>
                    </View>
                )
            }
        }) 
    } else {
        content = <Text>Loading...</Text>
    }
    return(
        <View style={styles.main}>
            {content}
            <TouchableOpacity onPress={()=>{
                let currentTime = new Date().toUTCString()
                changeNoteDateDB(currentTime, user.id)
                dispatch(changeNotificationDate(currentTime))
            }} style={styles.button}><Text style={styles.gray}>CLEAR NOTIFICATIONS</Text></TouchableOpacity>
        </View>
    )

}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    main: {
        marginBottom:75
    },
    notificationContainer: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:width,
        padding:10,
        borderTopWidth:1,
        borderTopColor:'#ddd',
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    img: {
        width:50,
        height:50,
        borderRadius:50
    },
    username: {
        fontWeight:'bold'
    },
    bold: {
        fontWeight:'bold'
    },
    column: {
        flex:1,
        marginLeft:10,
        marginTop:5
    },
    gray: {
        color:'#aaa'
    },
    button: {
        flex:1,
        alignItems:'center',
        padding:14,
        width:width-50,
        zIndex:1
    },
    green: {
        color:'rgb(55,182,53)',
        fontWeight:'bold',
        zIndex:-1
    }
})

export default Notifications