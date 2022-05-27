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
import CreateGroup from './CreateGroup';

const ChatHistorySidebar = ({
  onlineFriends,
  selectFriend,
  onClose,
  myFriends,
  groups,
  selectGroups,
  profileData,
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
      <Box
        px={8}
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="xs" w="full">
          Groups
        </Heading>
        <Heading size="xs" w="full">
          <CreateGroup myFriends={myFriends} profileData={profileData} />
        </Heading>
      </Box>
      <Box w="full">
        <List w="full" spacing={0} overflowY="auto">
          <ListItem>
            {groups &&
              groups.map(group => (
                <ChatRow
                  friend={group}
                  selectFriend={selectGroups}
                  key={group.id}
                  isGroup={true}
                  onClose={onClose}
                />
              ))}
          </ListItem>
        </List>
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
                  friend={friend.friends}
                  selectFriend={selectFriend}
                  key={friend.friends.uid}
                  onClose={onClose}
                  isGroup={false}
                />
              ))}
          </ListItem>
        </List>
      </Box>
    </VStack>
  );
};

export default ChatHistorySidebar;
