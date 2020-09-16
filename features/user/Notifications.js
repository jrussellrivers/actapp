import React, {useState} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import {changeNotificationDate} from './userSlice'

const Notifications = () =>{

    const user = useSelector(state => state.user.user)
    const comments = useSelector(state => state.comments.comments)
    const likes = useSelector(state => state.likes.likes)


    let checkedDate = user.notification_check
    let myComments = comments.filter(comment=>comment.post_username === user.username ? true : false)
    let newComments = myComments.map(comment=>{
        let newComment = {
            type: 'comment',
            content: comment
        }
        return newComment
    })
    let myLikes = likes.filter(like=>like.post_username === user.username ? true : false)
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

    let content 

    if (checkedDate === null){
        content = orderedNotifications.map((notification, idx) => {
            return(
                <View key={idx}>
                    <Text>{notification.content.post_username} {notification.content.created_at}</Text>
                </View>
            )
        })
    }

    // let old = user.registerdate
    // let current = new Date().toUTCString()
    // console.log(old, '||', current)
    // console.log(old > current)   this returns false
    // console.log(old < current)   this returns true
    return(
        <View>
            <Text>Notifications</Text>
            {content}
        </View>
    )

}

export default Notifications