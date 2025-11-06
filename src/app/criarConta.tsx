import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { useUser } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";


export default function SignUp() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [numeroAdicional, setNumeroAdicional] = useState("");
  const { contatoEmergencia, setContatoEmergencia } = useUser();


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
    if (!nome || !idade || !endereco || !telefone || !contatoEmergencia) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }
    Alert.alert("Sucesso", "Cadastro realizado!");
  }

  function back() {
    if (!router.canGoBack()) {
      return Alert.alert("Não é possível voltar");
    }
    router.back();
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        
     
        <TouchableOpacity style={styles.backButton} onPress={back}>
          <Text style={styles.backText}>VOLTAR</Text>
        </TouchableOpacity>

 
        <Text style={styles.title}>PERFIL</Text>


        <TextInput
          style={[styles.input, styles.inputBlack]}
          placeholder="NOME"
          placeholderTextColor="#fff"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={[styles.input, styles.inputGray]}
          placeholder="IDADE"
          placeholderTextColor="#000"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, styles.inputBlack]}
          placeholder="ENDEREÇO"
          placeholderTextColor="#fff"
          value={endereco}
          onChangeText={setEndereco}
        />

        <TextInput
          style={[styles.input, styles.inputGray]}
          placeholder="TELEFONE"
          placeholderTextColor="#000"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <TextInput
          style={[styles.input, styles.inputBlack]}
          placeholder="NÚMERO ADICIONAL (OPCIONAL)"
          placeholderTextColor="#fff"
          value={numeroAdicional}
          onChangeText={setNumeroAdicional}
          keyboardType="phone-pad"
        />

        <View style={styles.emergencyBox}>
          <TextInput
            style={[styles.input, styles.inputGray]}
            placeholder="CONTATO DE EMERGÊNCIA"
            placeholderTextColor="#000"
            value={contatoEmergencia}
            onChangeText={setContatoEmergencia}
            keyboardType="phone-pad"
          />
          <Text style={styles.emergencyText}>
            *Esse número será utilizado para contato quando utilizar a função
            "ALERTA"
          </Text>
        </View>

        {/* Botão Concluir */}
        <TouchableOpacity style={styles.button} onPress={Cadastro}>
          <Text style={styles.buttonText}>CONCLUIR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#000",
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
  emergencyBox: {
    width: "90%",
    marginBottom: 20,
  },
  emergencyText: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
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
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  backText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});
