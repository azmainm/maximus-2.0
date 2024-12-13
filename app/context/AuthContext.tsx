//app/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Adjust import path
import { getDoc, doc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../firebaseConfig";

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: User | null; // Firebase User object or null if not logged in
  login: () => void;
  logout: () => void;
  userId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const fetchUserId = async () => {
        setIsLoggedIn(!!user);
        setCurrentUser(user || null);

        if (user) {
          try {
            // Fetch user's Firestore document
            const userDocRef = doc(db, "users", user.uid); // Assuming the document ID matches user.uid
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              setUserId(userDocSnap.id); // Save the Firestore document ID
              console.log(`Logged in userId: ${userDocSnap.id}`);
            } else {
              console.log("No Firestore document found for this user.");
            }
          } catch (error) {
            console.error("Error fetching user document:", error);
          }
        } else {
          setUserId(null);
        }

        console.log(user ? `User logged in: ${user.displayName}` : "No user logged in");
      };

      // Call the asynchronous function
      fetchUserId();
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, userId, login, logout }}>
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
