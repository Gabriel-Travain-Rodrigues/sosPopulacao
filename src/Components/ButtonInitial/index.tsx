import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View, ImageSourcePropType } from "react-native";

type ButtonInitialProps = {
  label: string;
  iconSource: ImageSourcePropType;
  onPress: () => void;
};

export const ButtonInitial = ({ label, iconSource, onPress }: ButtonInitialProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.text}>{label}</Text>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: "flex-start",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

