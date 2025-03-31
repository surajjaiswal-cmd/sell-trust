"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the type for context
interface AuthContextType {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // ✅ Load login state from localStorage on mount
  useEffect(() => {
    const storedLogin = localStorage.getItem("userToken");
    if (storedLogin === "true") {
      setIsLogin(true);
    }
  }, []);

  // ✅ Function to update login state
  const updateLoginState = (value: boolean) => {
    setIsLogin(value);
    if (value) {
      localStorage.setItem("userToken", "true"); // ✅ Save login state
    } else {
      localStorage.removeItem("userToken"); // ✅ Remove on logout
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin: updateLoginState }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
