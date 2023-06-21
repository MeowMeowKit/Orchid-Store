import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ContactScreen = () => {
  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "red",
        }}
      >
        Le Chi Cuong
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "red",
        }}
      >
        Dep Trai Voai
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
