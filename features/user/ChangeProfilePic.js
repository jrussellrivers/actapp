import * as React from 'react';
import { StyleSheet, Image, View, Platform, TouchableOpacity, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {changePage} from '../pageSlice'
import {changeUserStatus} from '../user/userSlice'
import {changeUserPicsStatus} from '../user/userPicsSlice'

export default function ChangeProfilePic() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)

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
            return result
        } catch (E) {
            console.log('in error')
            console.log(E);
        }
    };

    const _uploadToDB = async () => {
            
            const img = JSON.stringify({ uri: image.uri, name: image.filename, type: image.type})
            

            return await fetch(`http://localhost:3333/user/profilePic/${user.id}`, {
                method: 'POST',
                body: img,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={_pickImage} style={styles.button}><Text style={{fontWeight: 'bold', color:'rgb(55,182,53)'}}>CHOOSE A PROFILE PICTURE</Text></TouchableOpacity>
            {image && <Image source={{ uri: image.uri }} style={styles.image} />}
            {image && <TouchableOpacity style={styles.button} onPress={
                async ()=>{
                    await _uploadToDB()
                    dispatch(changeUserPicsStatus('idle'))
                    dispatch(changeUserStatus('idle'))
                    dispatch(changePage('profile'))
                }
            }><Text style={{fontWeight: 'bold', color:'rgb(55,182,53)'}}>UPLOAD</Text></TouchableOpacity>}
        </View>
    )
}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    main: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 100, 
        width:width 
    },
    button: {
        flex:1,
        alignItems:'center',
        padding:14,
        width:width-50
    },
    image: { 
        width: width, 
        height: width, 
        borderRadius:250 
    }
    
})