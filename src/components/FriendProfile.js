import {
  Avatar,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const FriendProfile = ({ viewProfileFriend, updateFriends, isLoading }) => {
  let mainText = useColorModeValue('gray.800', 'white');
  let secondaryText = useColorModeValue('gray.400', 'gray.400');

  return (
    <Flex
      borderRadius="20px"
      p="20px"
      border="2px solid gray"
      h="345px"
      w={{ base: '315px', md: '345px' }}
      alignItems="center"
      direction="column"
    >
      <Flex flexDirection="column" mb="20px" mt="50px">
        <Avatar
          src={viewProfileFriend.avatar}
          name={viewProfileFriend.name}
          border="2px solid gray"
          mx="auto"
          width="68px"
          objectFit="cover"
          height="68px"
          mt="-38px"
          borderRadius="50%"
        />
        <Text
          fontWeight="600"
          color={mainText}
          textAlign="center"
          pt="4px"
          fontSize="xl"
        >
          {viewProfileFriend.name}
        </Text>
        <Text
          color={secondaryText}
          textAlign="center"
          fontSize="sm"
          fontWeight="500"
        >
          {viewProfileFriend.email}
        </Text>
      </Flex>
      <Flex justify="center" flexDirection="column" w="100%" px="36px">
        <Flex flexDirection="column">
          <Text
            fontWeight="600"
            color={mainText}
            fontSize="xl"
            textAlign="center"
          >
            {viewProfileFriend.friends ? viewProfileFriend.friends : '0'}
          </Text>
          <Text color={secondaryText} fontWeight="500" textAlign="center">
            Friends
          </Text>
        </Flex>
        <Flex flexDirection="row" cursor="pointer" onClick={updateFriends}>
          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            isLoading={isLoading}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Add Friend
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FriendProfile;
