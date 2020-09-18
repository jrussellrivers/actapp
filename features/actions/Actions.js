import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Button, Dimensions, Image } from "react-native"
import { fetchActions } from './actionsSlice'
import { fetchCauses } from './causesSlice'
import { fetchCoordinatedActions } from './coordinatedSlice'
import { useSelector, useDispatch } from 'react-redux'
import { changeActionId } from '../actions/actionIdSlice'
import { changeCauseId } from '../actions/causeIdSlice'
import { changePage } from '../pageSlice'
import { TouchableOpacity } from "react-native-gesture-handler"
import { assets } from "../../images/Assets"

export default function TakeAction() {
    const dispatch = useDispatch()

    const causes = useSelector(state => state.causes.causes)
    const causesStatus = useSelector(state => state.causes.status)
    const causesError = useSelector(state => state.causes.error)

    const causeId = useSelector(state => state.causeId.causeId)

    const actions = useSelector(state => state.actions.actions)
    const actionsStatus = useSelector(state => state.actions.status)
    const actionsError = useSelector(state => state.actions.error)

    const coordinatedActions = useSelector(state => state.coordinatedActions.coordinatedActions)
    const coordinatedActionsStatus = useSelector(state => state.coordinatedActions.status)
    const coordinatedActionsError = useSelector(state => state.coordinatedActions.error)
    
    const posts = useSelector(state => state.posts.posts)
    console.log(posts)

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

    // This fetches all Coordinated Actions
    useEffect(() => {
        if (coordinatedActionsStatus === 'idle') {
            dispatch(fetchCoordinatedActions())
        }
    }, [coordinatedActionsStatus, dispatch])

    console.log(actions)
    console.log(assets.icons)

    const [menuItemShowing,setMenuItemShowing] = useState(null)

    console.log(coordinatedActions)
    let coordActions = coordinatedActions.map((action,idx)=><TouchableOpacity key={action.id} style={styles.button} actionId={action.id} onPress={() => {
        dispatch(changePage('actionId'))
        dispatch(changeActionId(action.id))
        // dispatch(fetchActionResources(action.id))
    }}><View style={styles.bullet}><Text style={styles.bold}>action</Text></View><Image source={{uri:action.icon}} style={{width:25,height:25,margin:7}} /><Text>{action.title.toUpperCase()}</Text></TouchableOpacity>)
    
    let menu 
    if(menuItemShowing) {
        menu = causes.filter(cause => cause.id === menuItemShowing).map((cause,idx)=><TouchableOpacity key={cause.id} style={styles.menuButton} title={cause.cause_title} causeId={cause.id} onPress={() => {
            dispatch(changeCauseId(cause.cause_label))
            setMenuItemShowing(cause.id)
        }}><Image source={{uri:assets.icons[cause.id-1].uri}} style={{ width:50, height:50, margin:7 }} /><Text style={styles.green}>{cause.cause_title.toUpperCase()}</Text><TouchableOpacity onPress={() => setMenuItemShowing(null)} style={{margin:10,marginRight:20}}><Text>Back</Text></TouchableOpacity></TouchableOpacity>)
    } else {
        menu = causes.map((cause,idx)=><TouchableOpacity key={cause.id} style={styles.button} title={cause.cause_title} causeId={cause.id} onPress={() => {
            dispatch(changeCauseId(cause.cause_label))
            setMenuItemShowing(cause.id)
        }}><Image source={{uri:assets.icons[idx].uri}} style={{ width:50, height:50, margin:7 }} /><Text style={styles.green}>{cause.cause_title.toUpperCase()}</Text></TouchableOpacity>)
    }
    let content
    
    if(causeId && causeId !== 'all') {
        content = actions.filter((action,idx) => action.cause === causeId).map(action=><TouchableOpacity key={action.id} style={styles.button} actionId={action.id} onPress={() => {
        dispatch(changePage('actionId'))
        dispatch(changeActionId(action.id))
        // dispatch(fetchActionResources(action.id))
    }}><View style={styles.bullet}><Text style={styles.bold}>action</Text></View><Text>{action.title.toUpperCase()}</Text></TouchableOpacity>)
    }
    else if(causeId === 'all') {
        content = actions.map((action,idx)=><TouchableOpacity key={action.id} style={styles.button} actionId={action.id} onPress={() => {
            dispatch(changePage('actionId'))
            dispatch(changeActionId(action.id))
            // dispatch(fetchActionResources(action.id))
        }}><View style={styles.bullet}><Text style={styles.bold}>action</Text></View><Image source={{uri:action.icon}} style={{width:25,height:25,margin:7}} /><Text>{action.title.toUpperCase()}</Text></TouchableOpacity>).slice(1,actions.length)
    } else {
        content = null
    }
    

    return (
        <View style={styles.main}>
            <View style={styles.row}>
                {posts.map(post=><Image key={post.id} source={post.picurl} style={{width:width/4,height:width/4}}/>).slice(posts.length-4,posts.length)}
            </View> 
            <View style={styles.coordActionsContainer}>
                <View style={styles.center}><Text style={styles.header}>COORDINATED ACTIONS (?)</Text></View>
                {coordActions}
            </View>
            <View style={styles.row}>
                {posts.map(post=><Image key={post.id} source={post.picurl} style={{width:width/8,height:width/8}}/>).sort((a,b) => b.key - a.key).slice(posts.length-113,posts.length-5)}
            </View> 
            <View style={styles.actionsContainer}>
                <View style={styles.center}>
                    <Text style={styles.header}>ACTIONS BY CATEGORY (?)</Text>
                </View>
                {menu}
                <View style={styles.marginTop}>
                    {content}
                </View>
            </View>
            <Button title="Back" onPress={() => dispatch(changePage('feed'))} /> 
        </View>
        
    )
}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    main: {
        marginTop:-50,
        marginBottom:50
    },
    header: {
        fontSize:16,
        fontWeight:'bold'
    },
    center: {
        flex:1,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingTop:10,
        paddingBottom:20,
        marginBottom:10
    },
    coordActionsContainer: {
        borderWidth:1,
        borderColor:'#aaa',
        borderRadius:10,
        padding:10,
        width:width-40,
        marginLeft:20,
        marginRight:20
    },
    actionsContainer: {
        borderWidth:1,
        borderColor:'#aaa',
        borderRadius:10,
        padding:10,
        width:width-40,
        marginLeft:20,
        marginRight:20,
        marginBottom:20
    },
    row: {
        flex:1,
        flexDirection:'row',
        marginTop:20,
        marginBottom:20,
        width:width,
        overflow:'scroll'
    },
    menuButton: {
        flex:1,
        alignItems:'center',
        // padding:14,
        width:width-50,
        margin:3,
        flex:1,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    button: {
        flex:1,
        alignItems:'center',
        // padding:14,
        width:width-50,
        margin:3,
        flex:1,
        flexDirection:'row'
    },
    green: {
        color:'rgb(55,182,53)',
        fontWeight:'bold',
        fontSize:16
    },
    marginTop: {
        marginTop:5
    },
    bullet: {
        width:50,
        height:50,
        backgroundColor:'rgba(55,182,53,0.8)',
        borderRadius:10,
        marginRight:3,
        padding:3
    },
    bold: {
        fontWeight:'bold'
    }
})