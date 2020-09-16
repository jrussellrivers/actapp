import React, {useEffect} from "react"
import {View,Text,StyleSheet,Button} from "react-native"
import {fetchActions} from './actionsSlice'
import {fetchCauses} from './causesSlice'
import {useSelector,useDispatch} from 'react-redux'
import {changeActionId} from '../actions/actionIdSlice'
import {changeCauseId} from '../actions/causeIdSlice'
import {changePage} from '../pageSlice'

export default function TakeAction() {
    const dispatch = useDispatch()

    const causes = useSelector(state => state.causes.causes)
    const causesStatus = useSelector(state => state.causes.status)
    const causesError = useSelector(state => state.causes.error)

    const causeId = useSelector(state => state.causeId.causeId)

    const actions = useSelector(state => state.actions.actions)
    const actionsStatus = useSelector(state => state.actions.status)
    const actionsError = useSelector(state => state.actions.error)
    

    // This fetches all Actions
    useEffect(() => {
        if (actionsStatus === 'idle') {
            dispatch(fetchActions())
        }
    }, [actionsStatus, dispatch])

    // This fetches all Actions
    useEffect(() => {
        if (causesStatus === 'idle') {
            dispatch(fetchCauses())
        }
    }, [causesStatus, dispatch])

    console.log(actions)
    console.log(causeId)

    let coordinatedActions //= coordinatedActions.map(action=><Button style={styles.button} title={action.title}/>)
    let menu = causes.map((cause,idx)=><Button key={cause.id} style={styles.button} title={cause.cause_title} causeId={cause.id} onPress={() => {
        dispatch(changeCauseId(cause.cause_label))
    }}/>)

    let content 
    
    if(causeId && causeId !== 'all') {
        content = actions.filter(action => action.cause === causeId).map(action=><Button key={action.id} style={styles.button} title={action.title} actionId={action.id} onPress={() => {
        dispatch(changePage('actionId'))
        dispatch(changeActionId(action.id))
        // dispatch(fetchActionResources(action.id))
    }}/>)
    }
    else if(causeId === 'all') {
        content = actions.map(action=><Button key={action.id} style={styles.button} title={action.title} actionId={action.id} onPress={() => {
            dispatch(changePage('actionId'))
            dispatch(changeActionId(action.id))
            // dispatch(fetchActionResources(action.id))
        }}/>).slice(1,actions.length)
    }
    

    return (
        <View>
            
            <Text>Coordinated Actions (?)</Text>
            {/* {coordinatedActions} */}<Text>..........List of Coordinated Actions.........</Text>
            {menu}
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