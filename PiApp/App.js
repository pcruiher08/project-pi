import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import * as Location from "expo-location";

import MainNavigator from "./navigation/MainNavigator";

export default function App() {

  useEffect(() => {
    (async ()=> {
      await Location.requestForegroundPermissionsAsync();
      await Location.requestBackgroundPermissionsAsync();
    })();
  });

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
