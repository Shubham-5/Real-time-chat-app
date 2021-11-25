import {
  VStack,
  Flex,
  Avatar,
  AvatarBadge,
  Heading,
  HStack,
  IconButton,
  Box,
  Divider,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';
import { RiDribbbleLine, RiInstagramLine, RiTwitterFill } from 'react-icons/ri';
import ChatRow from './ChatRow';
import UserAvatar from './UserAvatar';

const onlineFriends = [
  'Lazar Nikolov',
  'Mark Chandler',
  'Segun Adebayo',
  'Tim Kolberger',
  'Folasade Agbaje',
  'Alex Gerrit',
  'Jason Hughes',
  'Jonathan Bakebwa',
  'Tioluwani Kolawole',
];

const ChatHistorySidebar = () => {
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
          <UserAvatar name={friend} key={friend} />
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
