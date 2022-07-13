import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { AxiosInstance } from "../utils/BaseUrl";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [Admin, setAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //const { "royalDashboard-Admin-Token": Token } = parseCookies();

  async function signIn(data) {
    const postContent = {
      email: data.email,
      password: data.password,
    };

    await AxiosInstance.post("admin/management/login", postContent).then(
      (res) => {
        setCookie(undefined, "royalDashboard-Admin-Data", res.data.user._id, {
          maxAge: 60 * 60 * 24, //24h...
        });
        setCookie(undefined, "royalDashboard-Admin-Token", res.data.Token, {
          maxAge: 60 * 60 * 24, //24h...
        });
      }
    );
    Router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, signIn, Admin, setAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
