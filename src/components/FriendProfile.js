import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { MdPersonAdd } from 'react-icons/md';
const FriendProfile = ({ viewProfileFriend, updateFriends }) => {
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
      <Flex flexDirection="column" mb="40px" mt="50px">
        <Image
          src={viewProfileFriend.avatar}
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
      <Flex justify="space-between" w="100%" px="36px">
        <Flex flexDirection="column">
          <Text
            fontWeight="600"
            color={mainText}
            fontSize="xl"
            textAlign="center"
          >
            17
          </Text>
          <Text color={secondaryText} fontWeight="500">
            Friends
          </Text>
        </Flex>
        <Flex flexDirection="column" cursor="pointer" onClick={updateFriends}>
          <Text
            display="flex"
            justifyContent="center"
            fontWeight="600"
            color={mainText}
            fontSize="xl"
            textAlign="center"
            paddingTop="3px"
          >
            <MdPersonAdd size={26} />
          </Text>

          <Text color={secondaryText} fontWeight="500">
            Add Friend
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FriendProfile;
