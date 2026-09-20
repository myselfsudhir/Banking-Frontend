import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  const [username, setUsername] = useState(() =>
    localStorage.getItem("username"),
  );

  const login = async (loginRequest) => {
    const response = await loginApi(loginRequest);

    // Backend returns JWT as a raw String
    const accessToken = response.data;

    localStorage.setItem("accessToken", accessToken);

    setToken(accessToken);

    if (loginRequest.username) {
      localStorage.setItem("username", loginRequest.username);

      setUsername(loginRequest.username);
    }

    return response;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    setToken(null);
    setUsername(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
