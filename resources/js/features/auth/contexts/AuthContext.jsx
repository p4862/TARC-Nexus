import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  completeGoogleRegistration,
  fetchAuthenticatedUser,
  loginAccount,
  logoutAccount,
  registerAccount,
} from "@/features/auth/services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const authenticatedUser = await fetchAuthenticatedUser();
      setUser(authenticatedUser);

      return authenticatedUser;
    } catch (error) {
      if (error?.response?.status === 401) {
        setUser(null);

        return null;
      }

      throw error;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchAuthenticatedUser()
      .then((authenticatedUser) => {
        if (isMounted) {
          setUser(authenticatedUser);
        }
      })
      .catch((error) => {
        if (isMounted && error?.response?.status !== 401) {
          console.error("Unable to restore the authenticated session.", error);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const register = useCallback(async (payload) => {
    const registeredUser = await registerAccount(payload);
    setUser(registeredUser);

    return registeredUser;
  }, []);

  const login = useCallback(async (payload) => {
    const authenticatedUser = await loginAccount(payload);
    setUser(authenticatedUser);

    return authenticatedUser;
  }, []);

  const logout = useCallback(async () => {
    await logoutAccount();
    setUser(null);
  }, []);

  const finishGoogleRegistration = useCallback(async (payload) => {
    const registeredUser = await completeGoogleRegistration(payload);
    setUser(registeredUser);

    return registeredUser;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      register,
      login,
      logout,
      refreshUser,
      finishGoogleRegistration,
      setUser,
    }),
    [
      finishGoogleRegistration,
      isLoading,
      login,
      logout,
      refreshUser,
      register,
      user,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
