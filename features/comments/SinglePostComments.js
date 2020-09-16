import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'


export const SinglePostComments = ({orderedComments}) => {
    if (orderedComments.length === 0){
        return (null)
    } else {

        let content = orderedComments.map((comment, idx) => {
            let readableDate = new Date(`${comment.created_at}`).toDateString()
            return (
                <View key={idx} style={styles.commentsContainer}>
                    <Text style={styles.marginTop}><Text style={styles.bold}>{comment.username}</Text> {comment.comment} {readableDate}</Text>
                </View>
            )
        })

        return (
            <View>
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight:'bold'
    },
    commentsContainer: {
        marginLeft:7
    },
    marginTop: {
        marginTop:7
    },
    center: {
        alignItems:'center',
        marginBottom:-10
    }
})