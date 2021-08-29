import React from "react";
import { useState, useContext } from "react";
import { View, StyleSheet, TextInput, Alert, Dimensions } from "react-native";
import { Input, Text, Block, Button, theme } from "galio-framework";

import colors from "../constants/colors";
import LoginComponent from "../components/LoginComponent";

const SettingsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.centerContainer}>
        <Text h1 style={styles.title}>
          Login
        </Text>
        <LoginComponent navigation={props.navigation} />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: colors.dark,
  },
  centerContainer: {
    width: "75%",
    height: "50%",
    alignItems: "center",
  },

  title: {
    color: colors.light,
    margin: 30,
  },
});
