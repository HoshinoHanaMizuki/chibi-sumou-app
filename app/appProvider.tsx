"use client";
import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

const AuthContext = createContext<[boolean,Dispatch<SetStateAction<boolean>>]>([false, () => {}]);

const AuthProvider = ({ children}:{children:ReactNode}) => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };