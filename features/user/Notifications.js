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

    console.log(user)
    let checkedDate = user.notification_check
    console.log(checkedDate)
    // if ('2020-09-17T08:59:23.000Z' < '2020-09-16T20:26:02.515Z'){
    //     console.log(true)
    //     // We want this to be truu, fucked up entering data differently
    // }
    // if ('2020-09-17T08:59:23.000Z' > '2020-09-16T20:26:02.515Z'){
    //     console.log(true)
    //     // this runs, this number is what's in the db on refresh
    // }
    // if ('2020-09-17T08:59:23.000Z' < 'Thu, 17 Sep 2020 05:11:22 GMT'){
    //     console.log('truuu')
    //     // this runs, this number is what's in the state
    // }
    // if ('2020-09-17T08:59:23.000Z' > 'Thu, 17 Sep 2020 05:11:22 GMT'){
    //     console.log('truuu')
    // }
    // if ('Thu, 17 Sep 2020 05:19:14 GMT' < 'Thu, 17 Sep 2020 05:20:04 GMT'){
    //     console.log('this is what the current state should show')
    // }
    let myComments = comments.filter(comment=>comment.post_username === user.username && comment.user_id !== user.id? true : false)
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
    let combined = newComments.concat(newLikes)

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