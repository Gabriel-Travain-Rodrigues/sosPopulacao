import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  ImageSourcePropType,
} from "react-native";

type ButtonInitialProps = {
  label: string;
  iconSource: ImageSourcePropType;
  onPress: () => void;
};

export const ButtonInitial = ({
  label,
  iconSource,
  onPress,
}: ButtonInitialProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    width: 150, // largura uniforme para alinhar os botões
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 60, // ícone maior
    height: 60,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});
