import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import {changeUserStatus} from '../user/userSlice'

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
        <View>
            <TextInput name="streetAddress" onChangeText={text => handleChange("streetAddress",text)} placeholder="Address" />
            <TextInput name="city" onChangeText={text => handleChange("city",text)} placeholder="City" />
            <TextInput name="state" onChangeText={text => handleChange("state",text)} placeholder="State" />
            <TextInput name="zipcode" onChangeText={text => handleChange("zipcode",text)} placeholder="Zip Code" />
            <TouchableOpacity onPress={()=>{
                handleSubmit()
            }}><Text>Submit</Text></TouchableOpacity>
            <Text onPress={() => dispatch(changePage('menu'))}>Back</Text>
        </View>
    )
}
