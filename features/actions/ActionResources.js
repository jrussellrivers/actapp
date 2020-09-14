import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {fetchActionResources} from './actionResourcesSlice'
import * as WebBrowser from 'expo-web-browser';
import {assets} from '../../images/Assets'

const ActionResources = ({actionId}) => {

    // console.log(mapImage)
    // const mapImageUri = Image.resolveAssetSource(mapImage).uri
    ///////////////////////////////

    // console.log(images.map.uri)

    const dispatch = useDispatch()

    const [browserPage,setBrowserPage] = useState(null)

    const actionResources = useSelector(state => state.actionResources.actionResources)
    const actionResourcesStatus = useSelector(state => state.actionResources.status)
    const actionResourcesError = useSelector(state => state.actionResources.error)

    useEffect(() => {
        dispatch(fetchActionResources(actionId))
        console.log(actionResourcesStatus)
    }, [])

    useEffect(() => {
        if (actionResourcesStatus === 'idle') {
            console.log(actionResourcesStatus)
            dispatch(fetchActionResources(actionId))
        }
    }, [actionResourcesStatus, dispatch])

    console.log(actionResourcesStatus)

    let content

    console.log(actionResources.actionResources)

    const openLink = async(e) => {
        let result = await WebBrowser.openBrowserAsync(actionResources[e.currentTarget.id].url);
    }

    if (actionResourcesStatus === 'loading') {
        content = <Text>Loading...</Text>
    }else if (actionResourcesStatus === 'succeeded') {
        content = actionResources.map((resource,idx)=><View key={idx}><Image source={assets.actionResources[idx].uri} style={{ width: 20, height: 20 }}/><Text  id={idx} onPress={openLink}>{resource.name}</Text></View>)
    } else if (actionResourcesStatus === 'failed'){
        content = <Text>`Action id = ${actionId}`</Text>
    }
    console.log(actionId,actionResources)

    return (
        <View style={styles.container}>
            {content}
            <Image source={require('../../images/map.png')} style={{ width: 200, height: 200 }}/>
            <Text onPress={() => {
                    dispatch(changePage('actions'))
                }}>Return to List of Actions</Text>
        </View>
    )
}

export default ActionResources

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});