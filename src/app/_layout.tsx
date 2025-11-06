import { Drawer } from "expo-router/drawer";
import { UserProvider } from "../context/userContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Drawer>
          <Drawer.Screen name="index" options={{ title: "Home" }} />
          <Drawer.Screen name="profile" options={{ title: "Perfil" }} />
        </Drawer>
      </UserProvider>
    </SafeAreaProvider>
  );
}
