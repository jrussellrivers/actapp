import React, { Component } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, SafeAreaView, Text, Alert,
} from 'react-native';

import FormBuilder from './FormBuilder';

export default class SignUp extends Component {
    getFormFields = () => {
        const formFields = [
            [
                {
                    name: 'firstName',
                    label: 'First Name',
                    type: 'text',
                    inputProps: {
                        autoCorrect: false,
                    },
                },
                {
                    name: 'lastName',
                    label: 'Last Name',
                    type: 'text',
                    inputProps: {
                        autoCorrect: false,
                    },
                },
            ],
            [
                {
                    name: 'email',
                    label: 'Email',
                    type: 'text',
                    inputProps: {
                        autoCorrect: false,
                        autoCapitalize: 'none',
                        keyboardType: 'email-address',
                    },
                },
            ],
            [
                {
                    name: 'streetaddress',
                    label: 'Address',
                    type: 'text',
                    inputProps: {
                        autoCorrect: false,
                        blurOnSubmit: false,
                    },
                },
                {
                  name: 'city',
                  label: 'City',
                  type: 'text',
                  inputProps: {
                      autoCorrect: false,
                      blurOnSubmit: false,
                  },
                },
                {
                  name: 'state',
                  label: 'State',
                  type: 'text',
                  inputProps: {
                      autoCorrect: false,
                      blurOnSubmit: false,
                  },
                },
                {
                  name: 'zipcode',
                  label: 'Zip Code',
                  type: 'text',
                  inputProps: {
                      autoCorrect: false,
                      blurOnSubmit: false,
                  },
                },
            ],
            [
              {
                name: 'race',
                label: 'Race/Ethnicity',
                type: 'text',
                inputProps: {
                    autoCorrect: false,
                    blurOnSubmit: false,
                },
              },
              {
                name: 'gender',
                label: 'Identified Gender',
                type: 'text',
                inputProps: {
                    autoCorrect: false,
                    blurOnSubmit: false,
                },
              },
              {
                name: 'birthdate',
                label: 'Birth Date',
                type: 'text',
                inputProps: {
                    autoCorrect: false,
                    blurOnSubmit: false,
                },
              },
              {
                name: 'username',
                label: 'Username',
                type: 'text',
                inputProps: {
                  autoCorrect: false,
                },
              },
              {
                name: 'password',
                label: 'Password',
                type: 'text',
                inputProps: {
                    secureTextEntry: true,
                },
              },
              {
                name: 'confirmPassword',
                label: 'Confirm Password',
                type: 'text',
                inputProps: {
                    secureTextEntry: true,
                },
              },
            ],
            
        ];

        return formFields;
    };

    /**
     * Grab user's input data.
     */
    handleSubmit = (thisState) => {
        const {
          firstName,lastName,email,streetaddress,city,state,zipcode,race,gender,birthdate,username,password
        } = thisState;

        console.log(thisState.firstName)

        fetch('http://localhost:3333/users/register',{method:'post',body:JSON.stringify({firstName,lastName,email,streetaddress,city,state,zipcode,race,gender,birthdate,username,password}),headers:{'Content-Type': 'application/json'}})

        console.log(this.state)
    };

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Text style={styles.screenTitle}>Sign Up</Text>
                    <FormBuilder
                        formFieldsRows={this.getFormFields()}
                        handleSubmit={this.handleSubmit}
                        submitBtnTitle="Sign Up"
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#3F4EA5',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#3F4EA5',
    },
    screenTitle: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#FFF',
    },
});


// import Form4u from "react-native-form4u";
// import fields from "./formFields.js";
// import validationRules from "./formValidationRules.js";

// const App = () => {
//   return (
//     <Form4u
//       formFields={fields}
//       handleSubmit={handleSubmit}
//       validation={validationRules}
//       submitOnDirty
//     />
//   );
// };

// export default App;



// import React, {useState} from 'react'
// import { Text, View, TextInput, TouchableOpacity, Linking } from 'react-native'

// export default function Register() {

//     const [formData,setFormData] = useState([])
//     const [entry,setEntry] = useState("")

//     const handleChange = (name,text) => {
//         setEntry({[name]:text})
//         console.log(entry)
//         let formDataPlaceholder = []
//         formDataPlaceholder.push(entry)

//         setFormData([...formData,entry])
//         console.log(formData)
//     }
    
//     const handleSubmit = () => {
//         console.log('clicked')
//         fetch('http://localhost:3333/login/register',{method:'post',body:JSON.stringify(formData),headers:{'Content-Type': 'application/json'}})
//     }

//     return (
//         <View>
//             <TextInput name="username" onChangeText={text => handleChange("username",text)} placeholder="Username" />
//             <TextInput name="password" onChangeText={text => handleChange("password",text)} secureTextEntry={true} placeholder="Password" />
//             <TextInput name="confirmPassword" onChangeText={text => handleChange("confirmPassword",text)} placeholder="Confirm Password" />
//             <TextInput name="firstName" onChangeText={text => handleChange("firstName",text)} placeholder="First Name" />
//             <TextInput name="lastName" onChangeText={text => handleChange("lastName",text)} placeholder="Last Name" />
//             <TextInput name="email" onChangeText={text => handleChange("email",text)} placeholder="Email" />
//             <TextInput name="streetAddress" onChangeText={text => handleChange("streetaddress",text)} placeholder="Address" />
//             <TextInput name="city" onChangeText={text => handleChange("city",text)} placeholder="City" />
//             <TextInput name="state" onChangeText={text => handleChange("state",text)} placeholder="State" />
//             <TextInput name="zipcode" onChangeText={text => handleChange("zipcode",text)} placeholder="Zip Code" />
//             <TextInput name="race" onChangeText={text => handleChange("race",text)} placeholder="Race/Ethnicity" />
//             <TextInput name="gender" onChangeText={text => handleChange("gender",text)} placeholder="Identified Gender" />
//             <TextInput name="birthdate" onChangeText={text => handleChange("birthdate",text)} placeholder="Birthdate" />
//             <TouchableOpacity onPress={handleSubmit}><Text>Submit</Text></TouchableOpacity>
//             <Text onPress={() => Linking.openURL('/login')}>Already Have an Account? Login Here</Text>
//         </View>
//     )
// }
