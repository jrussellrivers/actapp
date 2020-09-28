import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, Image, Dimensions } from "react-native"
import { changePage } from '../pageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCoordinatedActionResources, changeCoordinatedActionResourcesStatus } from './coordinatedActionResourcesSlice'
import { fetchUser } from '../user/userSlice'
import * as WebBrowser from 'expo-web-browser';
import { assets } from '../../images/Assets'
import { TouchableOpacity } from "react-native-gesture-handler"

const CoordinatedActionResources = () => {

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

    const coordinatedActionId = useSelector(state => state.coordinatedActionId.coordinatedActionId)

    const coordinatedActionResources = useSelector(state => state.coordinatedActionResources.coordinatedActionResources)
    const coordinatedActionResourcesStatus = useSelector(state => state.coordinatedActionResources.status)
    const coordinatedActionResourcesError = useSelector(state => state.coordinatedActionResources.error)

    useEffect(() => {
        dispatch(fetchCoordinatedActionResources(coordinatedActionId))
    }, [])

    useEffect(() => {
        if (coordinatedActionResourcesStatus === 'idle') {
            dispatch(fetchCoordinatedActionResources(coordinatedActionId))
            console.log(coordinatedActionResourcesStatus)
        }
    }, [coordinatedActionResourcesStatus, dispatch])

    console.log(coordinatedActionResourcesStatus)

    let content

    console.log(coordinatedActionResources)

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
        let url = convertUrl(coordinatedActionResources[id].url)
        await WebBrowser.openBrowserAsync(url);
    }

    if (coordinatedActionResourcesStatus === 'loading') {
        content = <Text>Loading...</Text>
    } else if (coordinatedActionResourcesStatus === 'succeeded') {
        content = coordinatedActionResources.map((resource, idx) =>
            <View key={idx} style={styles.resourceContainer}>
                <Text onPress={() => openLink(idx)} style={styles.header}>{resource.name}</Text>
                <TouchableOpacity onPress={() => openLink(idx)}>
                    <Image source={resource.pic} style={styles.img} />
                </TouchableOpacity>
                <Text style={styles.textCenter}>{resource.description}</Text>
            </View>
        )
    } else if (coordinatedActionResourcesStatus === 'failed') {
        content = <Text>failed</Text>
    }
    console.log(coordinatedActionId, coordinatedActionResources)

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
        marginBottom: 50,
	flex:1,
	alignItems:'center'
    },
    resourceContainer: {
        width: width,
	maxWidth:400,
        borderTopWidth: 1,
        borderTopColor: '#aaa',
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
        paddingTop: 10,
        paddingBottom:10
    },
    header: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24
    },
    img: {
        width: width,
	maxWidth:400,
        height: 200,
        marginTop: 10,
        marginBottom:10
    },
    textCenter: {
        textAlign: 'center'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        padding: 14,
        width: width
    },
    green: {
        color: 'rgb(55,182,53)',
        fontWeight: 'bold'
    }
});

export default CoordinatedActionResources
