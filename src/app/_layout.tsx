import {Tabs} from "expo-router";

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{headerShown: false, title: 'Home'}} />
            <Tabs.Screen name="profile" options={{headerShown: false, title: 'Perfil'}} />
        </Tabs>
    );
}