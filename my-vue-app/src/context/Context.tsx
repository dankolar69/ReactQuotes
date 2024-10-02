// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Definujte rozhraní pro kontext
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Vytvořte AuthContext s výchozí hodnotou
export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});

// Definujte rozhraní pro AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// Vytvořte AuthProvider komponentu
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // Optional: Přidání efektu pro ověření tokenu při načtení
  useEffect(() => {
    // Můžete přidat logiku pro ověření tokenu zde
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
