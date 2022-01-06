import React, { useEffect, useState } from 'react';

import {
  Flex,
  HStack,
  Text,
  Avatar,
  AvatarBadge,
  Heading,
  Box,
  Divider,
  VStack,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import {
  updateDoc,
  doc,
  query,
  onSnapshot,
  collection,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase/Firebase';
import { useCustomHook } from '../../context/useCustomHook';

const ChatFiles = () => {
  const [isMe, setIsMe] = useState('');
  const { toggleColorMode, handleDark, darkIcon } = useCustomHook();
  useEffect(() => {
    const userRef = collection(db, 'users');
    //query object
    const q = query(userRef, where('uid', '==', auth.currentUser.uid));

    //execute query
    const unsubscribe = onSnapshot(q, querySnap => {
      let user = [];
      querySnap.forEach(doc => {
        user.push(doc.data());
      });

      setIsMe(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <HStack justify="center" w="full" px={8} mb={8}>
        <Text color="gray.500"></Text>
      </HStack>
      <Button rounded="full" width="2px" p={20}>
        <Avatar size="2xl" name="Dina Harrison">
          <AvatarBadge boxSize={8} borderWidth={4} bg="green.400" />
        </Avatar>
      </Button>

      <Heading size="md" mt={5}>
        {isMe && isMe[0].name}
      </Heading>

      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
      <VStack spacing={6} overflowY="auto" w="full">
        <HStack px={8} w="full" mt={6} justifyContent="space-between">
          <Button variant="disabled" onClick={toggleColorMode}>
            <IconButton
              size="sm"
              variant="ghost"
              icon={darkIcon ? <FaSun /> : <FaMoon />}
              aria-label="darkmode"
              onClick={handleDark}
            />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                isOnline: false,
              });
              await signOut(auth);
            }}
          >
            Log Out
            <IconButton
              ml="1em"
              variant="ghost"
              size="sm"
              icon={<FaSignOutAlt />}
            />
          </Button>
        </HStack>

        <Box px={8} w="full">
          <Divider mt={6} color="gray.100" />
        </Box>
        <HStack px={8} w="full" mt={6} justifyContent="space-between"></HStack>
      </VStack>
    </Flex>
  );
};

export default ChatFiles;
