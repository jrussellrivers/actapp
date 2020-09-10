import { TextInput } from "react-native";

const [username, setUsername] = useState('')

<TextInput onSubmitEditing={(evt)=>{
    setUsername(evt.target.value)
}}/>