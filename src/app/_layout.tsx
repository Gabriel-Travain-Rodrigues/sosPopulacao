import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { UserProvider } from "../context/userContext";
import { SafeAreaProvider } from "react-native-safe-area-context";



export default function Layout() {
  return (
    <SafeAreaProvider>
      <UserProvider>
    <Drawer
      screenOptions={{
        headerShown: false, // o header fica falso porque você já fez o topo customizado no index.js
        drawerActiveTintColor: "#e63946",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      {/* Tela inicial */}
      <Drawer.Screen
        name="index"
        options={{
          title: "Início",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Tela de perfil */}
      <Drawer.Screen
        name="profile"
        options={{
          title: "Perfil",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
    </UserProvider>
    </SafeAreaProvider>
  )}