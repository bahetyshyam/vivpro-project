import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  checkCurrentUserFromAuth,
  loginUser,
  logoutUser,
  registerUser,
} from '../api/auth';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  isFetchingUserInfo: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(true);
  const queryClient = useQueryClient();

  const login = async (username: string, password: string) => {
    const response = await loginUser(username, password);
    if (!response || !response.username) {
      throw new Error('Login failed: Invalid response from server');
    }
    setUser(response);
  };

  const logout = async () => {
    await logoutUser();
    queryClient.clear(); // Clear the query cache to ensure no stale data remain
    setUser(null);
  };

  const register = async (username: string, password: string) => {
    await registerUser(username, password);
    if (!username || !password) {
      throw new Error(
        'Registration failed: Username and password are required'
      );
    }
    await login(username, password);
  };

  const checkAuth = async () => {
    try {
      setIsFetchingUserInfo(true);
      const response = await checkCurrentUserFromAuth();
      setUser(response);
    } catch {
      setUser(null);
    } finally {
      setIsFetchingUserInfo(false);
    }
  };

  useEffect(() => {
    checkAuth(); // Check authentication state on page load
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isFetchingUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
