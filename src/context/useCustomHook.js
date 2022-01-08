import { useState, createContext, useContext } from 'react';
// import { auth } from '../firebase/Firebase';
// import { onAuthStateChanged } from 'firebase/auth';
import { useColorMode } from '@chakra-ui/react';

const AuthContext = createContext();
export const useCustomHook = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // const [user, setUser] = useState('');
  const { toggleColorMode } = useColorMode();
  const [darkIcon, setDarkIcon] = useState(false);
  const handleDark = () => {
    setDarkIcon(!darkIcon);
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, currentUser => {
  //     setUser(currentUser ? currentUser : null);
  //     console.log(`this is useeffect ${currentUser}`);
  //     setLoading(false);
  //   });
  // }, []);

  // if (loading) {
  //   return 'Loading';
  // }

  const value = {
    darkIcon,
    setDarkIcon,
    handleDark,
    toggleColorMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
