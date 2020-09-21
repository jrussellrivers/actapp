import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import { changePage } from '../pageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProfileById } from '../user/profileByIdSlice'
import {addMyCommunityDB, addMyCommunity, fetchMyCommunity, removeMyCommunityDB} from './myCommunitySlice'
import Icon from 'react-native-vector-icons/AntDesign'
import url from '../../url'

const MyCommunity = ()=>{

    const dispatch = useDispatch()

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
                <TouchableOpacity 
                    key={idx} 
                    style={styles.notificationContainer}
                    onPress={() => {dispatch(fetchProfileById(user.id));dispatch(changePage('profile'));}}
                >
                    <Image 
                        source={{uri: user.profilepic}} 
                        style={styles.img}
                    />
                    <Text style={styles.username}>{user.username}</Text>
                </TouchableOpacity>
            )
        })
    }

    return(
        <View style={styles.main}>
            {content}
        </View>
    )
}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    main: {
        marginBottom:50
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
        borderRadius:50,
        marginRight:10
    },
    username: {
        fontWeight:'bold'
    }
})

export default MyCommunity