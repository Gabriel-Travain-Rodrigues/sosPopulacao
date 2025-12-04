import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  
  ImageSourcePropType,
  Platform,
} from "react-native";

type ButtonInitialProps = {
  label: string;
  iconSource: ImageSourcePropType;
  onPress: () => void;
  shadowColor: string;
};

export const ButtonInitial = ({
  label,
  iconSource,
  onPress,
  shadowColor,
}: ButtonInitialProps) => {

  const dynamicShadowStyle = Platform.select({
    ios: {
      shadowColor: shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.7, 
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
       
      borderColor: shadowColor, 
      boxShadow:`5px 4px 10px ${shadowColor}33`,
      
    },
  });

  return (
    <TouchableOpacity style={[styles.button, dynamicShadowStyle]} onPress={onPress}>
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
    width: 110, // ícone maior
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
