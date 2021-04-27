import React from 'react';
import Routes from './src/Routes/RoutesMain';
import AuthProvider from './src/context/Authenticate';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>

  );
}
