import React, { useEffect, useState } from "react"
import { View, Text, TextInput, Dimensions, Image } from "react-native"
import { set } from "react-native-reanimated"
import { TouchableOpacity } from "react-native-gesture-handler";
import { changePage } from './pageSlice'
import { fetchProfileById } from './user/profileByIdSlice'
import { useSelector,useDispatch } from 'react-redux'

let width = Dimensions.get('window').width; //full width

const Search = () => {
    const dispatch = useDispatch()

    const page = useSelector(state => state.page.pageName)

    const [users,setUsers] = useState()
    const [searchTerm,setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([]);

    const onChange = text => {
        console.log(text)
        setSearchTerm(text)
    }

    useEffect(() => {
        fetch(`http://localhost:3333/searchUsers/`)
        .then(r=>r.json())
        .then(data=>setUsers(data))
    },[])

    useEffect(() => {
        let results
        if(searchTerm){
            results = users.filter(person =>
                person.username.toLowerCase().includes(searchTerm)
            );
        }
        console.log(results)
        setSearchResults(results);
    }, [searchTerm]);

    // const goToProfile = () => {
        
    // }

    return (
        <View style={{marginTop:15}}>
            <TextInput placeholder=" 🔍 Search" onChangeText={text=>onChange(text)} style={{height:36,width:width-50}} />
            {searchResults ? searchResults.map((user,idx)=><TouchableOpacity key={idx} onPress={() => {dispatch(fetchProfileById(user.id));dispatch(changePage('profile'));}} style={{flex:1, flexDirection:'row',alignItems:'center'}}><Image source={{uri: user.profilepic}} style={{height: 40, width: 40,borderRadius:50,marginRight:7}}/><Text>{user.username}</Text></TouchableOpacity>) : null}
        </View>
    )
}

export default Search