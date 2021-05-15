//import liraries
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import { Divider } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { sub } from 'react-native-reanimated';
import { useAuth } from '../context/Authenticate';
import api from '../services/api';
import styles from "../styles/ListSubjectsStyle";
import {useNavigation} from '@react-navigation/native';

interface Subject {
    id: number;
    name: string;
    workload: string
}

// create a component
const ListSubjects = () => {
    const { student } = useAuth();
    const navigation = useNavigation();
    const {logout} = useAuth();
    const [subjects, onChangeSubjects] = useState<Subject[]>([])
    const [modalVisible, onChangeModal] = useState(false);
    const [subject, onChangeSubject] = useState<Subject>();

    useFocusEffect(() => {
        api.get(`/subject/${student?.id}`).then(response => {
            onChangeSubjects(response.data);
        })
    });


    function handlerCreateSubject() {
        navigation.navigate('RegisterSubject')
    }

    return (
        <ScrollView style={styles.content}>
            <View style={styles.studentInfo}>
                <Text style={styles.info}>{student?.name}</Text>
                <Text style={styles.info}>{student?.email}</Text>
            </View>
            <View style={styles.buttonLogout}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={()=> logout() }
                >
                    <Text style={styles.textStyle}>Logout</Text>
                </Pressable>
            </View>
            <Divider style={styles.divider} />
            <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={()=> handlerCreateSubject() }
                >
                    <Text style={styles.textStyle}>Adicionar Disciplina</Text>
                </Pressable>
            {
                subjects.map(subject =>
                    <View key={subject.id} style={styles.itemProductContainer}>
                        <Text style={styles.itemProductName}>{subject.name}</Text>
                        <TouchableOpacity
                            style={styles.goToProductDetailButton}
                            onPress={() => { onChangeSubject(subject); onChangeModal(true) }}>
                            <Feather name="arrow-right" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    onChangeModal(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{subject?.name}</Text>
                        <Text style={styles.modalText}>{subject?.workload}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => onChangeModal(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

//make this component available to the app
export default ListSubjects;
