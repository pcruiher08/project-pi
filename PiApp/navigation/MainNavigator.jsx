import React from "react";
import { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import MapScreen from "../screens/MapScreen";
import { AuthContext } from "../context/AuthContext";

const MainNavigator = () => {
  const Stack = createStackNavigator();
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!isSignedIn ? (
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      ) :
      (
        <Stack.Screen
          name="map"
          options={{ headerShown: false }}
          component={MapScreen}
        />
      )
      }
    </Stack.Navigator>
  );
};

export default MainNavigator;
