import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import MapScreen from "../screens/MapScreen";

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="map"
        options={{ headerShown: false }}
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
