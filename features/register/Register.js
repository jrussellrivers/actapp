import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import {changeRegisteredUser} from '../register/registeredUserSlice'
import { assets } from '../../images/Assets'
import url from '../../url'

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
            await fetch(`${url}/users/register`,{method:'post',body:JSON.stringify(formData),headers:{'Content-Type': 'application/json'}})
            .then(resp=>resp.json())
            .then(data=> dispatch(changeRegisteredUser(data)))

            dispatch(changePage('survey'))
        } else {
            // XXXXX alert that password doesn't match
            console.log('no')
        }
}

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.imageBackground}>
                    <Image source={{uri:assets.fist.uri}} style={{height:100,width:100,margin:'auto'}} />
                </View>
            </View>
            <TextInput name="username" onChangeText={text => handleChange("username",text)} placeholder="Username" style={styles.input} />
            <TextInput name="password" onChangeText={text => handleChange("password",text)} secureTextEntry={true} placeholder="Password" style={styles.input} />
            <TextInput name="confirmPassword" onChangeText={text => handleChange("confirmPassword",text)} secureTextEntry={true} placeholder="Confirm Password" style={styles.input} />
            <TextInput name="firstName" onChangeText={text => handleChange("firstName",text)} placeholder="First Name" style={styles.input} />
            <TextInput name="lastName" onChangeText={text => handleChange("lastName",text)} placeholder="Last Name" style={styles.input} />
            <TextInput name="email" onChangeText={text => handleChange("email",text)} placeholder="Email" style={styles.input} />
            <TextInput name="race" onChangeText={text => handleChange("race",text)} placeholder="Race/Ethnicity" style={styles.input} />
            <TextInput name="gender" onChangeText={text => handleChange("gender",text)} placeholder="Identified Gender" style={styles.input} />
            <TextInput name="birthdate" onChangeText={text => handleChange("birthdate",text)} placeholder="Birthdate" style={styles.input} />
            <TouchableOpacity onPress={()=>{
                handleSubmit()
            }} style={styles.button}><Text style={styles.green}>SUBMIT</Text></TouchableOpacity>
            <Text onPress={() => dispatch(changePage('login'))} style={styles.footer}>Already Have an Account? Login Here</Text>
        </View>
    )
}

let width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        borderRadius:10,
        padding:10,
        width:width-40,
        marginLeft:20,
        marginRight:20,
        flex:1,
        alignItems:'center'
    },
    headerContainer: {
        paddingBottom:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        marginTop:-3,
        marginBottom:10
    },
    imageBackground: {
        backgroundColor:'rgb(55,182,53)',
        borderRadius:100,
        padding:10
    },
    header: {
        color:'#555',
        fontWeight:'bold',
        fontSize:16
    },
    input: {
        height:36,
        width:width-50,
        textAlign:'center'
    },
    button: {
        flex:1,
        alignItems:'center',
        padding:14,
        width:width-50,
        marginTop:20
    },
    green: {
        color:'rgb(55,182,53)',
        fontWeight:'bold'
    },
    footer: {
        marginBottom:10
    }
})