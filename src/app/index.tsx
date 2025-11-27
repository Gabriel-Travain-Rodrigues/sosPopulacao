import { View, Image, StyleSheet, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { ButtonInitial } from "../Components/ButtonInitial";
import * as Linking from 'expo-linking';
import * as Location from "expo-location";
import { useUser } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation, NavigationProp, DrawerActions } from "@react-navigation/native";

type RootStackParamList = {
  profile: undefined;
  // Add other routes here if needed
};



export default function Index() {
  const [contatoEmergencia, setContatoEmergencia] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

 useEffect(() => {
    async function carregarContato() {
      const value = await AsyncStorage.getItem("contatoEmergencia");
      if (value) setContatoEmergencia(value);
    }

    carregarContato();
  }, []);



  const WHATSAPP_NUMBER = contatoEmergencia.replace(/\D/g, '') // Remove non-digit characters

  async function handleAlertPress() {
    try {
      // 1️⃣ Pedir permissão para acessar a localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Não foi possível acessar a localização.");
        return;
      }
      if(contatoEmergencia.length === 0){
        Alert.alert("Erro", "Nenhum contato de emergência cadastrado!");
        return;
      }

      // 2️⃣ Obter coordenadas atuais
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // 3️⃣ Criar mensagem
      const message = `⚠️ ALERTA! Preciso de ajuda. Minha localização é:\nhttps://www.google.com/maps?q=${latitude},${longitude}`;

      // 4️⃣ Abrir o WhatsApp com a mensagem
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      await Linking.openURL(url);

    } catch (error) {
      Alert.alert("Erro", "Ocorreu um problema ao enviar o alerta.");
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("profile")}
      >
        <Ionicons name="person-circle-outline" size={38} color="#fff" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.image}
        />
        
      </View>
      

      <View style={styles.whiteBox}>
      
        <Text style={styles.title}>SELECIONE O SERVIÇO QUE DESEJA UTILIZAR</Text>

        {/* Botão principal */}
        <View style={styles.mainButtonContainer}>
          <ButtonInitial
            label="Polícia"
            iconSource={require("../../assets/images/Policia.png")}
            onPress={() => {
              Linking.openURL('tel:190')
                .then(() => alert("Ligando para a Polícia..."))
                .catch((err) => console.error("Failed to open URL:", err));
            }}
          />
        </View>

        <View style={styles.row}>
          <ButtonInitial
            label="Bombeiros"
            iconSource={require("../../assets/images/Bombeiros.png")}
            onPress={() =>{ 
              Linking.openURL(`tel:190`)
                .then(() => alert("Ligando para os Bombeiros..."))
                .catch((err) => console.error("Failed to open URL:", err));
            }}
          />
          <ButtonInitial
            label="SAMU"
            iconSource={require("../../assets/images/Samu.png")}
            onPress={() => { 
              Linking.openURL(`tel:192`)
                .then(() => alert("Ligando para o SAMU..."))
                .catch((err) => console.error("Failed to open URL:", err));
            }}
          />
        </View>

        <View style={styles.row}>
          <ButtonInitial
            label="Polícia Ambiental"
            iconSource={require("../../assets/images/PoliciaAmbiental.png")}
            onPress={() => alert("Botão Polícia Ambiental pressionado!")}
          />
         <ButtonInitial
            label="Polícia"
            iconSource={require("../../assets/images/Policia.png")}
            onPress={() => alert("Botão Polícia pressionado!")}
          />
        </View>
      </View>

      {/* Botão Alerta */}
      <TouchableOpacity style={styles.alertButton} onPress={handleAlertPress}>
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

  menuButton: {
    position: "absolute",
    top: 50,
    left: 25,
    zIndex: 10,
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 12,

  },
  inputBlack: {
    backgroundColor: "#000",
    color: "#fff",
  },
  inputGray: {
    backgroundColor: "#E6E6E6",
    color: "#000",
  },

  profileButton: {
    position: "absolute",
    top: 45,
    right: 25,
    zIndex: 10,
  },

  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginBottom: 10,
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
    bottom: 80,
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
