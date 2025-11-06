import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  contatoEmergencia: string;
  setContatoEmergencia: (value: string) => void;
};

const UserContext = createContext<UserContextType>({
  contatoEmergencia: "",
  setContatoEmergencia: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [contatoEmergencia, setContatoEmergencia] = useState("");

  return (
    <UserContext.Provider value={{ contatoEmergencia, setContatoEmergencia }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}