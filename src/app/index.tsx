import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ButtonInitial } from "../Components/ButtonInitial";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Logo dentro do círculo branco */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.image}
        />
      </View>

      {/* Bloco branco com os botões */}
      <View style={styles.whiteBox}>
        <Text style={styles.title}>SELECIONE O SERVIÇO QUE DESEJA UTILIZAR</Text>

        {/* Botão principal */}
        <View style={styles.mainButtonContainer}>
          <ButtonInitial
            label="Polícia"
            iconSource={require("../../assets/images/Policia.png")}
            onPress={() => alert("Botão Polícia pressionado!")}
          />
        </View>

        {/* Linhas de botões */}
        <View style={styles.row}>
          <ButtonInitial
            label="Bombeiros"
            iconSource={require("../../assets/images/Bombeiros.png")}
            onPress={() => alert("Botão Bombeiros pressionado!")}
          />
          <ButtonInitial
            label="SAMU"
            iconSource={require("../../assets/images/Samu.png")}
            onPress={() => alert("Botão Samu pressionado!")}
          />
        </View>

        <View style={styles.row}>
          <ButtonInitial
            label="Polícia Ambiental"
            iconSource={require("../../assets/images/PoliciaAmbiental.png")}
            onPress={() => alert("Botão Polícia Ambiental pressionado!")}
          />
          <ButtonInitial
            label="Comunidade"
            iconSource={require("../../assets/images/Comunidade.png")}
            onPress={() => alert("Botão Comunidade pressionado!")}
          />
        </View>
      </View>

      {/* Botão Alerta */}
      <TouchableOpacity style={styles.alertButton} onPress={() => alert("Alerta pressionado!")}>
        <Text style={styles.alertButtonText}>ALERTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  whiteBox: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 25,
    textAlign: "center",
  },

  mainButtonContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },

  alertButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 60,
    position: "absolute",
    bottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },

  alertButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 1,
  },
});