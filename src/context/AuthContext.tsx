
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';
import { toast } from '@/components/ui/sonner';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setUser(userWithoutPassword as User);
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
