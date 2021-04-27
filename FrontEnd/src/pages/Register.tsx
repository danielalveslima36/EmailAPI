//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { useState } from 'react';
import { Alert, Button } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';

// create a component
const Register = () => {
    const navigation = useNavigation();
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [name, onChangeName] = useState("");

    async function registerStudent() {
        console.log(email,password,name)
        const student = {
            email,
            password,
            name
        }
        try {
            await api.post('user', student)
            Alert.alert("Cadastrado com sucesso")
            goToLogin()
        } catch (error) {
            throw new Error(error);
        }        

    }
    function goToLogin(){
        navigation.navigate("Login")
    }
    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>Cadastro de estudante</Text>
            <TextInput style={styles.input} editable
                maxLength={100} placeholder="Name"
                onChangeText={onChangeName} />

            <TextInput style={styles.input} editable
                maxLength={100} placeholder="Email"
                onChangeText={onChangeEmail} />

            <TextInput style={styles.input} editable
                maxLength={50} placeholder="Password"
                onChangeText={onChangePassword} />

            <View style={styles.buttonRegister}>
                {/*Button cadastrar*/}
                <Button title="Register" onPress={registerStudent} />
            </View>

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    input: {
        height: 50,
        width: 300,
        fontSize: 20,
        marginBottom: 30,
    },
    buttonRegister: {
        justifyContent: 'center',
        marginBottom: 20,
        width: 300
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize:20,

        marginBottom:10
    }
});

//make this component available to the app
export default Register;
