import React, {useState} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/AntDesign'

export default function Survey() {
    const dispatch = useDispatch()

    const registeredUser = useSelector(state => state.registeredUser.registeredUser)
    console.log(registeredUser)

    const [blmStatus, changeBLMStatus] = useState(false)
    const [uspsStatus, changeUSPSStatus] = useState(false)
    const [climateStatus, changeClimateStatus] = useState(false)
    const [politicalStatus, changePoliticalStatus] = useState(false)
    
    // const formData = {}
    // // const [entry,setEntry] = useState("")

    // const handleChange = (name,text) => {
    //     formData[name] = text
    // }
    
    const handleSubmit = () => {
        let causes = [
            {name:'Black Lives Matter', status:blmStatus},
            {name:'USPS', status:uspsStatus},
            {name:'Climate Change', status:climateStatus},
            {name:'Political Representation', status:politicalStatus}
        ]

        causes.forEach(cause =>{
            console.log(cause.status)
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
                    onClick={()=>{changeUSPSStatus(!uspsStatus)}}
                    isChecked={uspsStatus}
                    rightText={'USPS'}
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
            {/* <TextInput name="username" onChangeText={text => handleChange("username",text)} placeholder="Username" />
            <TextInput name="password" onChangeText={text => handleChange("password",text)} secureTextEntry={true} placeholder="Password" />
            <TextInput name="confirmPassword" onChangeText={text => handleChange("confirmPassword",text)} secureTextEntry={true} placeholder="Confirm Password" />
            <TextInput name="firstName" onChangeText={text => handleChange("firstName",text)} placeholder="First Name" />
            <TextInput name="lastName" onChangeText={text => handleChange("lastName",text)} placeholder="Last Name" />
            <TextInput name="email" onChangeText={text => handleChange("email",text)} placeholder="Email" />
            <TextInput name="streetAddress" onChangeText={text => handleChange("streetAddress",text)} placeholder="Address" />
            <TextInput name="city" onChangeText={text => handleChange("city",text)} placeholder="City" />
            <TextInput name="state" onChangeText={text => handleChange("state",text)} placeholder="State" />
            <TextInput name="zipcode" onChangeText={text => handleChange("zipcode",text)} placeholder="Zip Code" />
            <TextInput name="race" onChangeText={text => handleChange("race",text)} placeholder="Race/Ethnicity" />
            <TextInput name="gender" onChangeText={text => handleChange("gender",text)} placeholder="Identified Gender" />
            <TextInput name="birthdate" onChangeText={text => handleChange("birthdate",text)} placeholder="Birthdate" />
            <TouchableOpacity onPress={handleSubmit}><Text>Submit</Text></TouchableOpacity>
            <Text onPress={() => dispatch(changePage('login'))}>Already Have an Account? Login Here</Text> */}
            {content}
            <TouchableOpacity onPress={handleSubmit}><Text>Submit</Text></TouchableOpacity>
        </View>
    )
}