import React from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changeToken }  from './tokenSlice'
import { changePage } from '../pageSlice'
import { assets } from '../../images/Assets'
import url from '../../url'

export default function Login() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token.token)

    const formData = {}

    const handleChange = (name,text) => {
        formData[name] = text
    }
    
    const handleSubmit = () => {
        fetch(`${url}/users/login`,{method:'post',body:JSON.stringify(formData),headers:{'Content-Type': 'application/json'}})
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
            <View style={styles.header}>
                <View style={styles.imageBackground}>
                    <Image source={{uri:assets.fist.uri}} style={{height:100,width:100,margin:'auto'}} />
                </View>
                <Text style={styles.headerText}><Text style={styles.green}>act</Text>app</Text>
            </View>
            <View style={styles.subheader}>
                <Text style={styles.subheaderText}>Take Action Together</Text>
                <Text style={styles.subsubheaderText}>A coordinated social experience with curated resources</Text>
            </View>
            <View style={styles.form}>
                <TextInput name="username" placeholder="Username" onChangeText={text => handleChange("username",text)} style={styles.input} />
                <TextInput name="password" secureTextEntry={true} placeholder="Password" onChangeText={text => handleChange("password",text)} style={styles.input} />
                
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}><Text style={styles.green}>SUBMIT</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(changePage('register'))} ><Text>New? Register Here</Text></TouchableOpacity>
            </View>
        </View>
    )
}

let width = Dimensions.get('window').width

const styles = StyleSheet.create({
    imageBackground: {
        backgroundColor:'rgb(55,182,53)',
        borderRadius:100,
        padding:10
    },
    header: {
        marginTop:0,
        backgroundColor:'white',
        width:width,
        padding:7,
        flex:1,
        alignItems:'center'
    },
    headerText: {
        fontSize:72,
        fontWeight:'bold'
    },
    subheader: {
        width:width,
        flex:1,
        alignItems:'center',
        // borderBottomWidth:1,
        // borderBottomColor:'#ccc'
    },  
    subheaderText: {
        fontSize:16,
        // fontWeight:'bold'
    },
    subsubheaderText: {
        fontSize:12,
        fontStyle:'italic',
        color:'#999',
        margin:7
        // fontWeight:'bold'
    },
    green: {
        color:'rgb(55,182,53)',
        fontWeight:'bold'
    },
    form: {
        marginTop:36,
        flex:1,
        alignItems:'center'
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
        width:width-50
    },
    buttonContainer: {
        marginTop:14,
        width:width,
        flex:1,
        alignItems:'center'
    }
})