import React, {useState} from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../pageSlice'
import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/AntDesign'
import { assets } from '../../images/Assets'

export default function Survey() {
    const dispatch = useDispatch()

    const registeredUser = useSelector(state => state.registeredUser.registeredUser)

    const [blmStatus, changeBLMStatus] = useState(false)
    const [climateStatus, changeClimateStatus] = useState(false)
    const [politicalStatus, changePoliticalStatus] = useState(false)
    const [noneSelected, setNoneSelected] = useState(false)

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

        if(!blmStatus && !climateStatus && !politicalStatus) {
            setNoneSelected(true)
        } else {
            setNoneSelected(false)
            dispatch(changePage('profilepic'))
        }
    }

    let content = 
            <View>
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
            <View style={styles.imageBackground}>
                <Image source={{uri:assets.fist.uri}} style={{height:100,width:100,margin:'auto'}} />
            </View>
            <View style={styles.headerContainer}>     
                <Text style={styles.header}>What Causes Matter To You?</Text>
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
    container: {
        borderRadius:10,
        padding:10,
        width:width-40,
        marginLeft:20,
        marginRight:20,
        flex:1,
        alignItems:'center'
    },
    headerContainer: {
        paddingBottom:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        marginTop:-3,
        marginBottom:10
    },
    imageBackground: {
        backgroundColor:'rgb(55,182,53)',
        borderRadius:100,
        padding:10,
        marginTop:-3,
        marginBottom:20
    },
    header: {
        color:'#555',
        fontWeight:'bold',
        fontSize:16
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
        marginTop:10
    }
})