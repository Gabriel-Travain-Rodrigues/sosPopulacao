import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import { ButtonInitial } from "../Components/ButtonInitial";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { useUser } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  useNavigation,
  NavigationProp,
  DrawerActions,
  Link,
} from "@react-navigation/native";

type RootStackParamList = {
  profile: undefined;
};

const COLORS = {
  background: "#F9F9F9",
  surface: "#FFFFFF",
  textPrimary: "#1C1C1E",
  textSecondary: "#8E8E93",
  alert: "#FF3B30",
  divider: "#E5E5EA",
};
const SHADOW_COLORS = {
    POLICIA: '#002C5E', // Azul escuro
    BOMBEIROS: '#CC0000', // Vermelho fogo
    SAMU: '#F0810E', // Verde (Cor da Estrela da Vida)
    AMBIENTAL: '#38761D', // Verde musgo/Escuro
    DEFESA_CIVIL: '#272F71', // Laranja/Amarelo
};


export default function Index() {
  const [contatoEmergencia, setContatoEmergencia] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    }
    getCurrentLocation();
  }, []);

  useEffect(() => {
    async function carregarContato() {
      const value = await AsyncStorage.getItem("contatoEmergencia");
      if (value) setContatoEmergencia(value);
    }
    carregarContato();
  }, []);

  async function handleAlertPress() {
    try {
      // (Lógica de Alerta mantida)
      if (!contatoEmergencia || contatoEmergencia.length === 0) {
        Alert.alert("Erro", "Número de contato de emergência não definido.");
        return;
      }
      const WHATSAPP_NUMBER = contatoEmergencia.replace(/\D/g, "");
      if (WHATSAPP_NUMBER.length === 0) {
        Alert.alert("Erro", "Número de contato de emergência não definido.");
        return;
      }

      if (location === null) {
        Alert.alert("Erro", "Localização não disponível.");
        return;
      }
      const { latitude, longitude } = location.coords;

      const locationLink = `http://googleusercontent.com/maps.google.com/3{latitude},${longitude}`;
      const message = `⚠️ ALERTA! Preciso de ajuda. Minha localização é:\n${locationLink}`;

      const url = `https://wa.me/55${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`;
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um problema ao enviar o alerta.");
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      {/* Botões do Topo (usando cor principal para minimalismo) */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={30} color={COLORS.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("profile")}
      >
        <Ionicons
          name="call-outline"
          size={34}
          color={COLORS.textPrimary}
        />
      </TouchableOpacity>

      {/* Container do Logo (sem borda colorida) */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.image}
        />
      </View>

      {/* Caixa Principal de Serviços */}
      <View style={styles.whiteBox}>
        <Text style={styles.title}>SERVIÇOS DE EMERGÊNCIA</Text>
        <View style={styles.divider} />

        {/* Botões de Serviço */}
        <View style={styles.mainButtonContainer}>
          <ButtonInitial
            label="Polícia Militar (190)"
            iconSource={require("../../assets/images/images.png")}
            onPress={() => Linking.openURL("tel:190")}
            shadowColor={SHADOW_COLORS.POLICIA}
          />
        </View>

        <View style={styles.row}>
          <ButtonInitial
            label="Bombeiros (193)"
            iconSource={require("../../assets/images/Brasao.png")}
            onPress={() => Linking.openURL(`tel:193`)}
            shadowColor={SHADOW_COLORS.BOMBEIROS}
          />

          <ButtonInitial
            label="SAMU (192)"
            iconSource={require("../../assets/images/Samu192.png")}
            onPress={() => Linking.openURL(`tel:192`)}
            shadowColor={SHADOW_COLORS.SAMU}
          />
        </View>

        <View style={styles.row}>
          <ButtonInitial
            label="Polícia Ambiental"
            iconSource={require("../../assets/images/PmAmb.png")}
            onPress={() => Linking.openURL("tel:181")}
            shadowColor={SHADOW_COLORS.AMBIENTAL}
          />

          <ButtonInitial
            label="Defesa Civil (199)"
            iconSource={require("../../assets/images/DefCiv.png")}
            onPress={() => Linking.openURL("tel:199")}
            shadowColor={SHADOW_COLORS.DEFESA_CIVIL}
          />
        </View>
      </View>

      {/* Botão de Alerta de Emergência (Único Ponto de Cor) */}
      <TouchableOpacity style={styles.alertButton} onPress={handleAlertPress}>
        <Text style={styles.alertButtonText}>ALERTA IMEDIATO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },

  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },

  profileButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },

  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "transparent", 
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  image: {
    width: 110, 
    height: 110,
    resizeMode: "contain",
  },

  whiteBox: {
    backgroundColor: COLORS.surface, 
    width: "90%", 
    borderRadius: 10, 
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  title: {
    fontSize: 16,
    fontWeight: "700", 
    color: COLORS.textPrimary,
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 0.5,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.divider,
    marginBottom: 20,
  },

  mainButtonContainer: {
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },

  alertButton: {
    backgroundColor: COLORS.alert, 
    borderRadius: 10, 
    paddingVertical: 18, 
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 40,
    width: "90%", 
    justifyContent: "center",
    alignItems: "center",

    ...Platform.select({
      ios: {
        shadowColor: COLORS.alert,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  alertButtonText: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.surface, 
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
