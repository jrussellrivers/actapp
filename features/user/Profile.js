import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {ProfilePosts} from './ProfilePosts'



const Profile = () => {
    const dispatch = useDispatch()
    const profileUser = useSelector(state => state.profileById.profileById)

    const profileByIdStatus = useSelector(state => state.profileById.status)
    const profileByIdError = useSelector(state => state.profileById.error)

    const posts = useSelector(state => state.posts.posts)

    let profilePosts = posts.filter(post=>post.user_id === profileUser.id ? true : false)
    const orderedPosts = profilePosts
        .slice()
        .sort((a, b) => b.date_posted.localeCompare(a.date_posted))

    let content

    if (profileByIdStatus === 'loading') {
        content = <Text >Loading...</Text>
    } else if (profileByIdStatus === 'succeeded'){
        content = 
        <View>
            <View>
                {/* <Image source={require('./ranPic.png')} /> */}
                <Text>{profileUser.username}</Text>
            </View>
            <View>
                <Text>{profilePosts.length} Posts</Text>
            </View>
            <ProfilePosts posts={orderedPosts} />
        </View>
    } else if (profileByIdStatus === 'failed'){
        content = <Text>{profileByIdError}</Text>
    }


    return (
        <View>
            {content}
        </View>
    )
}

export default Profile