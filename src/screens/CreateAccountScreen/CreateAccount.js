import React from 'react'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../CreateAccountScreen/CreateAccountScreen.style";
import { Text, View, Image, StatusBar } from "react-native";
import { render } from 'react-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect} from 'react';


const CreateAccountScreen = (props) => {

    const phoneRegEx = new RegExp('/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-/\s\.]{0,1}[0-9]{4}$/');
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
          const usersFromServer = await fetchUsers()
          setUsers(usersFromServer)
        }
        getUsers()
      }, [])

      // Fetch Users
      const fetchUsers = async () => {
          const res = await fetch('https://application-mock-server.localtunnel.me/users')
          const data = await res.json()
          return data
      }

      // Fetch User
      const fetchUser = async (id) => {
        const res = await fetch(`https://application-mock-server.localtunnel.me/users/${id}`)
        const data = await res.json()
        return data
    }
    //Add User
    const addUser = async (user) => {
        const res = await fetch('https://application-mock-server.localtunnel.me/users',{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)

        })
        const data = await res.json()
        setUsers([...users, data])
    }
    //Delete User
    const deleteUser = async (id) => {
        await fetch(`https://application-mock-server.localtunnel.me/users/${id}`, {
            method: 'DELETE'
        })
        //setUsers(users.filter(user) => user.id != id)
    }
    return (
        <View style={styles.Page}>
            <View style={styles.arrow}>
                
                <TouchableOpacity
                    style={styles.arrowButtonContainer} onPress={()=>props.navigation.navigate("HomeScreen")}>
                    <FontAwesome name='arrow-left' color='#009688' size={45}>
                    </FontAwesome>
                </TouchableOpacity>
                
            </View>
        <View style={styles.container}>
                
            
            <View style={styles.logo}>
                <Image source={require('../../../assets/appImages/InventorMELogo.png')} />
            </View>
            <View style={styles.child}>
                <Text style={{color: '#009688'}}>Email:</Text>
                <TextInput 
                    style={styles.TextInput}
                    placeholder='Email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </View>

            <View style={styles.child}>
                <Text style={{color: '#009688'}} >First Name:</Text>
                <TextInput
                    label="First Name:"
                    style={styles.TextInput}
                    placeholder='First Name'
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    
                />
            </View>

            <View style={styles.child}>
                <Text style={{color: '#009688', }}>Last Name:</Text>
                <TextInput 
                    label="Last Name:"
                    style={styles.TextInput}
                    placeholder='Last Name'
                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                />
            </View>

            <View style={styles.child}>
                <Text style={{color: '#009688'}}>Phone Number:</Text>
                <TextInput 
                    label="Phone Number::"
                    style={styles.TextInput}
                    placeholder='Phone Number'
                    validations={{matchRegexp:phoneRegEx}}
                    value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)}
                />
            </View>

            <View style={styles.child}>
                <Text style={{color: '#009688'}}>Password:</Text>
                <TextInput
                    label="Password:"
                    secureTextEntry
                    style={styles.TextInput}
                    placeholder='Password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    
                />
            </View>
            <View style={styles.logo}>
                <TouchableOpacity
                    style={styles.appButtonContainer} onPress={()=>{{addUser};props.navigation.navigate("MainPage");}}>
                    <Text style={styles.appButtonText}>Create Account</Text>
                </TouchableOpacity>
            </View> 

        </View>
        </View> 
    )
    
}

export default CreateAccountScreen;
