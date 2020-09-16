import React from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changeToken }  from './tokenSlice'
import { changePage } from '../pageSlice'

export default function Login() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token.token)

    const formData = {}

    const handleChange = (name,text) => {
        formData[name] = text
    }
    
    const handleSubmit = () => {
        fetch('http://localhost:3333/users/login',{method:'post',body:JSON.stringify(formData),headers:{'Content-Type': 'application/json'}})
        .then(data=>data.json())
        .then(json=>{
            if (json.success === true){
                dispatch(changeToken(json))
                dispatch(changePage('feed'))
            } 
        })
    }

    return (
        <View>
            <TextInput name="username" placeholder="Username" onChangeText={text => handleChange("username",text)} style={styles.input} />
            <TextInput name="password" secureTextEntry={true} placeholder="Password" onChangeText={text => handleChange("password",text)} style={styles.input} />
            <Button title="Submit" onPress={handleSubmit}></Button>
            <TouchableOpacity onPress={() => dispatch(changePage('register'))}><Text>New? Register Here</Text></TouchableOpacity>
        </View>
    )
}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    input: {
        height:36,
        width:width-50,
        margin:7
    }
})