import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  membershipStatus: {
    active: boolean;
    expiryDate: Date | null;
  } | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  membershipStatus: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState<AuthContextType['membershipStatus']>(null);

  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;
    
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Set up real-time listener for user data
        unsubscribeUser = onSnapshot(doc(db, 'users', user.uid), (doc) => {
          const userData = doc.data();
          setIsAdmin(userData?.role === 'admin');
          setMembershipStatus({
            active: userData?.membershipActive || false,
            expiryDate: userData?.membershipExpiry?.toDate() || null,
          });
        });
      } else {
        setIsAdmin(false);
        setMembershipStatus(null);
        if (unsubscribeUser) {
          unsubscribeUser();
        }
      }
      
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) {
        unsubscribeUser();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, membershipStatus }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};