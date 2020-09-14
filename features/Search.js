import React, { useEffect, useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { set } from "react-native-reanimated"

const Search = () => {

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
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <View>
            <TextInput placeholder="Search" onChangeText={text=>onChange(text)} />
            {searchResults ? searchResults.map(user=><Text>{user.username}</Text>) : null}
        </View>
    )
}

export default Search