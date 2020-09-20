import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import { changeUserStatus } from '../user/userSlice'
import Icon from 'react-native-vector-icons/EvilIcons'

export default function ChangeUserInfo() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const formData = {}

    const handleChange = (name,text) => {
        formData[name] = text
    }
    console.log(user.id)
    const handleSubmit = async () => {
        fetch(`http://localhost:3333/user/updateInfo/${user.id}`, {method:'post',body:JSON.stringify(formData),headers:{'Content-Type':'application/json'}})
        dispatch(changeUserStatus('idle'))
        dispatch(changePage('feed'))
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.gray}>Update your address so we can provide tailored resources to help you take action.</Text>
            </View>
            <View style={styles.row}>
                <View>
                    <Icon name="location" size={80} />
                </View>
                <View>
                    <TextInput name="streetAddress" onChangeText={text => handleChange("streetAddress",text)} placeholder="Address" style={styles.input} />
                    <TextInput name="city" onChangeText={text => handleChange("city",text)} placeholder="City" style={styles.input} />
                    <TextInput name="state" onChangeText={text => handleChange("state",text)} placeholder="State" style={styles.input} />
                    <TextInput name="zipcode" onChangeText={text => handleChange("zipcode",text)} placeholder="Zip Code" style={styles.input} />
                </View>
            </View>
            <TouchableOpacity onPress={()=>{
                handleSubmit()
            }} style={styles.button}><Text style={styles.green} >SUBMIT</Text></TouchableOpacity>
        </View>
    )
}

let width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center'
    },
    row: {
        flex:2,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    input: {
        height:36,
        width:width-80
    },
    button: {
        flex:1,
        alignItems:'center',
        padding:14,
        width:width-50,
        marginTop:10
    },
    green: {
        color:'rgb(55,182,53)',
        fontWeight:'bold'
    },
    gray: {
        textAlign:'center',
        // color:'#777',
        marginTop:14,
        marginBottom:14
    }
})