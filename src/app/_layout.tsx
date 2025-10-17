import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (  
<Drawer>
    <Drawer.Screen name="index" options={{headerShown: false, title: 'Home'}}/>
      <Drawer.Screen name="profile" options={{headerShown: false, title: 'Perfil'}}/>
</Drawer>
)
}