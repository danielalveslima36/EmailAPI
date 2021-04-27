//import liraries
import React, { useContext } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native'
import { useAuth } from '../context/Authenticate';

// create a component
const Login = () => {
    const navigation = useNavigation();
    const {login} = useAuth();
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    
    function handlerCreateUser(){
        navigation.navigate('Register')
    }

    function handlerListSubjects(){
        navigation.navigate('ListSubjects')
    }

    function handlerLogin(email:string, password:string){
        login(email,password)
        // handlerListSubjects()
    }
    return (
        <SafeAreaView style={styles.view}>
            {/* title */}
            <Text style={styles.title}>Login</Text>
            {/* Input Email */}
            <TextInput style={styles.input} editable
                maxLength={100} placeholder="Email"
                onChangeText={onChangeEmail} />
            {/* Input Password */}
            <TextInput style={styles.input} editable
                maxLength={100} placeholder="Password"
                onChangeText={onChangePassword} />
            <View style={styles.buttonLogin}>
                {/*Button login*/}
                <Button title="Login" onPress={()=>{handlerLogin(email,password)}} />
            </View>
            <View style={styles.buttonLogin}>
                {/*Button cadastrar*/}
                <Button title="Register" onPress={handlerCreateUser} />
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginBottom: 20
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 140
    },
    input: {
        height: 50,
        width: 300,
        fontSize: 20,
        marginBottom: 30,
    },
    buttonLogin: {
        justifyContent: 'center',
        marginBottom: 20,
        width: 200
    },
    
})

//make this component available to the app
export default Login;
