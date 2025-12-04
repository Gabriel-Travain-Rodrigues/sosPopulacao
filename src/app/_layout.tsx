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
            headerShown: false,
            drawerActiveTintColor: "#e63946",
            drawerInactiveTintColor: "#333",
            drawerLabelStyle: { fontSize: 16 },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: "Início",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="profile"
            options={{
              title: "Contato de Emergência",
              drawerIcon: ({ color, size }) => (
                <Ionicons
                  name="call-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Drawer>
      </UserProvider>
    </SafeAreaProvider>
  );
}
