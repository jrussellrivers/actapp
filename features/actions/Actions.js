import React, {useEffect} from "react"
import {View,Text,StyleSheet,Button} from "react-native"
import {fetchActions} from './actionsSlice'
import {useSelector,useDispatch} from 'react-redux'
import {changeActionId} from '../actions/actionIdSlice'
import {changePage} from '../pageSlice'
import {fetchActionResources} from '../actions/actionResourcesSlice'

export default function TakeAction() {
    const dispatch = useDispatch()

    const actions = useSelector(state => state.actions.actions)
    const actionsStatus = useSelector(state => state.actions.status)
    const actionsError = useSelector(state => state.actions.error)
    

    // This fetches all Actions
    useEffect(() => {
        if (actionsStatus === 'idle') {
            dispatch(fetchActions())
        }
    }, [actionsStatus, dispatch])

    console.log(actions)

    let coordinatedActions //= coordinatedActions.map(action=><Button style={styles.button} title={action.title}/>)
    let content = actions.map(action=><Button style={styles.button} title={action.title} actionId={action.id} onPress={() => {
        dispatch(changePage('actionId'))
        dispatch(changeActionId(action.id))
        // dispatch(fetchActionResources(action.id))
    }}/>)

    return (
        <View>
            
            <Text>Coordinated Actions (?)</Text>
            {/* {coordinatedActions} */}<Text>..........List of Coordinated Actions.........</Text>
            <Text>Take Action</Text>
            {content}
            <Button title="Back" onPress={() => dispatch(changePage('feed'))} /> 
        </View>
        
    )
}

const styles = StyleSheet.create({
    button: {
        marginBottom:5
    },
    postContainer: {
        margin:10
    }
})