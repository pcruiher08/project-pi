import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainNavigator from "./navigation/MainNavigator";
import Auth from './context/AuthContext';

export default function App() {

  useEffect(() => {
    (async ()=> {
      await Location.requestForegroundPermissionsAsync();
      await Location.requestBackgroundPermissionsAsync();
    })();
  });

  return (
    <NavigationContainer>
      <Auth>
      <MainNavigator />
      </Auth>
    </NavigationContainer>
  );
}
