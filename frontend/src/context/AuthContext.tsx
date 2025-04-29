import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.withCredentials = true; // Enable sending cookies with requests
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

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

  const login = async (username: string, password: string) => {
    await axios.post("/login", { username, password });
    setUser({ username: username });
  };

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
  };

  const register = async (username: string, password: string) => {
    await axios.post("/register", { username, password });
    await login(username, password); // Automatically login after registration
  };

  const checkAuth = async () => {
    try {
      setIsFetchingUserInfo(true);
      const response = await axios.get("/me");
      setUser(response.data);
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
