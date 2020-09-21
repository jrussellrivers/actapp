import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import { fetchActionResources, changeActionResourcesStatus } from './actionResourcesSlice'
import { fetchUser } from '../user/userSlice'
import * as WebBrowser from 'expo-web-browser';
import {assets} from '../../images/Assets'

const ActionResources = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)
    const userStatus = useSelector(state => state.causes.status)
    const userError = useSelector(state => state.causes.error)

    // This fetches User info
    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUser())
        }
    }, [userStatus, dispatch])

    const actionId = useSelector(state => state.actionId.actionId)

    const actionResources = useSelector(state => state.actionResources.actionResources)
    const actionResourcesStatus = useSelector(state => state.actionResources.status)
    const actionResourcesError = useSelector(state => state.actionResources.error)

    useEffect(() => {
        dispatch(fetchActionResources(actionId))
    }, [])

    useEffect(() => {
        if (actionResourcesStatus === 'idle') {
            dispatch(fetchActionResources(actionId))
            console.log(actionResourcesStatus)
        }
    }, [actionResourcesStatus, dispatch])

    console.log(actionId, actionResourcesStatus)

    let content

    console.log(actionResources)

    const convertUrl = url => {
    
        let newUrl
    
        if(url.includes('${state}') && url.includes('${state}')) {
            newUrl = url.replace('${city}',user.city).replace('${state}',user.state)
            return newUrl
        }
        if(url.includes('${city}')) {
            newUrl = url.replace('${city}',user.city)
            return newUrl
        }
        if(url.includes('${state}')) {
            newUrl = url.replace('${state}',user.state)
            return newUrl
        }
        if(url.includes('${zipcode}')) {
            newUrl = url.replace('${zipcode}',user.zipcode)
            return newUrl
        }
        if(url.includes('${streetaddress}')) {
            newUrl = url.replace('${streetaddress}',user.streetaddress)
            return newUrl
        } else {
            newUrl = url
            return newUrl
        }
    }

    const openLink = async id => {
        let url = convertUrl(actionResources[id].url)
        console.log(url)
        await WebBrowser.openBrowserAsync(url)
    }

    if (actionResourcesStatus === 'loading') {
        content = <Text>Loading...</Text>
    }else if (actionResourcesStatus === 'succeeded') {
        content = actionResources.map((resource,idx)=>
        <View key={idx} style={styles.resourceContainer}>
            <Text onPress={() => openLink(idx)} style={styles.header}>{resource.name}</Text>
            <TouchableOpacity onPress={() => openLink(idx)}>
                <Image source={resource.pic} style={styles.img}/>
            </TouchableOpacity>
            <Text style={styles.textCenter}>{resource.description}</Text>
        </View>
        )
    } else if (actionResourcesStatus === 'failed'){
        content = <Text>failed</Text>
    }
    console.log(actionId,actionResources)

    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => {
                    dispatch(changePage('actions'))
            }} style={styles.button}><Text style={styles.green}>BACK</Text></TouchableOpacity>
            {content}
            <TouchableOpacity onPress={() => {
                    dispatch(changePage('actions'))
            }} style={styles.button}><Text style={styles.green}>BACK</Text></TouchableOpacity>
        </View>
    )
}

let width = Dimensions.get('window').width

const styles = StyleSheet.create({
    main: {
        marginTop:-48,
        marginBottom: 50
    },
    resourceContainer: {
        width:width,
        borderTopWidth:1,
        borderTopColor:'#aaa',
        borderBottomWidth:1,
        borderBottomColor:'#aaa',
        paddingTop:10,
        paddingBottom:10
    },
    header: {
        textAlign:'center',
        fontWeight:'bold',
        fontSize:24
    },
    img: { 
        width: width, 
        height: 200, 
        marginTop: 10,
        marginBottom:10
    },
    textCenter: {
        textAlign:'center'
    },
    button: {
        flex:1,
        alignItems:'center',
        padding:14,
        width:width
    },
    green: {
        color:'rgb(55,182,53)',
        fontWeight:'bold'
    }
});

export default ActionResources