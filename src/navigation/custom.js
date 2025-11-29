import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function CustomTabButton({ children, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -35, // lift the icon above bar
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 35,
    backgroundColor: "#FF6F00", // PhonePe orange-style
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
