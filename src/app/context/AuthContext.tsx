// context/AuthContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: { username: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ username: string } | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
