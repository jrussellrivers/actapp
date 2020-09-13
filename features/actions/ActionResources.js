import React, {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import {changePage} from '../pageSlice'
import {useSelector,useDispatch} from 'react-redux'
import {fetchActionResources} from './actionResourcesSlice'

const ActionResources = ({actionId}) => {
    const dispatch = useDispatch()

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

    if (actionResourcesStatus === 'loading') {
        content = <Text>Loading...</Text>
    }else if (actionResourcesStatus === 'succeeded') {
        content = actionResources.map(resource=><Text>{resource.name}</Text>)
    } else if (actionResourcesStatus === 'failed'){
        content = <Text>`Action id = ${actionId}`</Text>
    }
    console.log(actionId,actionResources)

    return (
        <View style={styles.container}>
            {content}
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