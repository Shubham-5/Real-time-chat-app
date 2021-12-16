import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser ? currentUser : null);
      console.log(`this is useeffect ${currentUser}`);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return 'Loading';
  }

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
