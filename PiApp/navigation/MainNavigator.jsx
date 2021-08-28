import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import LoginComponent from "../components/LoginComponent";


const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" options={{ headerShown: false }} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;