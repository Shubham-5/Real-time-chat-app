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
  useColorModeValue,
} from '@chakra-ui/react';

import ChatRow from './ChatRow';

const ChatHistorySidebar = ({
  onlineFriends,
  selectFriend,
  onClose,
  myFriends,
}) => {
  const bgColor = useColorModeValue('', 'gray.800');

  return (
    <VStack h="full" alignItems="center" w="full" mt="20px" spacing={6}>
      <HStack px={8} w="full" justifyContent="space-between">
        <Heading size="xs">Friends</Heading>
        <Text fontSize="sm" color="gray.500" fontWeight="semibold">
          {myFriends.length}
        </Text>
      </HStack>

      <Box px={8} w="full">
        <Divider color={bgColor} />
      </Box>
      <Box px={8} w="full">
        <Heading size="xs" w="full">
          Chats
        </Heading>
      </Box>
      <Box w="full" overflowY="auto">
        <List w="full" spacing={0}>
          <ListItem>
            {myFriends &&
              myFriends.map(friend => (
                <ChatRow
                  friend={friend}
                  selectFriend={selectFriend}
                  key={friend.uid}
                  onClose={onClose}
                />
              ))}
          </ListItem>
        </List>
      </Box>
    </VStack>
  );
};

export default ChatHistorySidebar;
