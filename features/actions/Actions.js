import React, { useEffect, useState } from "react"
import { View, Text, TextInput, StyleSheet, Button, Dimensions, Image } from "react-native"
import { fetchActions } from './actionsSlice'
import { fetchCoordinatedActions } from './coordinatedSlice'
import { useSelector, useDispatch } from 'react-redux'
import { changeActionId } from '../actions/actionIdSlice'
import { changeCoordinatedActionId } from '../actions/coordinatedActionIdSlice'
import { changeCoordinatedActionResourcesStatus } from '../actions/coordinatedActionResourcesSlice'
import { changeCauseId } from '../actions/causeIdSlice'
import { changePage } from '../pageSlice'
import { TouchableOpacity } from "react-native-gesture-handler"
import { assets } from "../../images/Assets"
import { changeCausesStatus, fetchCauses } from '../actions/causesSlice'
import { updateAddress } from '../user/userSlice'
import { fetchPosts } from '../posts/postsSlice'

export default function TakeAction() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)
    const userStatus = useSelector(state => state.causes.status)
    const userError = useSelector(state => state.causes.error)

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
    const postsStatus = useSelector(state => state.posts.status)
    const postsError = useSelector(state => state.posts.error)

    // This fetches all Actions
    useEffect(() => {
        if (actionsStatus === 'idle') {
            dispatch(fetchActions())
        }
    }, [actionsStatus, dispatch])

    // // This fetches User info
    // useEffect(() => {
    //     if (userStatus === 'idle') {
    //         dispatch(fetchUser())
    //     }
    // }, [userStatus, dispatch])

    // This fetches all Causes
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

    // This fetches all Posts
    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    console.log(actions)
    console.log(assets.icons)
    console.log(causes)
    console.log(user)

    const [menuItemShowing,setMenuItemShowing] = useState(null)

    const formData = {}

    const handleChange = (name,text) => {
        formData[name] = text
    }

    const handleSubmit = async () => {
        fetch(`http://localhost:3333/user/updateInfo/${user.id}`, {method:'post',body:JSON.stringify(formData),headers:{'Content-Type':'application/json'}})
        dispatch(changeCausesStatus('idle'))
    }

    console.log(coordinatedActions)
    let coordActions = coordinatedActions.map((action,idx)=><TouchableOpacity key={action.id} style={styles.button} actionId={action.id} onPress={() => {
        changeCoordinatedActionResourcesStatus('idle')
        dispatch(changeCoordinatedActionId(action.id))
        dispatch(changePage('coordActionId'))
    }}><View style={styles.bullet}><Text style={styles.bold}>action</Text></View><Image source={{uri:action.icon}} style={{width:25,height:25,margin:7}} /><Text>{action.title.toUpperCase()}</Text></TouchableOpacity>)
    
    let menu 
    if(causesStatus === 'succeeded' && userStatus === 'succeeded') {
        if(menuItemShowing) {
            menu = causes.filter(cause => cause.id === menuItemShowing).map((cause,idx)=><TouchableOpacity key={cause.id} style={styles.menuButton} title={cause.cause_title} causeId={cause.id} onPress={() => {
                dispatch(changeCauseId(cause.cause_label))
                setMenuItemShowing(cause.id)
            }}><Image source={{uri:assets.icons[cause.id-1].uri}} style={{ width:50, height:50, margin:7 }} /><Text style={styles.green}>{cause.cause_title.toUpperCase()}</Text><TouchableOpacity onPress={() => setMenuItemShowing(null)} style={{margin:10,marginRight:20}}><Text>Back</Text></TouchableOpacity></TouchableOpacity>)
        } else {
            console.log(assets.icons,'89')
            menu = causes.map((cause,idx)=><TouchableOpacity key={cause.id} style={styles.button} title={cause.cause_title} causeId={cause.id} onPress={() => {
                dispatch(changeCauseId(cause.cause_label))
                setMenuItemShowing(cause.id)
            }}><Image source={{uri:assets.icons[idx].uri}} style={{ width:50, height:50, margin:7 }} /><Text style={styles.green}>{cause.cause_title.toUpperCase()}</Text></TouchableOpacity>)
        }
    }
    let content
    let page
    
    if(causeId && causeId !== 'all') {
        content = actions.filter((action,idx) => action.cause === causeId).map(action=><TouchableOpacity key={action.id} style={styles.button} actionId={action.id} onPress={() => {
        dispatch(changeActionId(action.id))
        dispatch(changePage('actionId'))
    }}><View style={styles.bullet}><Text style={styles.bold}>action</Text></View><Text>{action.title.toUpperCase()}</Text></TouchableOpacity>)
    }
    else if(causeId === 'all') {
        content = actions.map((action,idx)=><TouchableOpacity key={action.id} style={styles.button} actionId={action.id} onPress={() => {
            dispatch(changeActionId(action.id))
            dispatch(changePage('actionId'))
        }}><View style={styles.bullet}><Text style={styles.bold}>action</Text></View><Image source={{uri:action.icon}} style={{width:25,height:25,margin:7}} /><Text>{action.title.toUpperCase()}</Text></TouchableOpacity>).slice(1,actions.length)
    } else {
        content = null
    }
    if(causesStatus === 'loading' || userStatus === 'loading' || coordinatedActionsStatus === 'loading' || postsStatus === 'loading') {
        page = <Text>loading</Text>
    } else if(causesStatus === 'succeeded' && userStatus === 'succeeded' && coordinatedActionsStatus === 'succeeded' && postsStatus === 'succeeded') {
        let postsOfCoordActions = posts.filter(p=>p.action_title === coordinatedActions[0].title || p.action_title === coordinatedActions[1].title || p.action_title === coordinatedActions[2].title ? true : false)
        page = 
            <View style={styles.main}>
                {!user.streetaddress || user.streetaddress === 'undefined' ?
                    <View style={styles.popup}>
                        <View style={styles.popupContentContainer}>
                            <View style={styles.headerContainer}>
                                <View style={styles.imageBackground}>
                                    <Image source={{uri:assets.fist.uri}} style={{height:100,width:100,margin:'auto'}} />
                                </View>
                            </View>
                            <View style={styles.popupTextContainer}>
                                <Text style={styles.popupText}>Here you'll find a <Text style={styles.bold}>list of actions and resources</Text> to help you get started in taking action! Some of the resources provided require your address to give you tailored support. Please enter your address below to get the full experience!</Text>
                            </View>
                            <TextInput name="streetAddress" onChangeText={text => handleChange("streetaddress",text)} placeholder="Address" autofill="street-address" style={styles.input} />
                            <TextInput name="city" onChangeText={text => handleChange("city",text)} placeholder="City" style={styles.input} />
                            <TextInput name="state" onChangeText={text => handleChange("state",text)} placeholder="State" style={styles.input} />
                            <TextInput name="zipcode" onChangeText={text => handleChange("zipcode",text)} placeholder="Zip Code" style={styles.input} />                            
                            <TouchableOpacity onPress={()=>{
                                handleSubmit()
                                console.log(formData.streetaddress)
                                dispatch(updateAddress(formData.streetaddress))
                            }} style={styles.popupButton}><Text style={styles.popupGreen}>SUBMIT</Text></TouchableOpacity>
                        </View>
                    </View>
                : null}
                <View style={styles.row}>
                    {posts.filter(p=>p.action_title === coordinatedActions[0].title || p.action_title === coordinatedActions[1].title || p.action_title === coordinatedActions[2].title ? true : false).map(post=><Image key={post.id} source={post.picurl} style={{width:width/4,height:width/4}}/>).slice(postsOfCoordActions.length-4,postsOfCoordActions.length)}
                </View> 
                <View style={styles.coordActionsContainer}>
                    <View style={styles.center}><Text style={styles.header}>COORDINATED ACTIONS (?)</Text></View>
                    {coordActions}
                </View>
                <View style={styles.row}>
                    {posts.map(post=><Image key={post.id} source={post.picurl} style={{width:width/8,height:width/8}}/>).sort((a,b) => b.key - a.key).slice(0,20)}
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
    }
    return (
        <View>
            {page}
        </View>
    )
}

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

const styles = StyleSheet.create({
    main: {
        marginTop:-50,
        marginBottom:50
    },
    popup: {
        width:width,
        height:height,
        backgroundColor:'rgba(220,220,220,0.5)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        zIndex:10,
        position:'absolute',
        top:0,
        left:0
    },
    popupContentContainer: {
        height:450,
        backgroundColor:'white',
        padding:10,
        marginTop:-150,
        alignItems:'center'
    },
    headerContainer: {
        paddingTop:10,
        paddingBottom:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        margin:'auto',
        marginTop:-3,
        marginBottom:10,
        width:120,
    },
    imageBackground: {
        backgroundColor:'rgb(55,182,53)',
        borderRadius:100,
        padding:10
    },
    popupTextContainer: {
        width:width-40,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
    popupText: {
        textAlign:'center'
    },
    input: {
        height:36,
        width:width-50,
        textAlign:'center'
    },
    popupButton: {
        flex:1,
        alignItems:'center',
        padding:14,
        width:width-50,
        marginTop:10
    },
    popupGreen: {
        color:'rgb(55,182,53)',
        fontWeight:'bold'
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