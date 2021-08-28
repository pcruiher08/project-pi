import React from "react";
import {View, StyleSheet} from "react-native";

import SampleComponent from "../components/SampleComponent";

const SampleScreen = (props) => {
  return (
    <View styles={styles.screen}>
      <SampleComponent />
    </View>
  );
};

export default SampleScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});