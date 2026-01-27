import { useState, useEffect, useCallback } from "react";

export interface AuthUser {
  email: string;
  token: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthState = useCallback(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
      setUser({ email, token });
    } else {
      setUser(null);
    }
  }, []);

  // Check auth state from localStorage on mount
  useEffect(() => {
    checkAuthState();
    setIsLoading(false);
  }, [checkAuthState]);

  // Listen for storage changes (e.g., logout from another tab) and custom events (same tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "userEmail") {
        checkAuthState();
      }
    };

    const handleAuthStateChange = () => {
      checkAuthState();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-state-changed", handleAuthStateChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-state-changed", handleAuthStateChange);
    };
  }, [checkAuthState]);

  const login = useCallback((email: string, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email);
    setUser({ email, token });
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event("auth-state-changed"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event("auth-state-changed"));
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
}
