//import liraries
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Register from '../pages/Register'

const { Navigator, Screen } = createStackNavigator();
// create a component
const RoutesAuth = () => {
    return (
        <Navigator>
            <Screen options={{ headerShown: false }} name='Login' component={Login} />
            <Screen name="Register" component={Register} />
        </Navigator>
    );
};

//make this component available to the app
export default RoutesAuth;
