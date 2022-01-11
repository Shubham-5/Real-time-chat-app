import { useState, createContext, useContext } from 'react';
import { useColorMode } from '@chakra-ui/react';

const AuthContext = createContext();
export const useCustomHook = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const { toggleColorMode } = useColorMode();
  const [darkIcon, setDarkIcon] = useState(false);

  const handleDark = () => {
    setDarkIcon(!darkIcon);
  };

  const value = {
    darkIcon,
    setDarkIcon,
    handleDark,
    toggleColorMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
