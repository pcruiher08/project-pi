import React, { Component } from "react";

import { View, StyleSheet } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { Icon } from "react-native-elements";
import colors from "../constants/colors";

import { getEvents } from "../services/events";
import { TouchableOpacity } from "react-native";

import * as Notifications from "expo-notifications";
import * as Speech from "expo-speech";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();

    this.onLocationChange = this.onLocationChange.bind(this);
    this.state = {
      coordinates: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      expoPushToken: "",
      notification: false,
      circles: [],
      prevEvents: [],
    };
  }

  componentDidMount() {
    this.handleNotifications;
    this.interval = setInterval(() => {
      getEvents(
        this.state.coordinates.latitude,
        this.state.coordinates.longitude
      ).then((events) => {
        this.handleEvents(events);
      });
    }, 5000);
  }

  handleEvents(events) {
    if (events.length > 0) {
      let notiEvents = [];
      const prevEvents = this.state.prevEvents;
      events.forEach((event) => {
        // Check if event has not yet been notified
        if (!prevEvents.includes(event._id)) {
          notiEvents.push(event);
          prevEvents.push(event._id);

          // Update prevEvents with new events
          this.setState({ prevEvents: prevEvents });
        }
      });

      // Send notifications if there are new events
      if (notiEvents.length > 0) {
        this.sendNotification(notiEvents);
      }

      let newCircles = [];
      events.forEach((event) => {
        newCircles.push({
          lat: event.latitude,
          long: event.longitude,
        });
      });
      this.setState({ circles: newCircles });
    }
  }

  async sendNotification(events) {
    await this.schedulePushNotification(events);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleNotification() {
    this.registerForPushNotificationsAsync().then((token) =>
      this.setState({
        coordinates: this.state.coordinates,
        expoPushToken: token,
        notification: this.state.notification,
      })
    );

    this.notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        this.setState({
          coordinates: thi + s.state.coordinates,
          expoPushToken: this.state.expoPushToken,
          notification: notification,
        });
      });

    this.responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }

  getMessage(events) {
    let nonlinear = 0;
    let excess = 0;
    events.forEach((e) => {
      if (e.type == "NONLINEAR_DRIVING") {
        nonlinear++;
      } else {
        excess++;
      }
    });
    let message = " We've identified ";
    if (excess > 0) {
      message =
        message +
        excess +
        (excess > 1 ? "drivers" : "driver") +
        " exceeding the speed limit";
      if (nonlinear > 0) {
        message +=
          " and " +
          nonlinear +
          " unusual " +
          (nonlinear > 1 ? "drivers" : "driver") +
          ".";
      } else {
        message += ".";
      }
    } else {
      message =
        message +
        nonlinear +
        " unusual " +
        (nonlinear > 1 ? " drivers" : "driver") +
        ".";
    }
    return message;
  }

  async schedulePushNotification(events) {
    const title =
      "Nearby " + (events.length > 1 ? "risks" : "risk") + " detected";
    const body =
      "There " +
      (events.length > 1 ? "are " : "is ") +
      events.length +
      " risk " +
      (events.length > 1 ? "events" : "event") +
      " nearby." +
      this.getMessage(events);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: "XD" },
      },
      trigger: { seconds: 2 },
    });
    Speech.speak(title + "." + body);
  }

  async registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  onLocationChange(event) {
    const nativeEvent = event.nativeEvent;
    const lat = nativeEvent.coordinate.latitude;
    const long = nativeEvent.coordinate.longitude;
    this.setState({
      coordinates: {
        latitude: lat,
        longitude: long,
      },
      expoPushToken: this.state.expoPushToken,
      notification: this.state.notification,
    });
    this.map.animateToRegion(
      {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      },
      1000
    );
  }

  render() {
    return (
      <View style={styles.screen}>
        <MapView
          showsMyLocationButton={false}
          ref={(map) => (this.map = map)}
          style={styles.map}
          customMapStyle={mapStyle}
          onUserLocationChange={this.onLocationChange}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {this.state.circles.map((circle, index) => {
            return (
              <Circle
                key={index}
                center={{ latitude: circle.lat, longitude: circle.long }}
                radius={100}
                strokeColor={colors.accent}
                fillColor="rgba(182,35,4,0.5)"
              />
            );
          })}
        </MapView>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ position: "absolute", bottom: 30, right: 10 }}
          onPress={() => console.log("sobres perro")}
        >
          <Icon
            reverse
            reverseColor={colors.dark}
            name="settings"
            type="material"
            color={colors.light}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default MapScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];
