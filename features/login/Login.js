import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'

export default function Login() {
    return (
        <View>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" />
        </View>
    )
}
