//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RoutesAuth from './Routes.auth';
import {useAuth} from '../context/Authenticate';
import RoutesApp from './Routes.app'; 

// create a component
const RoutesMain = () => {
    const {signed} = useAuth();
    console.log(signed)
    return signed ? <RoutesApp/> : <RoutesAuth/>
};


//make this component available to the app
export default RoutesMain;
