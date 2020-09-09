import React, {useState, useEffect} from "react"
import { Stylesheet, View, Text, TextInput } from "react-native"

export const Likes = ({postLikes}) => {
    if(postLikes.length === 0) {
        return null
    } else {
        return (
            <Text>Likes: {postLikes.length}</Text>
            //we will put logic for which friends liked it, and logic for if you yourself has liked it
        )
    }
}