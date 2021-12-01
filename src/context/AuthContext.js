import { useState, useEffect, createContext } from 'react';
import { auth } from '../../firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser ? currentUser : null);
      console.log(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return 'Loading';
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
