import React, { createContext, useState, ReactNode } from 'react';

interface User {
  name?: string;
  profilePicture?: string;
}

interface UserContextType {
  userData: User | null;
  updateUser: (data: User) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);

  const updateUser = (data: User) => {
    setUserData(data);
  };

  return <UserContext.Provider value={{ userData, updateUser }}>{children}</UserContext.Provider>;
};
