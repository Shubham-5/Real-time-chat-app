import React from 'react';
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

import ChatRow from './ChatRow';

const ChatHistorySidebar = ({ onlineFriends, selectFriend }) => {
  return (
    <VStack h="full" alignItems="center" w="full" spacing={6}>
      <HStack px={8} w="full" justifyContent="space-between">
        <Heading size="xs">Friends </Heading>
        <Text fontSize="sm" color="gray.500" fontWeight="semibold">
          {onlineFriends.length}
        </Text>
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
            {onlineFriends.map(friend => (
              <ChatRow
                name={friend.name}
                friend={friend}
                selectFriend={selectFriend}
                key={friend.uid}
              />
            ))}
          </ListItem>
        </List>
      </Box>
    </VStack>
  );
};

export default ChatHistorySidebar;
