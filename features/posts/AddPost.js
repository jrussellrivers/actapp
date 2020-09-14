// // import React, { Component } from 'react';
// // import {
// //   ActivityIndicator,
// //   Button,
// //   Clipboard,
// //   Image,
// //   Share,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import { Constants, ImagePicker, Permissions } from 'expo';

// // export default class App extends Component {
// //   state = {
// //     image: null,
// //     uploading: false,
// //   };

// //   render() {
// //     let {
// //       image
// //     } = this.state;

// //     return (
// //       <View style={styles.container}>
// //         <StatusBar barStyle="default" />

// //         <Text
// //           style={styles.exampleText}>
// //           Example: Upload ImagePicker result
// //         </Text>

// //         <Button
// //           onPress={this._pickImage}
// //           title="Pick an image from camera roll"
// //         />

// //         <Button onPress={this._takePhoto} title="Take a photo" />

// //         {this._maybeRenderImage()}
// //         {this._maybeRenderUploadingOverlay()}
// //       </View>
// //     );
// //   }

// //   _maybeRenderUploadingOverlay = () => {
// //     if (this.state.uploading) {
// //       return (
// //         <View
// //           style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
// //           <ActivityIndicator color="#fff" size="large" />
// //         </View>
// //       );
// //     }
// //   };

// //   _maybeRenderImage = () => {
// //     let {
// //       image
// //     } = this.state;

// //     if (!image) {
// //       return;
// //     }

// //     return (
// //       <View
// //         style={styles.maybeRenderContainer}>
// //         <View
// //           style={styles.maybeRenderImageContainer}>
// //           <Image source={{ uri: image }} style={styles.maybeRenderImage} />
// //         </View>

// //         <Text
// //           onPress={this._copyToClipboard}
// //           onLongPress={this._share}
// //           style={styles.maybeRenderImageText}>
// //           {image}
// //         </Text>
// //       </View>
// //     );
// //   };

// //   _share = () => {
// //     Share.share({
// //       message: this.state.image,
// //       title: 'Check out this photo',
// //       url: this.state.image,
// //     });
// //   };

// //   _copyToClipboard = () => {
// //     Clipboard.setString(this.state.image);
// //     alert('Copied image URL to clipboard');
// //   };

// //   _takePhoto = async () => {
// //     const {
// //       status: cameraPerm
// //     } = await Permissions.askAsync(Permissions.CAMERA);

// //     const {
// //       status: cameraRollPerm
// //     } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

// //     // only if user allows permission to camera AND camera roll
// //     if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
// //       let pickerResult = await ImagePicker.launchCameraAsync({
// //         allowsEditing: true,
// //         aspect: [4, 3],
// //       });

// //       this._handleImagePicked(pickerResult);
// //     }
// //   };

// //   _pickImage = async () => {
// //     const {
// //       status: cameraRollPerm
// //     } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

// //     // only if user allows permission to camera roll
// //     if (cameraRollPerm === 'granted') {
// //       let pickerResult = await ImagePicker.launchImageLibraryAsync({
// //         allowsEditing: true,
// //         aspect: [4, 3],
// //       });

// //       this._handleImagePicked(pickerResult);
// //     }
// //   };

// //   _handleImagePicked = async pickerResult => {
// //     let uploadResponse, uploadResult;

// //     try {
// //       this.setState({
// //         uploading: true
// //       });

// //       if (!pickerResult.cancelled) {
// //         uploadResponse = await uploadImageAsync(pickerResult.uri);
// //         uploadResult = await uploadResponse.json();

// //         this.setState({
// //           image: uploadResult.location
// //         });
// //       }
// //     } catch (e) {
// //       console.log({ uploadResponse });
// //       console.log({ uploadResult });
// //       console.log({ e });
// //       alert('Upload failed, sorry :(');
// //     } finally {
// //       this.setState({
// //         uploading: false
// //       });
// //     }
// //   };
// // }

// // async function uploadImageAsync(uri) {
// //   let apiUrl = 'http://localhost:3333/upload';

// //   // Note:
// //   // Uncomment this if you want to experiment with local server
// //   //
// //   // if (Constants.isDevice) {
// //   //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
// //   // } else {
// //   //   apiUrl = `http://localhost:3000/upload`
// //   // }

// //   let uriParts = uri.split('.');
// //   let fileType = uriParts[uriParts.length - 1];

// //   let formData = new FormData();
// //   formData.append('photo', {
// //     uri,
// //     name: `photo.${fileType}`,
// //     type: `image/${fileType}`,
// //   });

// //   let options = {
// //     method: 'POST',
// //     body: formData,
// //     headers: {
// //       Accept: 'application/json',
// //       'Content-Type': 'multipart/form-data',
// //     },
// //   };

// //   return fetch(apiUrl, options);
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     alignItems: 'center',
// //     flex: 1,
// //     justifyContent: 'center',
// //   },
// //   exampleText: {
// //     fontSize: 20,
// //     marginBottom: 20,
// //     marginHorizontal: 15,
// //     textAlign: 'center',
// //   },
// //   maybeRenderUploading: {
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0,0,0,0.4)',
// //     justifyContent: 'center',
// //   },
// //   maybeRenderContainer: {
// //     borderRadius: 3,
// //     elevation: 2,
// //     marginTop: 30,
// //     shadowColor: 'rgba(0,0,0,1)',
// //     shadowOpacity: 0.2,
// //     shadowOffset: {
// //       height: 4,
// //       width: 4,
// //     },
// //     shadowRadius: 5,
// //     width: 250,
// //   },
// //   maybeRenderImageContainer: {
// //     borderTopLeftRadius: 3,
// //     borderTopRightRadius: 3,
// //     overflow: 'hidden',
// //   },
// //   maybeRenderImage: {
// //     height: 250,
// //     width: 250,
// //   },
// //   maybeRenderImageText: {
// //     paddingHorizontal: 10,
// //     paddingVertical: 10,
// //   }
// // });


// //////////////////////////////////////////////////////////////////////////////////


import * as React from 'react';
import { Button, Image, View, Platform, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {useState,useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

export default function AddImage() {

    const user = useSelector(state=>state.user.user)

    const [image,setImage] = useState(null)
    const [postText,setPostText] = useState(null)

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
        try {
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
            console.log(E);
        }
    };

    const _uploadToDB = async () => {
            // Upload the image using the fetch and FormData APIs
            // Assume "photo" is the name of the form field the server expects
            let formData = new FormData();
            // let formData = {}
            console.log(image.uri)
            const img = JSON.stringify({ uri: image.uri, name: image.filename, type: image.type, text: postText })
            // const blob = new Blob([JSON.stringify(img,null,2)],{type:'application/json'})
            // console.log(blob)
            // formData.append('photo',img)
            // formData.append('text',postText)
            // // formData.photo = img
            // console.log(formData)
            // console.log(formData.getAll('photo'))
            for (var p of formData) {
                console.log(p);
            }

            return await fetch(`http://localhost:3333/upload/${user.username}`, {
                method: 'POST',
                body: img,
                headers: {
                    'Content-Type': 'application/json'//send a json so it's a string that can be converted from base64 to binary
                }
            });

            // axios.post('http://localhost:3333/upload', formData)
            // .then(res => {
            //     console.log(res);
            //     // getFile({ name: res.data.name,
            //     //             path: 'http://localhost:3333/uploads' + res.data.path
            //     //         })
            // }).catch(err => console.log(err))}
        }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={_pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
            <TextInput onChangeText={handleChange} />
            {image && <Button title="Upload" onPress={_uploadToDB}/>}
        </View>
    )
}

///////////////////////////////////////////////////////////////////////////

// import React,{Component} from 'react';
// import {
//     Text,
//     View,
//     Dimensions,
//     ActivityIndicator,
//     Platform,
//     Alert,
//     Linking,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
// } from 'react-native';
// import { ImagePicker, Permissions } from 'expo';
// import uid from 'uuid/v4';
// export default class UploadImage extends Component{
//     constructor(props){
//         super(props)
//         this.askPermission = this.askPermission.bind(this);
//         this.showAlert = this.showAlert.bind(this);
//         this.state={
//           endpoint:this.props.endpoint?this.props.endpoint:null,
//           payloadKey:this.props.payloadKey? this.props.payloadKey:null,
//           token:this.props.token?this.props.token:null,
//           callbackUrl:this.props.callbackUrl?this.props.callbackUrl:null,
//           loading:false
//         }
//         let defaultProps = {
//             onSuccess: undefined,
//             onFailure: undefined,
//             onStartUpload: undefined,
//             alertTitle: 'Please Allow Access',
//             alertMessage: [
//               'This applicaton needs access to your photo library to upload images.',
//               '\n\n',
//               'Please go to Settings of your device and grant permissions to Photos.',
//             ].join(''),
//             alertNo: 'Not Now',
//             alertYes: 'Settings',
//         };
//     }
//   async askPermission() {
//         // only if user allows permission to camera roll
//         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//         const { onStartUpload } = this.props;
//         // On Android users are prompted every time,
//         // so no need to show additional Alert
//         if (status !== 'granted') {
//           if (Platform.OS === 'ios') this.showAlert();
//           return;
//         }
//     }
//   showAlert() {
//         const { alertMessage, alertTitle, alertYes, alertNo } = this.props;
//         Alert.alert(
//             'Please Allow Access',
//             [
//                 'This applicaton needs access to your photo library to upload images.',
//                 '\n\n',
//                 'Please go to Settings of your device and grant permissions to Photos.',
//             ].join(''),
//             [
//                 { text: 'Not Now', style: 'cancel' },
//                 { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
//             ],
//         );
//     }
//   uploadResult = async () =>  {
//         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//         const { onStartUpload } = this.props;
//         console.log(status,'status');
//         if (status !== 'granted') {
//             if (Platform.OS === 'ios') this.showAlert();
//             return;
//         }
//         Expo.ImagePicker.launchImageLibraryAsync({
//             mediaTypes:'Images'
//         }).then((result)=>{
//             console.log(result,'result');
//             const file = result.uri;
//             if(!result.cancelled){
//                 this.setState({
//                     loading:true
//                 })
//                 uploadResponse =  this.uploadImageAsync(result.uri).then((reponse)=>{
//                     console.log(reponse,'reponse');
//                     this.setState({
//                         loading:false,
//                         uploaded_photo:file
//                     })
//                 });
// }
//         })
//     }
//   async uploadImageAsync(uri) {
//         const uriParts = uri.split('.');
//         const fileType = uriParts[uriParts.length - 1];
//         const { headers } = this.props;
//         const endpoint = this.state.endpoint; // Define Endpoint Here
//         const payloadKey = this.state.poayloadKey; // Define PayloadKey here Ex. 'file'
//         const method = 'POST';
//         const formData = new FormData();
//         formData.append(payloadKey, {
//           uri,
//           name: uid(),
//           type: `image/${fileType}`,
//         });
//         const options = {
//           method,
//           body: formData,
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'multipart/form-data',
//             'Authorization': this.state.token, // If restricted provide appropriate token here otherwise ignore or remove this line
//           },
//         };
//         return fetch(endpoint, options);
//   }
//   render(){
//     if(this.state.loading){
//             return(
//                 <View style={[style.container]}>
//                     <ActivityIndicator size="large" color="#FF8241" />
//                 </View>
//             )
//         }
//         return(
//             <View style={style.imgwrapper}>
//                 {this.props.callbackUrl != null ? <Image source={{uri: this.state.uploaded_photo ? this.state.uploaded_photo : this.props.callbackUrl}} style={{width: 80, height: 80,borderRadius: 40}}/>  : <Image source={{uri:'https://www.royaleboost.com/template/default-profile-img.png'}} style={{width: 80, height: 80}}/> }
//                 <TouchableOpacity
//                     style={style.circleWrapper}
//                     onPress={()=>{
//                         this.uploadResult();
//                     }}
//                 >
//                 <View />
//                 </TouchableOpacity>
//             </View>
//         )
//     }
// }
// const style = StyleSheet.create({
//     imgwrapper:{
//         justifyContent: 'center',
//         alignItems: 'center',
//         position:'relative',
//         marginBottom: 80,
//     },
//     circleWrapper:{
//         backgroundColor:'#ECECEC',
//         height:22,
//         width:22,
//         borderWidth:3,
//         borderColor: '#ffffff',
//         borderRadius:11,
//         marginLeft:70,
//         marginTop: -80,
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// })