import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {CoordinatedActionResources} from './coordinatedActionResourcesSlice'
import * as WebBrowser from 'expo-web-browser';
import {assets} from '../../images/Assets'

const CoordinatedActionResources = ({coordinatedActionId}) => {

    // console.log(mapImage)
    // const mapImageUri = Image.resolveAssetSource(mapImage).uri
    ///////////////////////////////

    // console.log(images.map.uri)

    const dispatch = useDispatch()

    const [browserPage,setBrowserPage] = useState(null)

    const coordinatedActionResources = useSelector(state => state.actionResources.actionResources)
    const coordinatedActionResourcesStatus = useSelector(state => state.actionResources.status)
    const coordinatedActionResourcesError = useSelector(state => state.actionResources.error)

    useEffect(() => {
        dispatch(fetchActionResources(actionId))
        console.log(coordinatedActionResourcesStatus)
    }, [])

    useEffect(() => {
        if (coordinatedActionResourcesStatus === 'idle') {
            console.log(coordinatedActionResourcesStatus)
            dispatch(fetchCoordinatedActionResources(actionId))
        }
    }, [coordinatedActionResourcesStatus, dispatch])

    console.log(coordinatedActionResourcesStatus)

    let content

    console.log(coordinatedActionResources.coordinatedActionResources)

    const openLink = async(e) => {
        let result = await WebBrowser.openBrowserAsync(coordinatedActionResources[e.currentTarget.id].url);
    }

    if (coordinatedActionResourcesStatus === 'loading') {
        content = <Text>Loading...</Text>
    }else if (coordinatedActionResourcesStatus === 'succeeded') {
        content = actionResources.map((resource,idx)=><View key={idx}><Image source={assets.actionResources[idx].uri} style={{ width: 20, height: 20 }}/><Text  id={idx} onPress={openLink}>{resource.name}</Text></View>)
    } else if (coordinatedActionResourcesStatus === 'failed'){
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

export default CoordinatedActionResources

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});