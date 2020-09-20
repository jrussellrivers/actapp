import * as React from 'react';
import { Text, Image, View, Platform, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {changePage} from '../pageSlice'
import { assets } from '../../images/Assets'
import url from '../../url'

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
            

            return await fetch(`${url}/user/profilePic/${registeredUser.id}`, {
                method: 'POST',
                body: img,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    return (
        <View style={styles.container}>
            <View style={styles.imageBackground}>
                <Image source={{uri:assets.fist.uri}} style={{height:100,width:100,margin:'auto'}} />
            </View>
            <TouchableOpacity onPress={_pickImage} style={styles.button}>
                <Text style={styles.green}>SELECT A PROFILE PICTURE</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image.uri }} style={{ width: width, height: width, borderRadius:400 }} />}
            {image && <TouchableOpacity onPress={
                async ()=>{
                    await _uploadToDB()
                    dispatch(changePage('login'))
                }
            } style={styles.button}>
                <Text style={styles.green}>UPLOAD</Text>
            </TouchableOpacity>}
        </View>
    )
}


let width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        borderRadius:10,
        padding:10,
        width:width-40,
        marginLeft:20,
        marginRight:20,
        flex:1,
        alignItems:'center'
    },
    headerContainer: {
        paddingBottom:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        marginTop:-3,
        marginBottom:10
    },
    imageBackground: {
        backgroundColor:'rgb(55,182,53)',
        borderRadius:100,
        padding:10,
        marginTop:-3,
        marginBottom:20
    },
    header: {
        color:'#555',
        fontWeight:'bold',
        fontSize:16
    },
    checkbox: {
        marginTop:5,
        marginBottom:5
    },
    button: {
        flex:1,
        alignItems:'center',
        padding:14,
        width:width-50,
        marginTop:0
    },
    green: {
        color:'rgb(55,182,53)',
        fontWeight:'bold'
    },
    message: {
        fontStyle:'italic',
        color:'#999',
        marginTop:10
    }
})