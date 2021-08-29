import React from "react";
import { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Input, Text, Block, Button, theme } from "galio-framework";
import { Icon } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../constants/colors";
import LoginComponent from "../components/LoginComponent";
import { AuthContext } from "../context/AuthContext";

const SettingsScreen = (props) => {
  const [popups, setPopups] = useState(true);
  const [voice, setVoice] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [rate, setRate] = useState(30);
  const { authLogout } = useContext(AuthContext);

  const zooms = ["x0.5", "x1", "x2"];

  const rates = ["1 seg", "10 seg", "30 seg", "60 seg"]; //no tengo idea

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => props.navigation.navigate("map")}>
        <Icon
          style={styles.backBtn}
          name="chevron-left"
          type="evilicon"
          color={colors.light}
          size={60}
        />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <Text h3 style={styles.title}>
          Settings
        </Text>
        <View style={{ marginTop: 20, marginBottom: 15, flexDirection: "row" }}>
          <Icon
            style={styles.sectionIcon}
            name="notifications"
            type="material"
            color={colors.white}
            size={30}
          />
          <Text style={styles.sectionText}>Notifications</Text>
        </View>
        <View
          style={{
            borderBottomColor: colors.neutral,
            borderBottomWidth: 1,
            alignSelf: "stretch",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
            marginBottom: 10,
          }}
        >
          <Text style={styles.label}> Pop-up notifications</Text>
          <Switch
            style={styles.sectionIcon}
            value={popups}
            onValueChange={() => setPopups(!popups)}
            trackColor={{ false: colors.neutral, true: colors.neutral }}
            thumbColor={popups ? colors.primary : colors.neutral}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
            marginBottom: 10,
          }}
        >
          <Text style={styles.label}> Voice notifications</Text>
          <Switch
            style={styles.sectionIcon}
            value={voice}
            onValueChange={() => setVoice(!voice)}
            trackColor={{ false: colors.neutral, true: colors.neutral }}
            thumbColor={voice ? colors.primary : colors.neutral}
          />
        </View>

        <View style={{ marginTop: 20, marginBottom: 15, flexDirection: "row" }}>
          <Icon
            style={styles.sectionIcon}
            name="map"
            type="material"
            color={colors.white}
            size={30}
          />
          <Text style={styles.sectionText}>Map Display</Text>
        </View>
        <View
          style={{
            borderBottomColor: colors.neutral,
            borderBottomWidth: 1,
            alignSelf: "stretch",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
            marginBottom: 10,
          }}
        >
          <Text style={styles.label}> Zoom </Text>

          <SelectDropdown
            defaultValue="x1"
            data={zooms}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
            marginBottom: 10,
          }}
        >
          <Text style={styles.label}> Update rate </Text>
          <SelectDropdown
            defaultValue="30 seg"
            data={rates}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", marginTop: 30 }} o>
        <TouchableOpacity
          style={{ marginTop: 20, marginBottom: 15, flexDirection: "row" }}
          onPress={() => {
            authLogout();
          }}
        >
          <Icon
            style={styles.sectionIcon}
            name="logout"
            type="material"
            color={colors.white}
            size={25}
          />
          <Text style={styles.logout}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    //alignItems: "center",
    //justifyContent: "center",
    flex: 1,
    backgroundColor: colors.dark,
  },
  centerContainer: {
    marginLeft: 15,
    marginRight: 15,
    alignItems: "flex-start",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  backBtn: {
    marginTop: 50,
    alignItems: "flex-start",
  },

  sectionIcon: {
    marginRight: 10,
  },
  sectionText: {
    color: colors.white,
    fontSize: 22,
    textAlign: "center",
  },
  label: {
    color: colors.light,
    fontSize: 18,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  switch: {
    //marginRight: 10,
    justifyContent: "flex-end",
  },
  logout: {
    color: colors.light,
    fontSize: 18,
    textAlign: "center",
  },
  logoutContainer: {
    flexDirection: "row",
  },
});
