import {
  Flex,
  HStack,
  Text,
  IconButton,
  Avatar,
  AvatarBadge,
  Heading,
  Box,
  Divider,
  VStack,
  Button,
} from '@chakra-ui/react';

import { RiDribbbleLine, RiInstagramLine, RiTwitterFill } from 'react-icons/ri';

const ChatFiles = () => {
  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <HStack justify="center" w="full" px={8} mb={8}>
        <Text color="gray.500">20 March 2021</Text>
      </HStack>
      <Button rounded="full" width="2px" p={20}>
        <Avatar size="2xl" name="Dina Harrison">
          <AvatarBadge boxSize={8} borderWidth={4} bg="green.400" />
        </Avatar>
      </Button>

      <Heading size="md" mt={3}>
        Shubham Rajput
      </Heading>
      <HStack px={8} justifyContent="center" spacing={3} mt={6}>
        <IconButton
          icon={<RiDribbbleLine />}
          variant="ghost"
          rounded="full"
          color="gray.500"
          h={10}
          aria-label="Dribbble Account"
        />
        <IconButton
          icon={<RiInstagramLine />}
          variant="ghost"
          rounded="full"
          color="gray.500"
          h={10}
          aria-label="Instagram Account"
        />
        <IconButton
          icon={<RiTwitterFill />}
          variant="ghost"
          rounded="full"
          color="gray.500"
          h={10}
          aria-label="Twitter Account"
        />
      </HStack>
      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
      <VStack spacing={6} overflowY="auto" w="full">
        <HStack px={8} w="full" mt={6} justifyContent="space-between">
          <Heading size="md">Account</Heading>
          <Button fontWeight="Bold" variant="text" size="xs" color="blue">
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
