import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../context/userContext";

const COLORS = {
  background: "#F9F9F9",
  surface: "#FFFFFF",
  textPrimary: "#1C1C1E",
  textSecondary: "#8E8E93",
  alert: "#FF3B30",
  divider: "#E5E5EA",
  shadow: "rgba(0, 0, 0, 0.08)",
};

type RootStackParamList = {
  profile: undefined;
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
        <Ionicons name="menu" size={30} color={COLORS.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="home-outline"size={34} color={COLORS.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>CONTATO DE EMERGÊNCIA</Text>
      <Text style={styles.subtitle}>
        Este contato será usado no botão "ALERTA IMEDIATO".
      </Text>

      <TextInput
        style={styles.input}
        placeholder={contatoEmergencia || "(00) 90000-0000"}
        placeholderTextColor={COLORS.textSecondary}
        value={contatoEmergencia}
        onChangeText={setContatoEmergencia}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={Cadastro}>
        <Text style={styles.buttonText}>SALVAR E VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  homeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  input: {
    width: "90%",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 30,
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.divider,

    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  button: {
    width: "70%",
    height: 55,
    backgroundColor: COLORS.alert,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: COLORS.alert,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.surface,
    letterSpacing: 1,
  },
});
