import React from "react";
import { useState, useContext } from "react";
import { View, StyleSheet, TextInput, Alert, Dimensions, Image } from "react-native";
import { Input, Text, Block, Button, theme } from "galio-framework";

import colors from "../constants/colors";
import LoginComponent from "../components/LoginComponent";

const LoginScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.centerContainer}>
        <Image 
          style={styles.logo}
          source={require('../assets/logowhite.png')}
        />
        <LoginComponent navigation={props.navigation} />
      </View>
    </View>
  );
};

export default LoginScreen;

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
  logo:{
    height:230,
    width:230,
  }
});
