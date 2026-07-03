import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getUserProfile } from "../services/authService";
import { logout as firebaseLogout } from "../services/authService";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fires once on load with the cached session (if any), then again
    // any time the user signs in or out.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      try {
        const userProfile = await getUserProfile(firebaseUser.uid);
        setProfile(userProfile);
      } catch (error) {
        console.error("Failed to load user profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const refreshProfile = async () => {
    if (!user) return;

    try {
      const userProfile = await getUserProfile(user.uid);
      setProfile(userProfile);
    } catch (error) {
      console.error("Failed to refresh user profile:", error);
    }
  };

  
  const logout = async () => {
    await firebaseLogout();

    setUser(null);
    setProfile(null);
  };

  const value = {

    user,

    profile,

    role: profile?.role ?? null,

    displayName:
        profile?.name ??
        user?.displayName ??
        "User",

    loading,

    isAuthenticated: !!user,

    logout,

    refreshProfile,

};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}