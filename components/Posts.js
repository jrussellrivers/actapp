import React, {useState} from "react"
import { Stylesheet, View, Text, TextInput } from "react-native"

export default function Posts() {

    const [postText,setPostText] = useState('')

    const onChangeText = (text) => {
        setPostText(text)
    }

    console.log(postText)

    return (
        <View>
            <Text>{postText}</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                // value={value}
            />
        </View>
    )
}