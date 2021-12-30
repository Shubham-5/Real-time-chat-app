import React, { useState, useEffect } from 'react';
import {
  VStack,
  Heading,
  HStack,
  Box,
  Divider,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';
import { auth, db } from '../../firebase/Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import ChatRow from './ChatRow';
import UserAvatar from './UserAvatar';

const ChatHistorySidebar = () => {
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const userRef = collection(db, 'users');
    //query object
    const q = query(userRef, where('uid', 'not-in', [auth.currentUser.uid]));
    //execute query
    const unsubscribe = onSnapshot(q, querySnap => {
      let users = [];
      querySnap.forEach(doc => {
        users.push(doc.data());
      });

      setOnlineFriends(users);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <VStack h="full" alignItems="center" w="full" spacing={6}>
      <HStack px={8} w="full" justifyContent="space-between">
        <Heading size="xs">Friends online</Heading>
        <Text fontSize="sm" color="gray.500" fontWeight="semibold">
          23
        </Text>
      </HStack>
      <HStack
        overflowX="auto"
        minH={24}
        px={8}
        w="full"
        justifyContent="flex-start"
        spacing={3}
      >
        {onlineFriends.map(friend => (
          <UserAvatar name={friend.name} key={friend.uid} />
        ))}
      </HStack>
      <Box px={8} w="full">
        <Divider color="gray.100" />
      </Box>
      <Box px={8} w="full">
        <Heading size="xs" w="full">
          Chats
        </Heading>
      </Box>
      <Box w="full" overflowY="auto">
        <List w="full" spacing={0}>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
        </List>
      </Box>
    </VStack>
  );
};

export default ChatHistorySidebar;
