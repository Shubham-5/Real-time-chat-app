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
} from '@chakra-ui/react';

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

const ChatFiles = () => {
  const [isMe, setIsMe] = useState('');
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
          <Heading size="md">Account</Heading>
          <Button
            fontWeight="Bold"
            variant="text"
            size="xs"
            color="blue"
            onClick={async () => {
              await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                isOnline: false,
              });
              await signOut(auth);
            }}
          >
            Log Out
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
