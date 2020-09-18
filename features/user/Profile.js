import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from "react-native"
import {fetchCommunityById} from './communityByIdSlice'
import { changePage } from '../pageSlice'
import { useSelector,useDispatch } from 'react-redux'
import { ProfilePosts } from './ProfilePosts'
import { fetchUser } from './userSlice'
import { addMyCommunityDB, addMyCommunity, fetchMyCommunity, removeMyCommunityDB } from './myCommunitySlice'
import Icon from 'react-native-vector-icons/AntDesign'
import { assets } from '../../images/Assets'

const Profile = () => {
    const dispatch = useDispatch()
    const profileUser = useSelector(state => state.profileById.profileById)
    const currentUser = useSelector(state => state.user.user)
    const userStatus = useSelector(state => state.user.status)
    const token = useSelector(state => state.token)

    const myCommunity = useSelector(state => state.myCommunity.myCommunity)
    let communityStatus = myCommunity.filter(com=>com.username === currentUser.username && com.user_id === profileUser.id ? true : false)
    let added = communityStatus.length > 0 ? true : false

    let allMyCommunity = myCommunity.filter(com=>com.username === profileUser.username ? true : false)

    const profileByIdStatus = useSelector(state => state.profileById.status)
    const profileByIdError = useSelector(state => state.profileById.error)

    const posts = useSelector(state => state.posts.posts)

    useEffect(() => {
        if (userStatus === 'idle') {
                dispatch(fetchUser(token.token))
            }
    }, [userStatus, dispatch])

    let profilePosts = posts.filter(post=>post.user_id === profileUser.id ? true : false)
    const orderedPosts = profilePosts
        .slice()
        .sort((a, b) => b.date_posted.localeCompare(a.date_posted))

    let content

    if (profileByIdStatus === 'loading') {
        content = <Text >Loading...</Text>
    } else if (profileByIdStatus === 'succeeded' && userStatus === 'succeeded'){
        if (profileUser.id === currentUser.id){
            content = 
                <View>
                    <View style={styles.userInfo}>
                        <View style={styles.column}>
                            <TouchableOpacity onPress={()=>dispatch(changePage('changeprofilepic'))}>
                                <Image 
                                    source={{uri: currentUser.profilepic}} 
                                    style={styles.profilePic}
                                />
                            </TouchableOpacity>
                            <Text style={styles.username}>{profileUser.username}</Text>
                        </View>
                        <View style={styles.columnA}>
                            <TouchableOpacity style={styles.community}>
                                <Text style={styles.username}>{profilePosts.length}</Text>
                            </TouchableOpacity>
                            <Text style={styles.gray}>Posts</Text>
                        </View>
                        <View style={styles.columnA}>
                            <TouchableOpacity style={styles.community}>
                                <Text style={styles.username}>{allMyCommunity.length}</Text>
                            </TouchableOpacity>
                            <Text style={styles.gray}>Community</Text>
                        </View>
                        <View style={styles.columnA}>
                            <Text style={styles.username}>{profileUser.points || 0}</Text>
                            <Text style={styles.gray}>Points</Text>
                            {/* <Image source={{uri:assets.actCoin.uri}} style={styles.actcoinImg} /> */}
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>POSTS</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        dispatch(fetchCommunityById(profileUser.id))
                        dispatch(changePage('mycommunity'))
                    }}><Text>My Community: {allMyCommunity.length}</Text></TouchableOpacity>
                    <ProfilePosts posts={orderedPosts} />
                </View>
        } else {
            if (added){
                content = 
                <View>
                    <View style={styles.userInfo}>
                        <View style={styles.column}>
                            <TouchableOpacity onPress={()=>dispatch(changePage('changeprofilepic'))}>
                                <Image 
                                    source={{uri: profileUser.profilepic}} 
                                    style={styles.profilePic}
                                />
                            </TouchableOpacity>
                            <Text style={styles.username}>{profileUser.username}</Text>
                            <TouchableOpacity onPress={async()=>{
                                await removeMyCommunityDB(profileUser.id,currentUser.id)
                                dispatch(fetchMyCommunity())
                            }}><Icon name="deleteusergroup" size={25}/></TouchableOpacity>
                        </View>
                        <View style={styles.columnB}>
                            <TouchableOpacity style={styles.community}>
                                <Text style={styles.username}>{profilePosts.length}</Text>
                            </TouchableOpacity>
                            <Text style={styles.gray}>Posts</Text>
                        </View>
                        <View style={styles.columnB}>
                            <TouchableOpacity style={styles.community}>
                                <Text style={styles.username}>{allMyCommunity.length}</Text>
                            </TouchableOpacity>
                            <Text style={styles.gray}>Community</Text>
                        </View>
                        <View style={styles.columnB}>
                            <Text style={styles.username}>{profileUser.points || 0}</Text>
                            <Text style={styles.gray}>Points</Text>
                            {/* <Image source={{uri:assets.actCoin.uri}} style={styles.actcoinImg} /> */}
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>POSTS</Text>
                    </View>
                    <TouchableOpacity onPress={async()=>{
                        await removeMyCommunityDB(profileUser.id,currentUser.id)
                        dispatch(fetchMyCommunity())
                    }}><Icon name="deleteusergroup" size={25}/></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        dispatch(fetchCommunityById(profileUser.id))
                        dispatch(changePage('mycommunity'))
                    }}><Text>My Community: {allMyCommunity.length}</Text></TouchableOpacity>
                    <ProfilePosts posts={orderedPosts} />
                </View>
            } else {
                content = 
                <View>
                    <View style={styles.userInfo}>
                        <View style={styles.column}>
                            <TouchableOpacity onPress={()=>dispatch(changePage('changeprofilepic'))}>
                                <Image 
                                    source={{uri: profileUser.profilepic}} 
                                    style={styles.profilePic}
                                />
                            </TouchableOpacity>
                            <Text style={styles.username}>{profileUser.username}</Text>
                            <TouchableOpacity onPress={()=>{
                                dispatch(addMyCommunity({
                                    user_id: profileUser.id,
                                    created_at: new Date().toUTCString(),
                                    username: currentUser.username,
                                    adder_id: currentUser.id
                                }))
                                addMyCommunityDB(profileUser.id,currentUser.username,currentUser.id)
                            }}><Icon name="addusergroup" size={25}/></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                dispatch(changePage('mycommunity'))
                            }}></TouchableOpacity>
                        </View>
                        <View style={styles.columnB}>
                            <TouchableOpacity style={styles.community}>
                                <Text style={styles.username}>{profilePosts.length}</Text>
                            </TouchableOpacity>
                            <Text style={styles.gray}>Posts</Text>
                        </View>
                        <View style={styles.columnB}>
                            <TouchableOpacity style={styles.community}>
                                <Text style={styles.username}>{allMyCommunity.length}</Text>
                            </TouchableOpacity>
                            <Text style={styles.gray}>Community</Text>
                        </View>
                        <View style={styles.columnB}>
                            <Text style={styles.username}>{profileUser.points || 0}</Text>
                            <Text style={styles.gray}>Points</Text>
                            {/* <Image source={{uri:assets.actCoin.uri}} style={styles.actcoinImg} /> */}
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>POSTS</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        dispatch(addMyCommunity({
                            user_id: profileUser.id,
                            created_at: new Date().toUTCString(),
                            username: currentUser.username,
                            adder_id: currentUser.id
                        }))
                        addMyCommunityDB(profileUser.id,currentUser.username,currentUser.id)
                    }}><Icon name="addusergroup" size={25}/></TouchableOpacity>
                    <TouchableOpacity onPress={async ()=>{
                        await dispatch(fetchCommunityById(profileUser.id))
                        dispatch(changePage('mycommunity'))
                    }}><Text>My Community: {allMyCommunity.length}</Text></TouchableOpacity>
                    <ProfilePosts posts={orderedPosts} />
                </View>
            }
        }
        
    } else if (profileByIdStatus === 'failed'){
        content = <Text>{profileByIdError}</Text>
    }

    return (
        <View style={styles.main}>
            {content}
        </View>
    )
}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    main: {
        marginTop:20,
        marginBottom:50
    },
    profilePic: {
        borderRadius:50,
        height: 100, 
        width: 100
    },
    userInfo: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:width
    },
    username: {
        fontWeight:'bold'
    },
    community: {
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    icon: {
        // backgroundColor:'rgba(55,182,53,0.5)',
        paddingLeft:1,
        paddingRight:1,
        borderRadius:50,
        borderWidth:1,
        borderColor:'#aaa',
        marginLeft:5
    },
    points: {
        fontWeight:'bold',
        color:'rgb(55,182,53)'
    },
    column: {
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    columnA: {
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        transform : [{ 
            translateY : -10,
        }]    
    },
    columnB: {
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        transform : [{ 
            translateY : -20,
        }]    
    },
    gray: {
        color:'#aaa'
    },
    actcoinImg: {
        height:20,
        width:20,
        borderWidth:1,
        borderColor:'#aaa',
        borderRadius:50,
        marginLeft:5,
        padding:2
    },
    headerContainer: {
        flex:2,
        alignItems:'center',
        width:width,
        borderTopWidth:1,
        borderTopColor:'#ddd',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        marginTop:50
    },
    header: {
        fontSize:24,
        color:'#aaa'
    },
    postImgContainer: {
        width:width,
        flex:3,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    postImg: {
        width:width*0.3
    }
})

export default Profile