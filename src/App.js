import React, { useEffect, useState } from 'react';
import { auth } from './firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Spinner, VStack } from '@chakra-ui/react';

import Login from './Pages/Login';

import Home from './Pages/Home';

function App() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser ? currentUser : null);
      setLoading(false);
      return () => {
        unsubscribe();
      };
    });
  }, []);

  if (loading) {
    return (
      <VStack h="100vh" w="100vw" display="flex" justify="center">
        <Spinner size="xl" />
      </VStack>
    );
  }
  return <>{user ? <Home /> : <Login setUser={setUser} />}</>;
}

export default App;
