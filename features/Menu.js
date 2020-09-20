import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { changePage } from './pageSlice'
import { useSelector,useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'

const Menu = () => {
    const dispatch = useDispatch()

    const page = useSelector(state => state.page.pageName)

    return (
        <View style={{marginTop:15}}>
            <TouchableOpacity onPress={() => dispatch(changePage('changeuserinfo'))} style={styles.option}>
                <Icon name="edit" size={30} />
                <Text style={styles.text}>Edit Your Info</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(changePage('changeCauses'))} style={styles.option}>
                <Icon name="carryout" size={30} />
                <Text style={styles.text}>Update Your Causes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(changePage('logout'))} style={styles.option}>
                <Icon name="logout" size={30} />
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    option: {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        padding:14,
        width:width,
        zIndex:1,
        borderTopWidth:1,
        borderTopColor:'#ddd',
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    text: {
        marginLeft:14
    }
})

export default Menu