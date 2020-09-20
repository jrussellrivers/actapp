import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {ProfilePosts} from './ProfilePosts'
import {fetchUser} from './userSlice'
import {addMyCommunityDB, addMyCommunity, fetchMyCommunity, removeMyCommunityDB} from './myCommunitySlice'
import Icon from 'react-native-vector-icons/AntDesign'
import url from '../../url'

const MyCommunity = ()=>{

    const communityById = useSelector(state=>state.communityById.communityById)

    const [users,setUsers] = useState()

    useEffect(() => {
        fetch(`${url}/searchUsers/`)
        .then(r=>r.json())
        .then(data=>setUsers(data))
    },[])

    let content 

    if(users){
        content = communityById.map((com, idx)=>{
            let user = users.find(person => person.id === com.user_id ? true : false)
    
            return(
                <View key={idx}>
                    <Image 
                        source={{uri: user.profilepic}} 
                        style={{
                            width:50,
                            height:50,
                            borderRadius:50
                        }}
                    />
                    <Text>{user.username}</Text>
                </View>
            )
        })
    }

    return(
        <View>
            {content}
        </View>
    )
}

export default MyCommunity