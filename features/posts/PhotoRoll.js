import React, {useState} from 'react'
import {
    View, CameraRoll, ScrollView, Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function PhotoRoll() {

    const [photos,setPhotos] = useState([])

    const _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
        .then(r => {
            setPhotos({ photos: r.edges });
            console.log(photos)
        })
        .catch((err) => {
            //Error Loading Images
        });
    };

    let photosArray = []

    if(photos.length) {
        photosArray = photos
        console.log(photosArray)
    }

    return (
        <View>
            <Text>Upload an Image</Text>
            <TouchableOpacity title="Load Images" onPress={_handleButtonPress}><Text>Load Images</Text></TouchableOpacity>
            <ScrollView>
            {photosArray.map((p, i) => {
            return (
                <Image
                key={i}
                style={{
                    width: 300,
                    height: 100,
                }}
                source={{ uri: p.node.image.uri }}
                />
            );
            })}
            </ScrollView>
        </View>
    );
 

}

export default PhotoRoll


// import { CameraRoll, TouchableOpacity, View } from 'react-native';



// state = { photos: null, selectedPhoto: null };
// componentDidMount() {
//   const { navigation } = this.props;
//    navigation.setParams({ upload: this.upload });
//    this.getPhotosAsync({ first: 100 });
// }
// async getPhotosAsync(params) {
//   return new Promise((res, rej) =>
//     CameraRoll.getPhotos(params)
//       .then(data => {
//         const assets = data.edges;
//         const photos = assets.map(asset => asset.node.image);
//            this.setState({ photos });
//            res({ photos });
//       })
//       .catch(rej)
//   );
// }