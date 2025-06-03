// src/hooks/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  userName: string;
  setUserName: (name: string) => void;
};

const UserContext = createContext<UserContextType>({
  userName: '',
  setUserName: () => {},
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string>('');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
