import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logOut,
  getUserProfile,
  UserProfile,
} from './firebaseAuth';

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (role?: 'jobseeker' | 'employer') => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    displayName: string,
    role: 'jobseeker' | 'employer',
    additionalData?: { phoneNumber?: string; address?: string; company?: string }
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(profile);
        } catch (error: any) {
          // Only log non-offline errors
          if (error?.code !== 'unavailable' && !error?.message?.includes('offline')) {
            console.error('Error fetching user profile:', error);
          }
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout - check your internet connection or ad blocker')), 10000)
      );
      
      await Promise.race([signInWithEmail(email, password), timeoutPromise]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  };

  const loginWithGoogle = async (role?: 'jobseeker' | 'employer') => {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout - check your internet connection or ad blocker')), 15000)
      );
      
      await Promise.race([signInWithGoogle(role), timeoutPromise]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Google sign-in failed',
      };
    }
  };

  const register = async (
    email: string,
    password: string,
    displayName: string,
    role: 'jobseeker' | 'employer',
    additionalData?: { phoneNumber?: string; address?: string; company?: string }
  ) => {
    try {
      await signUpWithEmail(email, password, displayName, role, additionalData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      await logOut();
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

