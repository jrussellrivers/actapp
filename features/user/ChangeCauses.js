import React, {useState,useEffect} from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import { fetchUsersCauses } from '../actions/allUsersCausesSlice'
import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/AntDesign'
import { assets } from '../../images/Assets'

export default function Survey() {
    const dispatch = useDispatch()

    const usersCauses = useSelector(state => state.usersCauses.usersCauses)

    const [blmStatus, changeBLMStatus] = useState(false)
    const [climateStatus, changeClimateStatus] = useState(false)
    const [politicalStatus, changePoliticalStatus] = useState(false)
    const [noneSelected, setNoneSelected] = useState(false)

    const user = useSelector(state => state.user.user)
    const causes = useSelector(state => state.usersCauses.usersCauses)
    const userCauses = causes.filter(cause => cause.user_id === user.id ? true : false)
    
    console.log(userCauses)

    useEffect(() => {
        userCauses.forEach(cause=>{
            if(cause.cause === 'blm'){
                changeBLMStatus(true)
            } else if (cause.cause === 'climate'){
                changeClimateStatus(true)
            } else if (cause.cause === 'politics'){
                changePoliticalStatus(true)
            }
        })
    },[])

    const handleSubmit = () => {
        let causes = [
            {name:'blm', status:blmStatus},
            {name:'climate', status:climateStatus},
            {name:'politics', status:politicalStatus}
        ]

        causes.forEach(cause =>{        
            if (cause.status){
                fetch(`http://localhost:3333/register/survey/${cause.name}/${user.id}`,{method:'post'})
                .then(resp=>resp.json())
                .then(data=>console.log(data))
                //need to update the state so it re-renders then we're gucci
                .then(d=>{
                    dispatch(fetchUsersCauses())
                })
            } else {
                fetch(`http://localhost:3333/user/delCause/${cause.name}/${user.id}`,{method:'post'})
                .then(resp=>resp.json())
                .then(data=>console.log(data))
                .then(d=>{
                    dispatch(fetchUsersCauses())
                })
            }
        })

        if(!blmStatus && !climateStatus && !politicalStatus) {
            setNoneSelected(true)
        } else {
            setNoneSelected(false)
            dispatch(changePage('feed'))
        }
    }

    let content = 
            <View style={styles.checkboxContainer}>
                <CheckBox
                    onClick={()=>{changeBLMStatus(!blmStatus)}}
                    isChecked={blmStatus}
                    rightText={'Black Lives Matter'}
                    unCheckedImage={<Icon name="checkcircleo" size={30} />}
                    checkedImage={<Icon name="checkcircle" size={30} color={'rgb(55,182,53)'} />}
                    style={styles.checkbox}
                />
                <CheckBox
                    onClick={()=>{changeClimateStatus(!climateStatus)}}
                    isChecked={climateStatus}
                    rightText={'Climate Change'}
                    unCheckedImage={<Icon name="checkcircleo" size={30} />}
                    checkedImage={<Icon name="checkcircle" size={30} color={'rgb(55,182,53)'} />}
                    style={styles.checkbox}
                />
                <CheckBox
                    onClick={()=>{changePoliticalStatus(!politicalStatus)}}
                    isChecked={politicalStatus}
                    rightText={'Political Representation'}
                    unCheckedImage={<Icon name="checkcircleo" size={30} />}
                    checkedImage={<Icon name="checkcircle" size={30} color={'rgb(55,182,53)'} />}
                    style={styles.checkbox}
                />
            </View>
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>     
                <Text style={styles.header}>Update which causes matter to you so we can customize the content you see.</Text>
            </View>
            {content}
            {noneSelected ? <Text style={styles.message}>Please choose at least one cause</Text> : null}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.green}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
    )
}

let width = Dimensions.get('window').width

const styles = StyleSheet.create({
    headerContainer: {
        borderRadius:10,
        padding:10,
        width:width-40,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        flex:1,
        alignItems:'center'
    },
    // headerContainer: {
    //     paddingBottom:20,
    //     borderBottomColor:'#ddd',
    //     borderBottomWidth:1,
    //     marginTop:-3,
    //     marginBottom:10
    // },
    imageBackground: {
        backgroundColor:'rgb(55,182,53)',
        borderRadius:100,
        padding:10,
        marginTop:-3,
        marginBottom:20
    },
    header: {
        textAlign:'center',
        marginTop:10
    },
    checkboxContainer: {
        padding:10,
        paddingLeft:30,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
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
        marginTop:10,
        textAlign:'center'
    }
})