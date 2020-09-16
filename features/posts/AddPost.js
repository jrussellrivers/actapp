import * as React from 'react';
import { Button, Image, View, Platform, TextInput, Picker, Text } from 'react-native';
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
    const [postText,setPostText] = useState(null)
    const [postCause,setPostCause] = useState("none")
    const [postAction,setPostAction] = useState("none")
    const [postPoints,setPostPoints] = useState(null)

    

    useEffect(() => {
        getPermissionAsync();
    }, [])

    const handleChange = (text) => {
        setPostText(text)
    }

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };

    const  _pickImage = async () => {
        console.log('in picker')
        try {
            console.log('in try')
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0,
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

    let contentA
    let contentB   

    let causesDropdownItems

    if (causesStatus === 'loading'){
        return <Text>...loading</Text>
    } else if (causesStatus === 'succeeded'){
        causesDropdownItems = causes.map((cause,idx)=> <Picker.Item key={idx} label={cause.cause_title} value={cause.cause_label} />)
        {/* CAUSES DROPDOWN */}
        contentA = <Picker
            selectedValue={postCause}
            style={{ height: 36, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
                setPostCause(itemValue)
                dispatch(fetchActionsByCause(itemValue))
            }}
        >
            <Picker.Item label="Cause" value="none" />
            {causesDropdownItems}
        </Picker>
        }

    let actionsDropdownItems

    if (actionsByCauseStatus === 'loading'){
        return <Text>...loading</Text>
    } else if (actionsByCauseStatus === 'succeeded'){
        actionsDropdownItems = actionsByCause.map((action,idx)=> <Picker.Item key={idx} label={`${action.title} (+${action.points} points)`} value={action.id} />)
        {/* this is where the conditional logic/rendering would go for showing a dropdown with actions related to the cause the user selected above - may have to create a whole redux state and route to fetch actions by cause... */}
            {/* ACTIONS DROPDOWN */}
            contentB = <Picker
                selectedValue={postAction}
                style={{ height: 36, width: 150 }}
                onValueChange={(itemValue, itemIndex) => {
                    setPostAction(itemValue)
                }}
            >
                <Picker.Item label="Action" value="none" />
                {actionsDropdownItems}
            </Picker>
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={_pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
            {contentA}
            {contentB}
            {/* <Text>Points: {postAction.points}</Text> */}
            <TextInput onChangeText={handleChange} />
            {image && <Button title="Upload" onPress={
                async ()=>{
                    await _uploadToDB()
                    dispatch(changeStatus('idle'))
                    dispatch(changePage('feed'))
                }
            }/>}
        </View>
    )
}