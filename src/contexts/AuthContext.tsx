
import { createContext, useContext, useState, useEffect } from "react";

// Mock user interface - will be replaced with Firebase Auth later
export interface User {
  id: string;
  email: string;
  displayName?: string;
  gender?: string;
  ageGroup?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, gender: string, ageGroup: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved auth token on mount (mock for now)
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("relatara_user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Mock auth functions (will be replaced with Firebase later)
  const login = async (email: string, password: string) => {
    // This would be Firebase auth in a real implementation
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const user = { 
        id: "user-" + Math.random().toString(36).substring(2, 9),
        email,
        displayName: email.split('@')[0]
      };
      
      setCurrentUser(user);
      localStorage.setItem("relatara_user", JSON.stringify(user));
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithEmail = async (email: string, password: string, gender: string, ageGroup: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const user = { 
        id: "user-" + Math.random().toString(36).substring(2, 9),
        email,
        displayName: email.split('@')[0],
        gender,
        ageGroup
      };
      
      setCurrentUser(user);
      localStorage.setItem("relatara_user", JSON.stringify(user));
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful Google sign-in
      const user = { 
        id: "google-" + Math.random().toString(36).substring(2, 9),
        email: `user${Math.floor(Math.random() * 1000)}@gmail.com`,
        displayName: "Google User"
      };
      
      setCurrentUser(user);
      localStorage.setItem("relatara_user", JSON.stringify(user));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Clear user data
    setCurrentUser(null);
    localStorage.removeItem("relatara_user");
  };

  const value = {
    currentUser,
    isLoading,
    login,
    signupWithEmail,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
