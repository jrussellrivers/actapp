import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import {changeRegisteredUser} from '../register/registeredUserSlice'

export default function ChangeUserInfo({user}) {
    const dispatch = useDispatch()

    const formData = {}

    const handleChange = (name,text) => {
        formData[name] = text
    }
    console.log(user)
    const handleSubmit = async () => {

        // XXXXXXXXXXXX NEED TO CREATE A NEW ROUTE THAT UPDATES
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
            {/* change password */}
            <TextInput name="password" onChangeText={text => handleChange("password",text)} secureTextEntry={true} placeholder="Password" />
            <TextInput name="newPassword" onChangeText={text => handleChange("newPassword",text)} secureTextEntry={true} placeholder="New Password" />
            <TextInput name="confirmNewPassword" onChangeText={text => handleChange("confirmNewPassword",text)} secureTextEntry={true} placeholder="Confirm New Password" />
            <TextInput name="firstName" onChangeText={text => handleChange("firstName",text)} value={user.firstname} />
            <TextInput name="lastName" onChangeText={text => handleChange("lastName",text)} placeholder="Last Name" />
            <TextInput name="email" onChangeText={text => handleChange("email",text)} placeholder="Email" />
            <TextInput name="phone" onChangeText={text => handleChange("phone",text)} placeholder="Phone" />
            <TextInput name="streetAddress" onChangeText={text => handleChange("streetAddress",text)} placeholder="Address" />
            <TextInput name="city" onChangeText={text => handleChange("city",text)} placeholder="City" />
            <TextInput name="state" onChangeText={text => handleChange("state",text)} placeholder="State" />
            <TextInput name="zipcode" onChangeText={text => handleChange("zipcode",text)} placeholder="Zip Code" />
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
