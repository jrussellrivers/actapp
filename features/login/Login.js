import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'

export default function Login() {
    
    const handleSubmit = () => {
        console.log('clicked')
    }

    return (
        <View>
            <TextInput name="username" placeholder="Username" />
            <TextInput name="password" placeholder="Password" />
            <TouchableOpacity onPress={handleSubmit} />
        </View>
    )
}
