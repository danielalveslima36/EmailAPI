import React, { Component } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import api from '../services/api';
import { useAuth } from '../context/Authenticate';

const RegisterSubject = () => {

    const navigation = useNavigation();
    const student_id = useAuth().student?.id;
    const [name, onChangeName] = useState("");
    const [workload, onChangeWorkload] = useState("");

    function handlerCreateSubject(name:string, workload:string){
        const data = { name, workload, student_id };
        api.post(`/subject`, data).then(response => {
            navigation.navigate('ListSubjects');
        });
    }

    return (
        <SafeAreaView style={styles.view}>
            {/* title */}
            <Text style={styles.title}>Disciplina</Text>
            {/* Input Name */}
            <TextInput style={styles.input} editable
                maxLength={100} placeholder="Nome da Disciplina"
                onChangeText={onChangeName} />
            {/* Input Workload */}
            <TextInput style={styles.input} editable
                maxLength={100} placeholder="Carga Horária"
                onChangeText={onChangeWorkload} />
            <View style={styles.buttonCreate}>
                {/*Button create*/}
                <Button title="Adicionar" onPress={()=>{handlerCreateSubject(name,workload)}} />
            </View>

        </SafeAreaView>
    )
}


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
    buttonCreate: {
        justifyContent: 'center',
        marginBottom: 20,
        width: 200
    },
    
})

export default RegisterSubject;