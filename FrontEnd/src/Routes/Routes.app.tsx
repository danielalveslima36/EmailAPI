//import liraries
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Register from '../pages/Register'
import RoutesMain from './RoutesMain';
import ListSubjects from '../pages/ListSubjects';
import RegisterSubject from '../pages/RegisterSubject';

const { Navigator, Screen } = createStackNavigator();
// create a component
const RoutesApp = () => {
    return (
        <Navigator>
            <Screen name="ListSubjects" component={ListSubjects}/>
            <Screen name="RegisterSubject" component={RegisterSubject}/>
        </Navigator>
    );
};

//make this component available to the app
export default RoutesApp;
