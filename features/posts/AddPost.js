import * as React from 'react';
import { Button, Image, View, Platform, TextInput, Picker, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {useState,useEffect} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {changeStatus} from './postsSlice'
import {changePage} from '../pageSlice'
import {fetchCauses} from '../actions/causesSlice'
import {fetchActionsByCause} from '../actions/actionsByCauseSlice'
import Icon from 'react-native-vector-icons/AntDesign'

let width = Dimensions.get('window').width; //full width

export default function AddImage() {

    const dispatch = useDispatch()

    const user = useSelector(state=>state.user.user)
    const causes = useSelector(state=>state.causes.causes)
    const actionsByCause = useSelector(state=>state.actionsByCause.actionsByCause)

    const causesStatus = useSelector(state => state.causes.status)
    const causesError = useSelector(state => state.causes.error)
    const actionsByCauseStatus = useSelector(state => state.actionsByCause.status)
    const actionsByCauseError = useSelector(state => state.actionsByCause.error)

    // This fetches all Causes
    useEffect(() => {
        if (causesStatus === 'idle') {
                dispatch(fetchCauses())
            }
    }, [causesStatus, dispatch])

    console.log(causes)

    const [image,setImage] = useState(null)
    const [postText,setPostText] = useState("Write a caption...")
    const [postCause,setPostCause] = useState("Cause: ")
    const [postAction,setPostAction] = useState(1)
    const [postPoints,setPostPoints] = useState(null)

                        {/* ------------------------ PERMISSIONS ------------------------ */}

    useEffect(() => {
        getPermissionAsync();
    }, [])

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }

                    {/* ------------------------ IMAGE PICKER ------------------------ */}

    const  _pickImage = async () => {
        console.log('in picker')
        try {
            console.log('in try')
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                let localUri = result.uri;
                let filename = localUri.split('/').pop();
                // Infer the type of the image
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                result.filename = filename
                result.type = type
                setImage(result);
            }
            console.log(result);
            return result
        } catch (E) {
            console.log('in error')
            console.log(E);
        }
    };

    const _uploadToDB = async () => {
            let action = await fetch(`http://localhost:3333/actions/id/${postAction}`)
            .then(r=>r.json())
            .then(data=>data)

            console.log(action,postAction)
            const img = JSON.stringify({ uri: image.uri, name: image.filename, type: image.type, text: postText, cause: postCause, action: action.title, points: action.points })
            
            return await fetch(`http://localhost:3333/upload/${user.username}/${user.id}`, {
                method: 'POST',
                body: img,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    {/* ------------------------ POST TEXT/BODY ------------------------ */}
    
        const changePostText = (text) => {
            setPostText(text)
        }

    {/* ------------------------ DEFINING CAUSES DROPDOWN ------------------------ */}

    let contentA
    let contentB   
    
    let causesDropdownItems

    const [otherInputsShowing,setOtherInputsShowing] = useState(false)
    const [infoShowing,setInfoShowing] = useState(0)

    const showInfo = e => {
        setInfoShowing(infoShowing+1)
        //XXXXXXXXXX changing the 1 to a different number below to account for more info boxes won't work if they click the cause ? more than once in the beginning, so implement redux of 'if user has not posted display the info automatically on top of the input'
        if(infoShowing > 1) setInfoShowing(0)
    }

    if (causesStatus === 'loading'){
        return <Text>...loading</Text>
    } else if (causesStatus === 'succeeded'){
        causesDropdownItems = causes.map((cause,idx)=> <Picker.Item key={idx} label={cause.cause_title} value={cause.cause_label} />)
        {/* CAUSES DROPDOWN */}
        contentA = <View>
            <Picker
                selectedValue={postCause}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                    setPostCause(itemValue)
                    if(itemValue !== 'none' && itemValue !== 'Cause: ') {
                        dispatch(fetchActionsByCause(itemValue))
                        setOtherInputsShowing(false)
                    } 
                    if(itemValue === 'Cause: ') {
                        setOtherInputsShowing(!otherInputsShowing)
                    }
                }}
            >
                <Picker.Item label="Cause" value="Cause: " />
                {causesDropdownItems}
                <Picker.Item label="Other" value="Cause: " />
            </Picker>
        </View>
        }
    {/* ------------------------ DEFINING ACTION DROPDOWN ------------------------ */}
    let actionsDropdownItems

    if (actionsByCauseStatus === 'loading'){
        return <Text>...loading</Text>
    } else if (actionsByCauseStatus === 'succeeded'){
        actionsDropdownItems = actionsByCause.map((action,idx)=> <Picker.Item key={idx} label={`${action.title} (+${action.points} points)`} value={action.id} />)
        {/* this is where the conditional logic/rendering would go for showing a dropdown with actions related to the cause the user selected above - may have to create a whole redux state and route to fetch actions by cause... */}
            {/* ACTIONS DROPDOWN */}
            contentB = <Picker
                selectedValue={postAction}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                    setPostAction(itemValue)
                }}
            >
                <Picker.Item label="Action" value="" />
                {actionsDropdownItems}
                <Picker.Item label="None of the Above" value="" />
            </Picker>
    }

    return (
        <View style={styles.main}>
            {postCause !== "none" ?
                <View>
                    {image ? null : <Button title="Pick an image from camera roll" onPress={_pickImage} />}
                    {image && <TouchableOpacity onPress={_pickImage} style={styles.pic}><Image source={{ uri: image.uri }} style={{ width: width, height: width }} /></TouchableOpacity>}
                </View>
            : null}
            {image ? <TextInput style={styles.textInput} onFocus={() => {if(postText === "Write a caption...")setPostText("")}} onBlur={() => {if(postText === "")setPostText("Write a caption...")}}onChangeText={changePostText} value={postText} /> : null}
{/* ------------------------ CAUSE DROPDOWN ------------------------ */}
            <View style={styles.flex}>
                {contentA}
                <Icon name="question" size={16} onPress={showInfo}/>
                {infoShowing === 1 ? 
                    <TouchableOpacity style={styles.info} onPress={showInfo}><Text>What cause does this post support?</Text></TouchableOpacity>
                : null}
            </View>
            {otherInputsShowing ? <TextInput style={styles.textInput} onFocus={() => {if(postCause === "Cause: "){setPostCause("");setPostAction(1)}}} onBlur={() => {if(postCause === "")setPostCause("Cause: ")}} onChangeText={text => setPostCause(text)} value={postCause} /> : null}
            {/* USER COULD ENTER OWN ACTION, but issues sending it back to the backend >>>>> {otherInputsShowing && postCause !== 'Cause: ' ? <TextInput style={styles.textInput} onFocus={() => {if(postAction === "Action: ")setPostAction("")}} onBlur={() => {if(postAction === "")setPostAction("Action: ")}} onChangeText={text => setPostAction(text)} value={postAction}/> : null} */}
            {otherInputsShowing ? <Text style={styles.smallGray}>Limit 40 Characters</Text> : null}
{/* ------------------------ ACTION DROPDOWN ------------------------ */}
            {!otherInputsShowing ? 
                <View>{contentB}
                    {/* <Icon name="question" size={16} onPress={showInfo}/> */}
                    {/* XXXXXXX NOT GOING TO WORK - SEE XXXXX NOTE ABOVE */}
                    {/* {infoShowing === 2 ? 
                        <TouchableOpacity style={styles.info} onPress={showInfo}><Text>What cause does this post support?</Text></TouchableOpacity>
                    : null} */}
                </View> : null}
            {/* <Text>Points: {postAction.points}</Text> */}
            {image && postText !== "Write a caption..." && postText !== "" ? <Button title="Post" onPress={
                async ()=>{
                    await _uploadToDB()
                    dispatch(changeStatus('idle'))
                    dispatch(changePage('feed'))
                }
            }/>
            : null}
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        marginTop:105, 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    flex: {
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    picker: { 
        height: 36, 
        width: 250, 
        borderWidth:0, 
        margin:7, 
        backgroundColor:'white' 
    },
    pic: {
        marginTop:-90
    },
    info: {
        position:'absolute',
        backgroundColor:'#eee',
        padding:14
    },
    textInput: {
        padding:7,
        width:width-50
    },
    smallGray: {
        fontSize:12,
        color:'#999',
        fontStyle:'italic'
    }
})