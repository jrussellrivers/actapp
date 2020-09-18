import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import {changeRegisteredUser} from '../register/registeredUserSlice'

export default function Register() {
    const dispatch = useDispatch()
    const formData = {}

    const handleChange = (name,text) => {
        const searchRegExp = /'/g;
        const replaceWith = "''";
        const result = text.replace(searchRegExp, replaceWith)
        formData[name] = result
    }
    
    const handleSubmit = async () => {

        // XXXXXXXXXXXX INSERT ERROR HANDLING FOR DUPES
        if (formData.password === formData.confirmPassword){
            await fetch('http://localhost:3333/users/register',{method:'post',body:JSON.stringify(formData),headers:{'Content-Type': 'application/json'}})
            .then(resp=>resp.json())
            .then(data=> dispatch(changeRegisteredUser(data)))

            dispatch(changePage('survey'))
        } else {
            // XXXXX alert that password doesn't match
            console.log('no')
        }
}

    return (
        <View>
            <TextInput name="username" onChangeText={text => handleChange("username",text)} placeholder="Username" />
            <TextInput name="password" onChangeText={text => handleChange("password",text)} secureTextEntry={true} placeholder="Password" />
            <TextInput name="confirmPassword" onChangeText={text => handleChange("confirmPassword",text)} secureTextEntry={true} placeholder="Confirm Password" />
            <TextInput name="firstName" onChangeText={text => handleChange("firstName",text)} placeholder="First Name" />
            <TextInput name="lastName" onChangeText={text => handleChange("lastName",text)} placeholder="Last Name" />
            <TextInput name="email" onChangeText={text => handleChange("email",text)} placeholder="Email" />
            <TextInput name="race" onChangeText={text => handleChange("race",text)} placeholder="Race/Ethnicity" />
            <TextInput name="gender" onChangeText={text => handleChange("gender",text)} placeholder="Identified Gender" />
            <TextInput name="birthdate" onChangeText={text => handleChange("birthdate",text)} placeholder="Birthdate" />
            <TouchableOpacity onPress={()=>{
                handleSubmit()
            }}><Text>Submit</Text></TouchableOpacity>
            <Text onPress={() => dispatch(changePage('login'))}>Already Have an Account? Login Here</Text>
        </View>
    )
}
