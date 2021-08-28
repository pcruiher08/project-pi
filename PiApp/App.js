import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native"

import MainNavigator from "./navigation/MainNavigator";
import Auth from './context/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <Auth>
      <MainNavigator />
      </Auth>
    </NavigationContainer>
  );
}
