import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  contatoEmergencia: string;
  setContatoEmergencia: (value: string) => void;
};

const UserContext = createContext<UserContextType>({
  contatoEmergencia: "",
  setContatoEmergencia: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [contatoEmergencia, setContatoEmergenciaState] = useState("");

  useEffect(() => {
    // Load the saved contact from AsyncStorage when the app starts
    const loadContatoEmergencia = async () => {
      try {
        const savedContato = await AsyncStorage.getItem("contatoEmergencia");
        if (savedContato) {
          setContatoEmergenciaState(savedContato);
        }
      } catch (error) {
        console.error("Failed to load contatoEmergencia", error);
      }
    };

    loadContatoEmergencia();
  }, []);

  const setContatoEmergencia = async (value: string) => {
    try {
      // Save the contact to AsyncStorage
      await AsyncStorage.setItem("contatoEmergencia", value);
      setContatoEmergenciaState(value);
    } catch (error) {
      console.error("Failed to save contatoEmergencia", error);
    }
  };

  return (
    <UserContext.Provider value={{ contatoEmergencia, setContatoEmergencia }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}