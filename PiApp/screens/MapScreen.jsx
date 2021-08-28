import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = (props) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onLocationChange = (event) => {
    const nativeEvent = event.nativeEvent;
    setMapRegion({
      latitude: nativeEvent.coordinate.latitude,
      longitude: nativeEvent.coordinate.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  return (
    <View styles={styles.screen}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onUserLocationChange={(event) => onLocationChange(event)}
        showsUserLocation={true}
        followsUserLocation={true}
      />
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
