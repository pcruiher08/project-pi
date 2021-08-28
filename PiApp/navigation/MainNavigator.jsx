import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screens/MapScreen";
import LoginComponent from "../components/LoginComponent";

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        component={LoginComponent}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
