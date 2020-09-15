import * as React from 'react';
import { Button, Image, View, Platform, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {changePage} from '../pageSlice'

export default function ProfilePic() {

    const dispatch = useDispatch()

    const registeredUser = useSelector(state => state.registeredUser.registeredUser)

    const [image,setImage] = useState(null)
    // const [postText,setPostText] = useState(null)

    useEffect(() => {
        getPermissionAsync();
    }, [])

    // const handleChange = (text) => {
    //     setPostText(text)
    // }

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };

    const  _pickImage = async () => {
        try {
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
            
            const img = JSON.stringify({ uri: image.uri, name: image.filename, type: image.type})
            

            return await fetch(`http://localhost:3333/user/profilePic/${registeredUser.id}`, {
                method: 'POST',
                body: img,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={_pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
            {image && <Button title="Upload" onPress={
                async ()=>{
                    await _uploadToDB()
                    dispatch(changePage('login'))
                }
            }/>}
        </View>
    )
}