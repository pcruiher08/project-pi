import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SampleScreen from "../screens/SampleScreen";
import MapScreen from "../screens/MapScreen";

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="map" component={MapScreen} />
      {/* <Stack.Screen name="sample" component={SampleScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainNavigator;