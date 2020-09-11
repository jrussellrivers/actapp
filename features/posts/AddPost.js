import * as React from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {useState,useEffect} from 'react'

export default function AddImage() {

    const [image,setImage] = useState(null)

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
      };

    const  _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });
            if (!result.cancelled) {
            setImage(result.uri);
            }
    
            console.log(result);
        } catch (E) {
            console.log(E);
        }
        };

    const _uploadToDB = () => {
        fetch('http://localhost:3333/upload')
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={_pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            {image && <Button title="Upload" onPress={_uploadToDB}/>}
        </View>
    )
}


// export default class ImagePickerExample extends React.Component {
//   state = {
//     image: null,
//   };

//   render() {
//     let { image } = this.state;

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Button title="Pick an image from camera roll" onPress={this._pickImage} />
//         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       </View>
//     );
//   }

//   componentDidMount() {
//     this.getPermissionAsync();
//   }

//   getPermissionAsync = async () => {
//     if (Platform.OS !== 'web') {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   };

//   _pickImage = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
//       if (!result.cancelled) {
//         this.setState({ image: result.uri });
//       }

//       console.log(result);
//     } catch (E) {
//       console.log(E);
//     }
//   };
// }