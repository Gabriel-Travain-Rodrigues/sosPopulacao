import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import Index from "./index";
import * as Linking from "expo-linking";
import { useUser } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import {
  useNavigation,
  NavigationProp,
  DrawerActions,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
type RootStackParamList = {
  profile: undefined;
  // Add other routes here if needed
};

export default function Profile() {
  const { contatoEmergencia, setContatoEmergencia } = useUser();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function salvarContato() {
      if (contatoEmergencia) {
        try {
          await AsyncStorage.setItem("contatoEmergencia", contatoEmergencia);
          console.log("Contato de emergência salvo:", contatoEmergencia);
        } catch (err) {
          console.error("Erro ao salvar contato:", err);
        }
      }
    }

    salvarContato();
  }, [contatoEmergencia]);

function Cadastro() {
    if (!contatoEmergencia) {
      Alert.alert("Erro", "Preencha o campo de contato de emergência!");
      return;
    }
    Alert.alert("Sucesso", "Contato de emergência salvo!");
    router.navigate("/");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>SEU CONTATO DE EMERGÊNCIA:</Text>
      <TextInput
        style={[styles.input, styles.inputGray]}
        placeholder={contatoEmergencia}
        placeholderTextColor="#000"
        value={contatoEmergencia}
        onChangeText={setContatoEmergencia}
        keyboardType="number-pad"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={Cadastro}
        >
        <Text style={styles.buttonText}>CONCLUIR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272047ff",
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 25,
    zIndex: 10,
  },
  button: {
    width: "60%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#800080",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#800080",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffffff",
    fontFamily: Platform.select({
      android: "Inter_900Black",
      ios: "Inter-Black",
    }),
    display: "flex",
    paddingBottom: 20,
  },
  inputBlack: {
    backgroundColor: "#000",
    color: "#fff",
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 0,
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  inputGray: {
    backgroundColor: "#E6E6E6",
    color: "#000",
  },
  emergencyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "20%",
    marginBottom: 20,
  },
  emergencyText: {
    fontSize: 14,
    color: "#ffffffff",
  },
  backButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 4,
  },
  backText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});
