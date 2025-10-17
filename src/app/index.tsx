import { View, Image, StyleSheet } from "react-native";
import { ButtonInitial } from "../Components/ButtonInitial";


export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.image}
      />
         <ButtonInitial
        label="BOMBEIROS"
        iconSource={require("../../assets/images/LogoButton.png")}
        onPress={() => alert("Botão Bombeiros pressionado!")}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});
