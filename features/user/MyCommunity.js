import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {ProfilePosts} from './ProfilePosts'
import {fetchUser} from './userSlice'
import {addMyCommunityDB, addMyCommunity, fetchMyCommunity, removeMyCommunityDB} from './myCommunitySlice'
import Icon from 'react-native-vector-icons/AntDesign'

const MyCommunity = ()=>{

}

export default MyCommunity