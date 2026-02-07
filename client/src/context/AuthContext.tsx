import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { IUser } from "../assets/assets";
import api from "../configs/api";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  credits: number | null;
  refreshCredits: () => Promise<void>;
  signUp: (user: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (user: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  credits: null,
  refreshCredits: async () => {},
  signUp: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [credits, setCredits] = useState<number | null>(null);

  // Refresh Credits
  const refreshCredits = async () => {
    try {
      const { data } = await api.get("/api/v1/user/credits");
      setCredits(data.credits);
    } catch (error: any) {
      console.error(error);
    }
  };

  //Sign-up User
  const signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await api.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
      toast.success(data.message);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Some error has occured during sign-up",
      );
    }
  };

  //Login User
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await api.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
        await refreshCredits();
      }
      toast.success(data.message);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Some error occurred during login.",
      );
    }
  };

  //Logout User
  const logout = async () => {
    try {
      const { data } = await api.post("/api/v1/auth/logout");
      setUser(null);
      setIsLoggedIn(false);
      setCredits(null);
      toast.success(data.message);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Some error occurred during login.",
      );
    }
  };

  //Fetch User on render
  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/v1/auth/verify");
      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
        await refreshCredits();
        // console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    credits,
    refreshCredits,
    signUp,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
