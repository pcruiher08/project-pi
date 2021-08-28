import React from "react";
import { useState, useContext } from "react";
import { View, StyleSheet, TextInput, Alert, Dimensions } from "react-native";
import { Input, Text, Block, Button, theme } from "galio-framework";

import colors from "../constants/colors";

const LoginComponent = (props) => {
  const handleSubmit = () => {
    props.navigation.navigate("map");
  };
  return (
    <View style={styles.centerContainer}>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="Email"
          //onChangeText={(text) => setEmail(text)}
          color={theme.COLORS.INPUT}
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          type="email-address"
          bgColor={""}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          //secureTextEntry={true}
          //onChangeText={(text) => setPassword(text)}
          color={theme.COLORS.INPUT}
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          password
          viewPass
        />
      </View>
      <Button
        onPress={handleSubmit}
        color={colors.primary}
        style={styles.button}
      >
        Login
      </Button>
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  centerContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  button: {
    width: "100%",
    height: 48,
    marginTop: 35,
  },
  input: {
    width: "100%",
    height: 48,
    marginTop: 10,
  },
});
