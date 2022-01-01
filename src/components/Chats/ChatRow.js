import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import UserAvatar from './UserAvatar';

const ChatRow = ({ name, selectFriend, friend }) => {
  return (
    <Flex
      py={4}
      px={8}
      w="full"
      alignItems="center"
      borderBottomColor="gray.100"
      borderBottomWidth={1}
      style={{ transition: 'background 300ms' }}
      _hover={{ bg: 'gray.50', cursor: 'pointer' }}
      onClick={() => selectFriend(friend)}
    >
      <UserAvatar name={name} />
      <VStack
        overflow="hidden"
        flex={1}
        ml={3}
        spacing={0}
        alignItems="flex-start"
      >
        <Heading fontSize={12} w="full">
          {name}
        </Heading>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          w="full"
          fontSize="xs"
          color="gray.500"
        >
          Sample text message goes here.
        </Text>
      </VStack>
      <Text ml={3} fontSize="xs" color="gray.500">
        08:30
      </Text>
    </Flex>
  );
};

export default ChatRow;
