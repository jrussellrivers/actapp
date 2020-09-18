import React, {useState,useEffect} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/AntDesign'

export default function Survey() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)

    const [blmStatus, changeBLMStatus] = useState(false)
    const [climateStatus, changeClimateStatus] = useState(false)
    const [politicalStatus, changePoliticalStatus] = useState(false)

    let usersCauses

    useEffect(() => {
        usersCauses = fetch(`http://localhost:3333/user/updateInfo/${user.id}`)
        .then(r=>r.json())
        .then(data=>data)
        
    },[])

    if()

    const handleSubmit = () => {
        let causes = [
            {name:'blm', status:blmStatus},
            {name:'climate', status:climateStatus},
            {name:'politics', status:politicalStatus}
        ]

        causes.forEach(cause =>{
            if (cause.status){
            fetch(`http://localhost:3333/register/survey/${cause.name}/${registeredUser.id}`,{method:'post'})
            .then(resp=>resp.json())
            .then(data=>console.log(data))
            }    
        })

        dispatch(changePage('profilepic'))
    }

    let content = 
            <View>
                <CheckBox
                    onClick={()=>{changeBLMStatus(!blmStatus)}}
                    isChecked={blmStatus}
                    rightText={'Black Lives Matter'}
                    checkedImage={<Icon name="like1" size={30} />}
                    unCheckedImage={<Icon name="like2" size={30} />}
                />
                <CheckBox
                    onClick={()=>{changeClimateStatus(!climateStatus)}}
                    isChecked={climateStatus}
                    rightText={'Climate Change'}
                    checkedImage={<Icon name="like1" size={30} />}
                    unCheckedImage={<Icon name="like2" size={30} />}
                />
                <CheckBox
                    onClick={()=>{changePoliticalStatus(!politicalStatus)}}
                    isChecked={politicalStatus}
                    rightText={'Political Representation'}
                    checkedImage={<Icon name="like1" size={30} />}
                    unCheckedImage={<Icon name="like2" size={30} />}
                />
            </View>
    
    return (
        <View>
            {content}
            <TouchableOpacity onPress={handleSubmit}><Text>Submit</Text></TouchableOpacity>
        </View>
    )
}