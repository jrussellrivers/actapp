import React, {useState, useEffect} from "react"
import { StyleSheet, View, Image, TouchableOpacity, Dimensions} from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {fetchPostById} from '../posts/postByIdSlice'

export const ProfilePosts = ({posts}) => {
    const dispatch = useDispatch()

    if (posts.length === 0){
        return null
    // } else if (posts.length > 0 && posts.length < 4){
    //     let readableDate = new Date(`${posts[0].created_at}`).toDateString()
    //     return (
    //         <View key={posts[0].id}>
    //             <Text>Comments:</Text>
    //             <Text>{posts[0].username} {posts[0].comment} {readableDate}</Text>
    //         </View>
    //     )
    } else {

        let content = posts.map((post, idx) => {
            return (
                <TouchableOpacity style={styles.item} key={idx} onPress={() => {
                    dispatch(fetchPostById(post.id))
                    dispatch(changePage('post'))
                }}>
                    {/* <Text onPress={() => {
                        dispatch(fetchPostById(post.id))
                        dispatch(changePage('post'))
                    }}>Post id: {post.id}</Text> */}
                    <Image 
                        source={{uri: post.picurl}} 
                        style={{height: width*0.3, width:width*0.3}}
                    />
                </TouchableOpacity>
            )
        })

        return (
            <View style={styles.container}>
                {content}
            </View>
        )
    } 
}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    container: {
        marginTop:75,
        marginBottom:75,
        width:width,
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    item: {
        margin:width*0.0167
    }
})