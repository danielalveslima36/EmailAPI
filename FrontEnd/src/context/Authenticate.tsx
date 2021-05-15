//import liraries
import React, { Component, createContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, InteractionManager } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
//Interface User
interface Student {
    id: number;
    name: string;
    email: string;
    password: string
}
//Interface ResponseData
interface ResponseData {
    student: Student;
    token: string
}
interface ContextAuth {
    login(email: string, password: string): Promise<void>;
    logout(): void;
    student: Student | null;
    signed: boolean;
}
const AuthContext = createContext<ContextAuth>({} as ContextAuth)
// create a component
const AuthenticateContext: React.FC = ({ children }) => {
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        async function loadStorage() {
            const studentStorage = await AsyncStorage.getItem('Auth:User');
            const tokenStorage = await AsyncStorage.getItem('Auth:Token');
            if (studentStorage && tokenStorage) {
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
                setStudent(JSON.parse(studentStorage))
            }
        }
        loadStorage();
    })

    //Login function
    async function login(email: string, password: string) {
        const userAuth = {
            email, password
        }
        try {
            const response = await api.post('auth', userAuth);
            const { student, token } = response.data as ResponseData;
            setStudent(student)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await AsyncStorage.setItem('Auth:User', JSON.stringify(student));
            await AsyncStorage.setItem('Auth:Token', token)
        } catch (error) {
            throw new Error(error);
        }



    }
    //Logout function
    function logout() {
        AsyncStorage.clear().then(() => {
            setStudent(null)
        })
    }

    return (
        <AuthContext.Provider value={{ login, logout, student, signed: !!student }}>
            {children}
        </AuthContext.Provider>
    );
};
//make this component available to the app
export default AuthenticateContext;

export function useAuth() {
    const context = useContext(AuthContext);
    return context
}
