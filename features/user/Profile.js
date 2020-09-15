import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput, Image } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {ProfilePosts} from './ProfilePosts'



const Profile = () => {
    const dispatch = useDispatch()
    const profileUser = useSelector(state => state.profileById.profileById)
    const currentUser = useSelector(state => state.user.user)


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
        if (profileUser.id === currentUser.id){
            content = 
                <View>
                    <View>
                        <Image 
                            source={{uri: currentUser.profilepic}} 
                            style={{height: 100, width: 100}}
                        />
                        <Text>{profileUser.username}</Text>
                        <Text>Something to edit profile</Text>
                    </View>
                    <View>
                        <Text>{profilePosts.length} Posts</Text>
                    </View>
                    <ProfilePosts posts={orderedPosts} />
                </View>
        } else {
            content = 
                <View>
                    <View>
                        <Image 
                            source={{uri: profileUser.profilepic}} 
                            style={{height: 100, width: 100}}
                        />
                        <Text>{profileUser.username}</Text>
                    </View>
                    <View>
                        <Text>{profilePosts.length} Posts</Text>
                    </View>
                    <ProfilePosts posts={orderedPosts} />
                </View>
        }
        
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