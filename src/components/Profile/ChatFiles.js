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

import moment from 'moment';
import { auth, db } from '../../firebase/Firebase';
import { MdAdd, MdDeleteForever } from 'react-icons/md';
import { useCustomHook } from '../../context/useCustomHook';

const ChatFiles = () => {
  const [isMe, setIsMe] = useState('');
  const { toggleColorMode, handleDark, darkIcon } = useCustomHook();
  useEffect(() => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('uid', 'in', [auth.currentUser.uid]));
    //execute query
    const unsubscribe = onSnapshot(q, querySnap => {
      querySnap.forEach(doc => {
        setIsMe(doc.data());
      });
    });

    return unsubscribe;
  }, []);
  if (isMe) {
    var accountCreatedDate = moment(isMe.createdAt.toDate()).format(
      'MMM DD YYYY h:mm A'
    );
  }

  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <HStack justify="center" w="full" px={8} mb={8}>
        <Text color="gray.500">{isMe && accountCreatedDate}</Text>
      </HStack>

      <Avatar size="2xl">
        <HStack justify="center" w="full" px={8}>
          <IconButton variant="ghost" size="sm" icon={<MdAdd />} />
          <IconButton variant="ghost" size="sm" icon={<MdDeleteForever />} />
        </HStack>
      </Avatar>

      <Heading size="md" mt={5}>
        {isMe && isMe.name}
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
