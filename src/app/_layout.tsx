import {Tabs} from "expo-router";

export default function Layout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#000000', tabBarStyle: { backgroundColor: '#ffffff', height:50, justifyContent:"center"} }}>
            <Tabs.Screen name="index"  options={{headerShown: false, headerTintColor:"#000000", title: 'Home'}} />
            <Tabs.Screen name="profile" options={{headerShown: false, title: 'Perfil'}} />
        </Tabs>
    );
}