
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty';
  avatar?: string;
  course?: 'CA' | 'CS' | 'CMA';
  level?: 'Foundation' | 'Intermediate' | 'Final';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'student' | 'faculty') => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
}
