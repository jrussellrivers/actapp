import React, { Component } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, SafeAreaView, Text, Linking,
} from 'react-native';

import FormBuilder from './FormBuilder';
// import * as SecureStore from 'expo-secure-store';

export default class SignUp extends Component {

    getFormFields = () => {
        const formFields = [
            [
                {
                    name: 'username',
                    label: 'Username',
                    type: 'text',
                    inputProps: {
                        autoCorrect: false,
                    },
                },
                {
                    name: 'password',
                    label: 'Password',
                    type: 'text',
                    inputProps: {
                        secureTextEntry: true
                    },
                },
            ]
        ];

        return formFields;
    };

    /**
     * Grab user's input data.
     */
    goToFeed = ()=>Linking.openURL('/feed')

    handleSubmit = async (thisState) => {
        const {
          username,password
        } = thisState;

        await fetch('http://localhost:3333/users/login',{method:'post',body:JSON.stringify({username,password}),headers:{'Content-Type': 'application/json'}})
        .then(data=>data.json())
        .then(json=>{
            console.log(json)
            if (json.success === true){
                // console.log(json.token)
                // SecureStore.setItemAsync('secure_token',json.token);
                // this.goToFeed()
            } 
        })
    };

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Text style={styles.screenTitle}>Log In</Text>
                    <FormBuilder
                        formFieldsRows={this.getFormFields()}
                        handleSubmit={this.handleSubmit}
                        submitBtnTitle="Log In"
                    />
                    <Text onPress={() => Linking.openURL('/register')}>New? Register Here</Text>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#3F4EA5',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#3F4EA5',
    },
    screenTitle: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#FFF',
    },
});

// import React from 'react'
// import { Text, View, TextInput, TouchableOpacity, Linking } from 'react-native'

// export default function Login() {
    
//     const handleSubmit = () => {
//         console.log('clicked')
//         fetch('http://localhost:3333/login',{method:'post'})
//     }

//     return (
//         <View>
//             <TextInput name="username" placeholder="Username" />
//             <TextInput name="password" secureTextEntry={true} placeholder="Password" />
//             <TouchableOpacity onPress={handleSubmit}><Text>Submit</Text></TouchableOpacity>
//             <Text onPress={() => Linking.openURL('/register')}>New? Register Here</Text>
//         </View>
//     )
// }
