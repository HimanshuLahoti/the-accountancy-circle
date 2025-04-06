
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, AuthContextType } from '../types/auth';
import { toast } from '@/components/ui/sonner';
import { useGoogleLogin } from '@react-oauth/google';

// Mock user data for demo purposes
const mockUsers = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    password: 'password',
    role: 'student' as const,
    course: 'CA' as const,
    level: 'Intermediate' as const,
    avatar: 'https://ui-avatars.com/api/?name=John+Student&background=1E40AF&color=fff'
  },
  {
    id: '2',
    name: 'Jane Faculty',
    email: 'faculty@example.com',
    password: 'password',
    role: 'faculty' as const,
    avatar: 'https://ui-avatars.com/api/?name=Jane+Faculty&background=047857&color=fff'
  }
];

const LOCAL_STORAGE_KEY = 'accountancy_circle_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Load user from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  // Save user to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string, role: 'student' | 'faculty') => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const matchedUser = mockUsers.find(u => 
        u.email === email && u.password === password && u.role === role
      );
      
      if (matchedUser) {
        // Remove password from user object for security
        const { password: _, ...userWithoutPassword } = matchedUser;
        setUser({ ...userWithoutPassword, provider: 'email' } as User);
        toast.success("Login successful!");
      } else {
        toast.error("Invalid credentials");
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    const googleLogin = useGoogleLogin({
      onSuccess: async (response) => {
        setIsLoading(true);
        try {
          // Fetch user info from Google
          const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          });

          if (!userInfoResponse.ok) {
            throw new Error('Failed to fetch user info');
          }

          const userInfo = await userInfoResponse.json();

          // Create a user object from Google data
          const googleUser: User = {
            id: userInfo.sub,
            name: userInfo.name,
            email: userInfo.email,
            role: 'student', // Default role - can be changed later
            avatar: userInfo.picture,
            provider: 'google',
          };

          setUser(googleUser);
          toast.success("Google login successful!");
        } catch (error) {
          console.error("Google login failed:", error);
          toast.error("Google login failed");
          throw error;
        } finally {
          setIsLoading(false);
        }
      },
      onError: (error) => {
        console.error("Google login error:", error);
        toast.error("Google login failed");
      }
    });

    // Trigger the Google login flow
    googleLogin();
  };

  const register = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user with email already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      
      if (existingUser) {
        toast.error("User with this email already exists");
        throw new Error("User already exists");
      }
      
      // In a real app, we would send this data to a backend API
      // For demo purposes, we'll just simulate success
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logout successful!");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
