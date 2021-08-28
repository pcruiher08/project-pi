import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { AnimatedRegion, Animated } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = (props) => {
  const [region, setRegion] = useState();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({ accuracy: 6 });
    setRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 5,
      longitudeDelta: 5,
    });
  };

  return (
    <View styles={styles.screen}>
      <Animated region={region} onRegionChange={this.onRegionChange} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
