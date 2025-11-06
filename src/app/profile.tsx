import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";

export default function Profile() {
  function back() {
    if (!router.canGoBack()) {
      return Alert.alert("Não é possível voltar");
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PERFIL DO USUÁRIO</Text>

      <TouchableOpacity style={styles.backButton} onPress={back}>
        <Text style={styles.backText}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
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
