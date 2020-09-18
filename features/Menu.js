import React, { useEffect, useState } from "react"
import { View, Text, TextInput, Dimensions, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { changePage } from './pageSlice'
import { useSelector,useDispatch } from 'react-redux'

let width = Dimensions.get('window').width;

const Menu = () => {
    const dispatch = useDispatch()

    const page = useSelector(state => state.page.pageName)

    return (
        <View style={{marginTop:15}}>
            <Text onPress={() => dispatch(changePage('changeuserinfo'))}>Edit Your Info</Text>
            <Text onPress={() => dispatch(changePage('updateCauses'))}>Update Your Causes</Text>
            <Text onPress={() => dispatch(changePage('logout'))}>Logout</Text>
        </View>
    )
}

export default Menu