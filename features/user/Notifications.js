import React, {useState, useEffect} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import {changeNotificationDate,changeNoteDateDB} from './userSlice'
import {fetchProfileById} from './profileByIdSlice'
import {fetchPostById} from '../posts/postByIdSlice'

const Notifications = () =>{
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)
    const comments = useSelector(state => state.comments.comments)
    const likes = useSelector(state => state.likes.likes)
    const community = useSelector(state => state.myCommunity.myCommunity)

    let checkedDate = user.notification_check
    let myComments = comments.filter(comment=>comment.post_username === user.username && comment.user_id !== user.id ? true : false)
    let newComments = myComments.map(comment=>{
        let newComment = {
            type: 'comment',
            content: comment
        }
        return newComment
    })

    let myLikes = likes.filter(like=>like.post_username === user.username && like.user_id !== user.id ? true : false)
    let newLikes = myLikes.map(like=>{
        let newLike = {
            type: 'like',
            content: like
        }
        return newLike
    })

    let myCommunity = community.filter(com=>com.user_id === user.id ? true : false)
    let newCommunity = myCommunity.map(com=>{
        let newCom = {
            type: 'community',
            content: com
        }
        return newCom
    })

    let combined = newComments.concat(newLikes, newCommunity)

    let orderedNotifications = combined
    .slice()
    .sort((a, b) => b.content.created_at.localeCompare(a.content.created_at))

    console.log(orderedNotifications)

    let content = null

    let filteredDates = orderedNotifications.filter(notification=>notification.content.created_at > checkedDate ? true : false)

    content = filteredDates.map((notification, idx) => {
        if(notification.type === 'comment'){
            return(
                <View key={idx}>
                    <Text><Text onPress={() => {
                        dispatch(fetchProfileById(notification.content.user_id))
                        dispatch(changePage('profile'))
                    }}>{notification.content.username}</Text> commented on your <Text onPress={() => {
                        dispatch(fetchPostById(notification.content.post_id))
                        dispatch(changePage('post'))
                    }}>Post</Text></Text>
                </View>
            )
        } else if (notification.type === 'community'){
            return(
                <View key={idx}>
                    <Text><Text onPress={() => {
                        dispatch(fetchProfileById(notification.content.adder_id))
                        dispatch(changePage('profile'))
                    }}>{notification.content.username}</Text> added you to their community!</Text>
                </View>
            )
        } else {
            return(
                <View key={idx}>
                    <Text><Text onPress={() => {
                        dispatch(fetchProfileById(notification.content.user_id))
                        dispatch(changePage('profile'))
                    }}>{notification.content.username}</Text> liked your <Text onPress={() => {
                        dispatch(fetchPostById(notification.content.post_id))
                        dispatch(changePage('post'))
                    }}>Post</Text></Text>
                </View>
            )
        }
    })

    return(
        <View>
            <Text>Notifications</Text>
            {content}
            <TouchableOpacity onPress={()=>{
                let currentTime = new Date().toUTCString()
                changeNoteDateDB(currentTime, user.id)
                dispatch(changeNotificationDate(currentTime))
            }}><Text>Clear Notifications</Text></TouchableOpacity>
        </View>
    )

}

export default Notifications